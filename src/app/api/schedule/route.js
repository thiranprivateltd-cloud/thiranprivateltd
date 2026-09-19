import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/mailer';
import { microsoftCalendars } from '@/data/microsoftCalendars';
import fs from 'fs';
import path from 'path';

// Helper to format ISO date string for iCalendar UTC (e.g. 20260920T100000Z)
function formatICSDate(date) {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

const bookedSlotsFilePath = path.join(process.cwd(), 'src', 'data', 'bookedSlots.json');

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

// Helper to generate RFC 5545 iCalendar (.ics) content with 1-day reminder VALARM
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
    'PRODID:-//Thiran Private Limited//Scheduling System//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
    `LOCATION:${location || 'Microsoft Teams / Online Meeting'}`,
    `ORGANIZER;CN="${organizerName}":mailto:${organizerEmail}`,
    `ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;CN="${attendeeName}":mailto:${attendeeEmail}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    // VALARM: 1 Day before notification reminder (1440 minutes = 24 hours)
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: You have a scheduled meeting with Thiran tomorrow',
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

    if (!name || !email || !personEmail || !date || !timeSlot) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Double Booking Check
    const existingBookings = getBookedSlots();
    const isConflict = existingBookings.some(b => 
      b.personEmail?.toLowerCase() === personEmail.toLowerCase() &&
      b.date === date &&
      b.timeSlot === timeSlot
    );

    if (isConflict) {
      return NextResponse.json({
        error: `Slot ${timeSlot} on ${date} with ${personName} is already reserved. Please select another time.`
      }, { status: 409 });
    }

    const meetingUid = `THIRAN-MEET-${Date.now()}@thiran.in`;
    const meetingTitle = `[Thiran Discussion] ${purpose || 'Meeting'}: ${name} & ${personName}`;
    const meetingLocation = mode || 'Microsoft Teams / Outlook Video';

    // Parse date and time into start and end dates
    let startDateTime = new Date();
    if (date && timeSlot) {
      const datePart = date; // e.g. "2026-09-21"
      let hours = 16;
      let minutes = 0;
      
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
      startDateTime.setDate(startDateTime.getDate() + 2);
      startDateTime.setHours(16, 30, 0, 0);
    }

    // Default duration 30 mins
    const endDateTime = new Date(startDateTime.getTime() + 30 * 60 * 1000);

    const agendaText = `
Meeting Purpose: ${purpose || 'General Discussion'}
Host Member: ${personName} (${personEmail})
Attendee: ${name} (${email})
Organization: ${organization || 'Individual / Independent'}
Scheduled Date & Time: ${startDateTime.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}
Platform: ${meetingLocation}

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
      organizerEmail: personEmail,
      attendeeName: name,
      attendeeEmail: email,
    });

    const icsAttachment = {
      filename: 'meeting-invite.ics',
      content: icsContent,
      contentType: 'text/calendar; charset=utf-8; method=REQUEST',
    };

    // Action Deep-links for Team Member's Outlook email:
    // 1. Accept & Add to Outlook Calendar
    const acceptOutlookUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(meetingTitle)}&body=${encodeURIComponent(agendaText)}&location=${encodeURIComponent(meetingLocation)}&startdt=${startDateTime.toISOString()}&enddt=${endDateTime.toISOString()}`;
    
    // 2. Customize Date / Propose New Slot
    const customizeMailto = `mailto:${email}?subject=${encodeURIComponent(`[Reschedule / Custom Time] Regarding: ${meetingTitle}`)}&body=${encodeURIComponent(`Hi ${name},\n\nThank you for reaching out to Thiran.\n\nI would like to propose an alternate meeting time for our discussion regarding ${purpose}.\n\nPlease let me know if any of the following alternate slots work for you:\n- [Option 1: Date & Time]\n- [Option 2: Date & Time]\n\nLooking forward to connecting.\n\nBest regards,\n${personName}\nThiran Private Limited`)}`;

    // 3. Decline Meeting
    const declineMailto = `mailto:${email}?subject=${encodeURIComponent(`[Meeting Update] Regretfully Unable to Meet: ${purpose}`)}&body=${encodeURIComponent(`Hi ${name},\n\nThank you for your interest in connecting with Thiran.\n\nRegretfully, I am unable to proceed with this meeting at this time.\n\nBest regards,\n${personName}\nThiran Private Limited`)}`;

    // 1. Email to Team Member's Official Outlook Inbox ONLY
    const teamHtmlContent = `
      <div style="font-family: Arial, sans-serif; padding: 24px; color: #1A1425; background-color: #faf9f6; border-radius: 12px; border: 1px solid #e0d7c7; max-width: 620px; margin: 0 auto;">
        <h2 style="color: #8c6d23; border-bottom: 2px solid #d4af37; padding-bottom: 10px; margin-top: 0;">
          📅 New Inbound Schedule Request — ${purpose}
        </h2>
        <p style="font-size: 15px;">Hello <strong>${personName}</strong>,</p>
        <p>A meeting has been requested with you on your official Outlook calendar. Please review the details and choose your action below:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 18px 0; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #eaeaea; font-size: 14px;">
          <tr style="border-bottom: 1px solid #f0f0f0;"><td style="padding: 10px 15px; font-weight: bold; width: 140px; color: #555;">Attendee:</td><td style="padding: 10px 15px;"><strong>${name}</strong> (<a href="mailto:${email}" style="color: #3b82f6;">${email}</a>)</td></tr>
          <tr style="border-bottom: 1px solid #f0f0f0;"><td style="padding: 10px 15px; font-weight: bold; color: #555;">Organization:</td><td style="padding: 10px 15px;">${organization || 'Individual / Independent'}</td></tr>
          <tr style="border-bottom: 1px solid #f0f0f0;"><td style="padding: 10px 15px; font-weight: bold; color: #555;">Requested Slot:</td><td style="padding: 10px 15px; color: #8c6d23; font-weight: bold;">${startDateTime.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}</td></tr>
          <tr style="border-bottom: 1px solid #f0f0f0;"><td style="padding: 10px 15px; font-weight: bold; color: #555;">Purpose:</td><td style="padding: 10px 15px;">${purpose}</td></tr>
          <tr><td style="padding: 10px 15px; font-weight: bold; color: #555;">Platform:</td><td style="padding: 10px 15px;">${meetingLocation}</td></tr>
        </table>

        <h3 style="color: #1A1425; margin-bottom: 6px; font-size: 14px;">Attendee Agenda / Note:</h3>
        <div style="background: #ffffff; padding: 15px; border-radius: 8px; border-left: 4px solid #d4af37; font-size: 13px; line-height: 1.6; color: #333; margin-bottom: 22px;">
          ${(message || 'No additional note provided.').replace(/\n/g, '<br/>')}
        </div>

        <!-- 3 ACTION BUTTONS -->
        <h3 style="color: #1A1425; margin-bottom: 10px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Take Action on this Request:</h3>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <a href="${acceptOutlookUrl}" style="display: block; text-align: center; background-color: #10B981; color: #ffffff; text-decoration: none; padding: 12px 18px; border-radius: 8px; font-weight: bold; font-size: 13px; text-transform: uppercase;">
            ✅ Accept & Add to Microsoft Outlook Calendar
          </a>
          <a href="${customizeMailto}" style="display: block; text-align: center; background-color: #3B82F6; color: #ffffff; text-decoration: none; padding: 12px 18px; border-radius: 8px; font-weight: bold; font-size: 13px; text-transform: uppercase;">
            ✏️ Customize Date / Propose Alternate Time
          </a>
          <a href="${declineMailto}" style="display: block; text-align: center; background-color: #EF4444; color: #ffffff; text-decoration: none; padding: 12px 18px; border-radius: 8px; font-weight: bold; font-size: 13px; text-transform: uppercase;">
            ❌ Decline Meeting Request
          </a>
        </div>

        <p style="font-size: 11px; color: #777; margin-top: 25px; border-top: 1px solid #e5e5e5; padding-top: 12px;">
          Thiran Private Limited • Direct Outlook Member Dispatch • 24hr Calendar Alarm Included
        </p>
      </div>
    `;

    // 2. Email to Attendee
    const attendeeHtmlContent = `
      <div style="font-family: Arial, sans-serif; padding: 24px; color: #1A1425; background-color: #faf9f6; border-radius: 12px; border: 1px solid #e0d7c7; max-width: 620px; margin: 0 auto;">
        <h2 style="color: #8c6d23; border-bottom: 2px solid #d4af37; padding-bottom: 10px; margin-top: 0;">
          Meeting Request Sent to ${personName}
        </h2>
        <p style="font-size: 15px;">Hello <strong>${name}</strong>,</p>
        <p>Your session request with <strong>${personName}</strong> has been sent directly to their official Outlook inbox (<strong>${personEmail}</strong>). Attached is your calendar invite with 24-hour reminder sync.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 18px 0; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #eaeaea; font-size: 14px;">
          <tr style="border-bottom: 1px solid #f0f0f0;"><td style="padding: 10px 15px; font-weight: bold; width: 140px; color: #555;">Team Member:</td><td style="padding: 10px 15px;">${personName} (<a href="mailto:${personEmail}">${personEmail}</a>)</td></tr>
          <tr style="border-bottom: 1px solid #f0f0f0;"><td style="padding: 10px 15px; font-weight: bold; color: #555;">Requested Time:</td><td style="padding: 10px 15px; color: #8c6d23; font-weight: bold;">${startDateTime.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}</td></tr>
          <tr style="border-bottom: 1px solid #f0f0f0;"><td style="padding: 10px 15px; font-weight: bold; color: #555;">Purpose:</td><td style="padding: 10px 15px;">${purpose}</td></tr>
          <tr><td style="padding: 10px 15px; font-weight: bold; color: #555;">Platform:</td><td style="padding: 10px 15px;">${meetingLocation}</td></tr>
        </table>

        <p style="font-size: 13px; color: #555;">
          A calendar notification will automatically alert you <strong>1 day before</strong> the session.
        </p>

        <p style="font-size: 11px; color: #777; margin-top: 25px; border-top: 1px solid #e5e5e5; padding-top: 12px;">
          Thiran Private Limited • Empowering regional student innovation & partnerships
        </p>
      </div>
    `;

    // Persist to prevent double booking
    saveBookedSlot({
      personEmail,
      date,
      timeSlot,
      createdAt: new Date().toISOString()
    });

    // Dispatch directly to the member's official Outlook address ONLY
    await sendEmail({
      to: personEmail,
      replyTo: email,
      subject: `[Meeting Request] ${purpose}: ${name} with ${personName}`,
      html: teamHtmlContent,
      attachments: [icsAttachment],
      icalEvent: {
        filename: 'invite.ics',
        method: 'REQUEST',
        content: icsContent,
      },
    });

    // Send confirmation to the applicant
    await sendEmail({
      to: email,
      replyTo: personEmail,
      subject: `Schedule Request Received: Meeting with ${personName} (Thiran)`,
      html: attendeeHtmlContent,
      attachments: [icsAttachment],
      icalEvent: {
        filename: 'invite.ics',
        method: 'REQUEST',
        content: icsContent,
      },
    });

    const memberGraphCalendar = personId ? microsoftCalendars[personId] : null;

    return NextResponse.json({ 
      success: true, 
      message: `Meeting request sent directly to ${personName} (${personEmail}) with Outlook Calendar synchronization.`,
      icsData: icsContent,
      graphCalendar: memberGraphCalendar,
      startDateTime: startDateTime.toISOString(),
      endDateTime: endDateTime.toISOString(),
    }, { status: 200 });

  } catch (error) {
    console.error('Schedule API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
