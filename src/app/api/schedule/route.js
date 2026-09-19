import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/mailer';

// Helper to format ISO date string for iCalendar UTC (e.g. 20260920T100000Z)
function formatICSDate(date) {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
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
      personName, 
      personEmail,
      date, 
      timeSlot, 
      message, 
      mode 
    } = body;

    if (!name || !email || !personEmail) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const meetingUid = `THIRAN-MEET-${Date.now()}@thiran.in`;
    const meetingTitle = `[Thiran Discussion] ${purpose || 'Meeting'}: ${name} & ${personName}`;
    const meetingLocation = mode || 'Microsoft Teams / Outlook Video';

    // Parse date and time into start and end dates
    let startDateTime = new Date();
    if (date && timeSlot) {
      // Parse custom or selected date & time
      const datePart = date; // e.g. "2026-09-21"
      // timeSlot might be e.g. "15:00" or "03:00 PM"
      let hours = 10;
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
      startDateTime.setHours(14, 0, 0, 0);
    }

    // Default duration 30 mins
    const endDateTime = new Date(startDateTime.getTime() + 30 * 60 * 1000);

    const agendaText = `
Meeting Purpose: ${purpose || 'General Discussion'}
Team Member: ${personName} (${personEmail})
Attendee: ${name} (${email})
Organization: ${organization || 'Individual / Independent'}
Scheduled Date & Time: ${startDateTime.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}
Meeting Platform: ${meetingLocation}

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

    // 1. Email to Team Member's Official Outlook Inbox
    const teamHtmlContent = `
      <div style="font-family: Arial, sans-serif; padding: 24px; color: #1A1425; background-color: #faf9f6; border-radius: 12px; border: 1px solid #e0d7c7;">
        <h2 style="color: #8c6d23; border-bottom: 2px solid #d4af37; padding-bottom: 10px; margin-top: 0;">
          📅 New Meeting Scheduled — ${purpose}
        </h2>
        <p style="font-size: 15px;">Hello <strong>${personName}</strong>,</p>
        <p>A new meeting has been booked via the Thiran corporate portal. An Outlook calendar invite (.ics) is attached with a <strong>1-day prior reminder</strong>.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 18px 0; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #eaeaea;">
          <tr style="border-bottom: 1px solid #f0f0f0;"><td style="padding: 10px 15px; font-weight: bold; width: 140px; color: #555;">Attendee:</td><td style="padding: 10px 15px;">${name} (<a href="mailto:${email}">${email}</a>)</td></tr>
          <tr style="border-bottom: 1px solid #f0f0f0;"><td style="padding: 10px 15px; font-weight: bold; color: #555;">Organization:</td><td style="padding: 10px 15px;">${organization || 'Individual / Not specified'}</td></tr>
          <tr style="border-bottom: 1px solid #f0f0f0;"><td style="padding: 10px 15px; font-weight: bold; color: #555;">Date & Slot:</td><td style="padding: 10px 15px; color: #8c6d23; font-weight: bold;">${startDateTime.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}</td></tr>
          <tr style="border-bottom: 1px solid #f0f0f0;"><td style="padding: 10px 15px; font-weight: bold; color: #555;">Purpose:</td><td style="padding: 10px 15px;">${purpose}</td></tr>
          <tr><td style="padding: 10px 15px; font-weight: bold; color: #555;">Platform:</td><td style="padding: 10px 15px;">${meetingLocation}</td></tr>
        </table>

        <h3 style="color: #1A1425; margin-bottom: 6px;">Message / Agenda:</h3>
        <div style="background: #ffffff; padding: 15px; border-radius: 8px; border-left: 4px solid #d4af37; font-size: 14px; line-height: 1.6; color: #333;">
          ${(message || 'No additional note provided.').replace(/\n/g, '<br/>')}
        </div>

        <p style="font-size: 11px; color: #777; margin-top: 25px; border-top: 1px solid #e5e5e5; padding-top: 12px;">
          Thiran Private Limited • Automated Corporate Routing • Outlook Calendar Sync Active
        </p>
      </div>
    `;

    // 2. Email to Attendee
    const attendeeHtmlContent = `
      <div style="font-family: Arial, sans-serif; padding: 24px; color: #1A1425; background-color: #faf9f6; border-radius: 12px; border: 1px solid #e0d7c7;">
        <h2 style="color: #8c6d23; border-bottom: 2px solid #d4af37; padding-bottom: 10px; margin-top: 0;">
          Meeting Confirmed with Thiran
        </h2>
        <p style="font-size: 15px;">Hello <strong>${name}</strong>,</p>
        <p>Your session with <strong>${personName}</strong> (${personEmail}) has been scheduled. Attached is your official Outlook/iCalendar invite with automatic reminder sync.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 18px 0; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #eaeaea;">
          <tr style="border-bottom: 1px solid #f0f0f0;"><td style="padding: 10px 15px; font-weight: bold; width: 140px; color: #555;">Team Member:</td><td style="padding: 10px 15px;">${personName} (<a href="mailto:${personEmail}">${personEmail}</a>)</td></tr>
          <tr style="border-bottom: 1px solid #f0f0f0;"><td style="padding: 10px 15px; font-weight: bold; color: #555;">Scheduled Time:</td><td style="padding: 10px 15px; color: #8c6d23; font-weight: bold;">${startDateTime.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}</td></tr>
          <tr style="border-bottom: 1px solid #f0f0f0;"><td style="padding: 10px 15px; font-weight: bold; color: #555;">Purpose:</td><td style="padding: 10px 15px;">${purpose}</td></tr>
          <tr><td style="padding: 10px 15px; font-weight: bold; color: #555;">Platform:</td><td style="padding: 10px 15px;">${meetingLocation}</td></tr>
        </table>

        <p style="font-size: 13px; color: #555;">
          A calendar notification will alert you <strong>1 day before</strong> the session. If you need to reschedule or share additional documents, simply reply to this email.
        </p>

        <p style="font-size: 11px; color: #777; margin-top: 25px; border-top: 1px solid #e5e5e5; padding-top: 12px;">
          Thiran Private Limited • Empowering next-generation opportunities
        </p>
      </div>
    `;

    // Send email to the official team member's Outlook ID
    await sendEmail({
      to: personEmail,
      replyTo: email,
      subject: `[Scheduled Meeting] ${purpose}: ${name} with ${personName}`,
      html: teamHtmlContent,
      attachments: [icsAttachment],
      icalEvent: {
        filename: 'invite.ics',
        method: 'REQUEST',
        content: icsContent,
      },
    });

    // Send confirmation email to the attendee
    await sendEmail({
      to: email,
      replyTo: personEmail,
      subject: `Confirmed: Meeting with ${personName} (Thiran)`,
      html: attendeeHtmlContent,
      attachments: [icsAttachment],
      icalEvent: {
        filename: 'invite.ics',
        method: 'REQUEST',
        content: icsContent,
      },
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Meeting successfully scheduled with Outlook Calendar synchronization.',
      icsData: icsContent,
      startDateTime: startDateTime.toISOString(),
      endDateTime: endDateTime.toISOString(),
    }, { status: 200 });

  } catch (error) {
    console.error('Schedule API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
