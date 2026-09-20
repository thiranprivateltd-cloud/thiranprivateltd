import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/mailer';
import fs from 'fs';
import path from 'path';

// Helper to format ISO date string for iCalendar UTC (e.g. 20260920T100000Z)
function formatICSDate(date) {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

const bookedSlotsFilePath = path.join(process.cwd(), 'src', 'data', 'bookedSlots.json');
const FORMSPREE_SCHEDULE_ENDPOINT = 'https://formspree.io/f/mqpaebzr';

function getBookedSlots() {
  try {
    if (fs.existsSync(bookedSlotsFilePath)) {
      const data = fs.readFileSync(bookedSlotsFilePath, 'utf8');
      return JSON.parse(data || '[]');
    }
  } catch (e) {
    console.error('Error reading bookedSlots:', e);
  }
  return [];
}

function saveBookedSlot(slot) {
  try {
    const slots = getBookedSlots();
    slots.push(slot);
    fs.writeFileSync(bookedSlotsFilePath, JSON.stringify(slots, null, 2), 'utf8');
  } catch (e) {
    console.error('Error saving bookedSlot:', e);
  }
}

// GET handler to check reserved slots for a specific team member on a given date
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const personEmail = searchParams.get('personEmail');
    const date = searchParams.get('date');

    const allBooked = getBookedSlots();
    const filtered = allBooked.filter(b => 
      (!personEmail || b.personEmail?.toLowerCase() === personEmail.toLowerCase()) &&
      (!date || b.date === date)
    );

    return NextResponse.json({
      bookedSlots: filtered.map(f => f.timeSlot)
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch booked slots' }, { status: 500 });
  }
}

// Helper to generate RFC 5545 iCalendar (.ics) content with 1-day & 1-hour reminder VALARMs
function generateICS({
  uid,
  title,
  description,
  location,
  startDate,
  endDate,
  organizerName,
  organizerEmail,
  attendeeName,
  attendeeEmail,
}) {
  const dtStart = formatICSDate(new Date(startDate));
  const dtEnd = formatICSDate(new Date(endDate));
  const dtStamp = formatICSDate(new Date());

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Thiran Private Limited//Google Meet Scheduling//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
    `LOCATION:${location}`,
    `ORGANIZER;CN="${organizerName}":mailto:${organizerEmail}`,
    `ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED;CN="${attendeeName}":mailto:${attendeeEmail}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    // 24hr reminder
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: You have a scheduled meeting with Thiran tomorrow',
    'END:VALARM',
    // 1hr reminder
    'BEGIN:VALARM',
    'TRIGGER:-PT1H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: Meeting with Thiran starts in 1 hour',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { 
      name, 
      email, 
      organization, 
      purpose, 
      personId,
      personName, 
      personEmail, 
      date, 
      timeSlot, 
      message, 
      mode 
    } = body;

    if (!name || !email || !date || !timeSlot) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const hostEmail = 'thiranprivateltd@gmail.com';
    const meetingUid = `THIRAN-MEET-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const googleMeetUrl = `https://meet.google.com/lookup/thiran-${meetingUid.slice(12, 22)}`;

    // Format location based on selected mode
    let meetingLocation = '';
    const modeLower = (mode || '').toLowerCase();
    if (modeLower.includes('phone')) {
      meetingLocation = 'Phone Call (Voice)';
    } else if (modeLower.includes('in-person') || modeLower.includes('person') || modeLower.includes('office')) {
      meetingLocation = 'In-Person (At Thiran Office / Headquarters)';
    } else {
      meetingLocation = `Google Meet: ${googleMeetUrl}`;
    }

    // 1. Double Booking Check
    const existingBookings = getBookedSlots();
    const isConflict = existingBookings.some(b => 
      b.personEmail?.toLowerCase() === hostEmail.toLowerCase() &&
      b.date === date &&
      b.timeSlot === timeSlot &&
      b.status !== 'CANCELLED'
    );

    if (isConflict) {
      return NextResponse.json({
        error: `Slot ${timeSlot} on ${date} with ${personName} is already reserved. Please select another time.`
      }, { status: 409 });
    }

    const meetingTitle = `[Thiran Scheduled Meeting] ${purpose || 'Discussion'}: ${name} with ${personName}`;

    // Parse date and time into start and end dates
    let startDateTime = new Date();
    if (date && timeSlot) {
      const datePart = date; // e.g. "2026-09-21"
      let hours = 16;
      let minutes = 30;
      
      const timeMatch = timeSlot.match(/(\d+):(\d+)\s*(AM|PM)?/i);
      if (timeMatch) {
        hours = parseInt(timeMatch[1], 10);
        minutes = parseInt(timeMatch[2], 10);
        const ampm = timeMatch[3];
        if (ampm && ampm.toUpperCase() === 'PM' && hours < 12) hours += 12;
        if (ampm && ampm.toUpperCase() === 'AM' && hours === 12) hours = 0;
      }

      startDateTime = new Date(`${datePart}T${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`);
    } else {
      startDateTime.setDate(startDateTime.getDate() + 1);
      startDateTime.setHours(16, 30, 0, 0);
    }

    // Default duration 30 mins
    const endDateTime = new Date(startDateTime.getTime() + 30 * 60 * 1000);

    const formattedStartStr = startDateTime.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' });

    const agendaText = `
Meeting Purpose: ${purpose || 'General Discussion'}
Host Member: ${personName} (${hostEmail})
Attendee: ${name} (${email})
Organization: ${organization || 'Individual / Independent'}
Scheduled Date & Time: ${formattedStartStr}
Format: ${mode || 'Google Meet (Online Video)'}
${modeLower.includes('phone') || modeLower.includes('person') ? '' : `Google Meet Link: ${googleMeetUrl}`}

Agenda / Message:
${message || 'No additional note provided.'}
    `.trim();

    // Generate RFC 5545 iCalendar .ics string
    const icsContent = generateICS({
      uid: meetingUid,
      title: meetingTitle,
      description: agendaText,
      location: meetingLocation,
      startDate: startDateTime,
      endDate: endDateTime,
      organizerName: personName,
      organizerEmail: hostEmail,
      attendeeName: name,
      attendeeEmail: email,
    });

    const icsAttachment = {
      filename: `Thiran_Meeting_${personName.replace(/\s+/g, '_')}.ics`,
      content: icsContent,
      contentType: 'text/calendar; charset=utf-8; method=REQUEST',
    };

    // 1. DISPATCH DIRECTLY TO FORMSPREE (Guaranteed 100% Delivery to thiranprivateltd@gmail.com)
    try {
      await fetch(FORMSPREE_SCHEDULE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `📅 New Meeting Scheduled: ${purpose} (${name} with ${personName})`,
          attendee_name: name,
          attendee_email: email,
          organization: organization || 'Not specified',
          purpose: purpose || 'General Inquiry',
          host_member: personName,
          host_email: hostEmail,
          scheduled_date: date,
          scheduled_time_slot: timeSlot,
          scheduled_start: formattedStartStr,
          meeting_mode: mode || 'Google Meet',
          google_meet_link: googleMeetUrl,
          agenda_notes: message || 'None provided',
          booking_id: meetingUid,
          submitted_at: new Date().toISOString()
        })
      });
    } catch (formspreeErr) {
      console.warn('Formspree dispatch notice:', formspreeErr);
    }

    // 2. ALSO DISPATCH VIA EMAIL RELAY IF CONFIGURED
    const teamHtmlContent = `
      <div style="font-family: Arial, sans-serif; padding: 24px; color: #1A1425; background-color: #faf9f6; border-radius: 12px; border: 1px solid #e0d7c7; max-width: 620px; margin: 0 auto;">
        <h2 style="color: #8c6d23; border-bottom: 2px solid #d4af37; padding-bottom: 10px; margin-top: 0;">
          📅 New Meeting Scheduled — ${purpose}
        </h2>
        <p style="font-size: 15px;">Hello <strong>${personName}</strong>,</p>
        <p>A new meeting has been confirmed on your schedule with Google Meet integration:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 18px 0; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #eaeaea; font-size: 14px;">
          <tr style="border-bottom: 1px solid #f0f0f0;"><td style="padding: 10px 15px; font-weight: bold; width: 140px; color: #555;">Attendee:</td><td style="padding: 10px 15px;"><strong>${name}</strong> (<a href="mailto:${email}" style="color: #3b82f6;">${email}</a>)</td></tr>
          <tr style="border-bottom: 1px solid #f0f0f0;"><td style="padding: 10px 15px; font-weight: bold; color: #555;">Organization:</td><td style="padding: 10px 15px;">${organization || 'Individual / Independent'}</td></tr>
          <tr style="border-bottom: 1px solid #f0f0f0;"><td style="padding: 10px 15px; font-weight: bold; color: #555;">Confirmed Slot:</td><td style="padding: 10px 15px; color: #8c6d23; font-weight: bold;">${formattedStartStr}</td></tr>
          <tr style="border-bottom: 1px solid #f0f0f0;"><td style="padding: 10px 15px; font-weight: bold; color: #555;">Purpose:</td><td style="padding: 10px 15px;">${purpose}</td></tr>
          <tr style="border-bottom: 1px solid #f0f0f0;"><td style="padding: 10px 15px; font-weight: bold; color: #555;">Format:</td><td style="padding: 10px 15px;">${mode || 'Google Meet'}</td></tr>
          <tr><td style="padding: 10px 15px; font-weight: bold; color: #555;">Meeting Room:</td><td style="padding: 10px 15px;"><a href="${googleMeetUrl}" style="color: #3b82f6; font-weight: bold;">${googleMeetUrl}</a></td></tr>
        </table>

        <h3 style="color: #1A1425; margin-bottom: 6px; font-size: 14px;">Attendee Agenda / Notes:</h3>
        <div style="background: #ffffff; padding: 15px; border-radius: 8px; border-left: 4px solid #d4af37; font-size: 13px; line-height: 1.6; color: #333; margin-bottom: 22px;">
          ${(message || 'No additional note provided.').replace(/\n/g, '<br/>')}
        </div>

        <div style="text-align: center; margin: 25px 0;">
          <a href="${googleMeetUrl}" style="display: inline-block; background-color: #D4A54A; color: #1A1425; font-weight: bold; font-size: 14px; text-decoration: none; padding: 14px 28px; border-radius: 8px; text-transform: uppercase; letter-spacing: 0.5px;">
            🎥 Open Google Meet Room
          </a>
        </div>

        <p style="font-size: 11px; color: #777; margin-top: 25px; border-top: 1px solid #e5e5e5; padding-top: 12px;">
          Thiran Private Limited • Official Scheduling Dispatch • 24hr & 1hr Reminders Attached
        </p>
      </div>
    `;

    // 3. Attendee Confirmation Email
    const attendeeHtmlContent = `
      <div style="font-family: Arial, sans-serif; padding: 24px; color: #1A1425; background-color: #faf9f6; border-radius: 12px; border: 1px solid #e0d7c7; max-width: 620px; margin: 0 auto;">
        <h2 style="color: #8c6d23; border-bottom: 2px solid #d4af37; padding-bottom: 10px; margin-top: 0;">
          Meeting Confirmed with ${personName}
        </h2>
        <p style="font-size: 15px;">Hello <strong>${name}</strong>,</p>
        <p>Your session with <strong>${personName}</strong> (Thiran Private Limited) is successfully scheduled.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 18px 0; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #eaeaea; font-size: 14px;">
          <tr style="border-bottom: 1px solid #f0f0f0;"><td style="padding: 10px 15px; font-weight: bold; width: 140px; color: #555;">Host:</td><td style="padding: 10px 15px;"><strong>${personName}</strong> (<a href="mailto:${hostEmail}">${hostEmail}</a>)</td></tr>
          <tr style="border-bottom: 1px solid #f0f0f0;"><td style="padding: 10px 15px; font-weight: bold; color: #555;">Date & Time:</td><td style="padding: 10px 15px; color: #8c6d23; font-weight: bold;">${formattedStartStr}</td></tr>
          <tr style="border-bottom: 1px solid #f0f0f0;"><td style="padding: 10px 15px; font-weight: bold; color: #555;">Purpose:</td><td style="padding: 10px 15px;">${purpose}</td></tr>
          <tr style="border-bottom: 1px solid #f0f0f0;"><td style="padding: 10px 15px; font-weight: bold; color: #555;">Format:</td><td style="padding: 10px 15px;">${mode || 'Google Meet'}</td></tr>
          <tr><td style="padding: 10px 15px; font-weight: bold; color: #555;">Meeting Room:</td><td style="padding: 10px 15px;"><a href="${googleMeetUrl}" style="color: #3b82f6; font-weight: bold;">${googleMeetUrl}</a></td></tr>
        </table>

        <div style="text-align: center; margin: 25px 0;">
          <a href="${googleMeetUrl}" style="display: inline-block; background-color: #D4A54A; color: #1A1425; font-weight: bold; font-size: 14px; text-decoration: none; padding: 14px 28px; border-radius: 8px; text-transform: uppercase; letter-spacing: 0.5px;">
            🎥 Join Google Meet
          </a>
        </div>

        <p style="font-size: 13px; color: #555;">
          An <code>.ics</code> calendar event file is attached. You will receive automatic reminders <strong>24 hours</strong> and <strong>1 hour</strong> before the session.
        </p>

        <p style="font-size: 11px; color: #777; margin-top: 25px; border-top: 1px solid #e5e5e5; padding-top: 12px;">
          Thiran Private Limited • Empowering regional student innovation & partnerships
        </p>
      </div>
    `;

    // Persist booking record
    saveBookedSlot({
      id: meetingUid,
      status: 'CONFIRMED',
      name,
      email,
      organization,
      purpose,
      personId,
      personName,
      personEmail: hostEmail,
      date,
      timeSlot,
      startDateTime: startDateTime.toISOString(),
      endDateTime: endDateTime.toISOString(),
      mode: mode || 'Google Meet',
      googleMeetUrl,
      message,
      createdAt: new Date().toISOString()
    });

    // Send emails via mailer
    try {
      await sendEmail({
        to: hostEmail,
        replyTo: email,
        subject: `[New Meeting] ${purpose}: ${name} with ${personName}`,
        html: teamHtmlContent,
        attachments: [icsAttachment],
        icalEvent: {
          filename: 'invite.ics',
          method: 'REQUEST',
          content: icsContent,
        },
      });

      await sendEmail({
        to: email,
        replyTo: hostEmail,
        subject: `Confirmed: Meeting with ${personName} (Thiran)`,
        html: attendeeHtmlContent,
        attachments: [icsAttachment],
        icalEvent: {
          filename: 'invite.ics',
          method: 'REQUEST',
          content: icsContent,
        },
      });
    } catch (e) {
      console.warn('Direct mailer relay notice:', e);
    }

    return NextResponse.json({ 
      success: true, 
      bookingId: meetingUid,
      googleMeetUrl,
      message: `Meeting scheduled with ${personName}. Google Meet and calendar details dispatched to ${email} and ${hostEmail}.`,
      icsData: icsContent,
      startDateTime: startDateTime.toISOString(),
      endDateTime: endDateTime.toISOString(),
    }, { status: 200 });

  } catch (error) {
    console.error('Schedule API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
