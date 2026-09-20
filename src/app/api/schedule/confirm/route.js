import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/mailer';
import fs from 'fs';
import path from 'path';

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

function saveAllBookedSlots(slots) {
  try {
    fs.writeFileSync(bookedSlotsFilePath, JSON.stringify(slots, null, 2), 'utf8');
  } catch (e) {
    console.error('Error saving bookedSlots:', e);
  }
}

function generateConfirmedICS({
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
    'PRODID:-//Thiran Private Limited//Scheduling Confirmation//EN',
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
    'SEQUENCE:1',
    // 24hr reminder alert
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: Tomorrow is your scheduled session with Thiran',
    'END:VALARM',
    // 1hr reminder alert
    'BEGIN:VALARM',
    'TRIGGER:-PT1H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: Meeting with Thiran starts in 1 hour',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.redirect(new URL('/schedule?error=missing_id', req.url));
    }

    const slots = getBookedSlots();
    const index = slots.findIndex(s => s.id === id);

    if (index === -1) {
      return NextResponse.redirect(new URL('/schedule?error=not_found', req.url));
    }

    const booking = slots[index];

    // If not already confirmed, mark confirmed and send attendee email
    if (booking.status !== 'CONFIRMED') {
      booking.status = 'CONFIRMED';
      booking.confirmedAt = new Date().toISOString();
      slots[index] = booking;
      saveAllBookedSlots(slots);

      const meetingUrl = booking.mode?.toLowerCase().includes('google meet')
        ? `https://meet.google.com/lookup/thiran-${booking.id.slice(0, 10)}`
        : `https://teams.microsoft.com/l/meetup-join/thiran-${booking.id.slice(0, 10)}`;

      const meetingTitle = `[CONFIRMED] ${booking.purpose || 'Session'}: ${booking.name} & ${booking.personName}`;
      const startDateTime = new Date(booking.startDateTime || `${booking.date}T16:30:00`);
      const endDateTime = new Date(booking.endDateTime || (startDateTime.getTime() + 30 * 60 * 1000));

      const agendaText = `
Meeting Confirmed: ${booking.purpose}
Host: ${booking.personName} (${booking.personEmail})
Attendee: ${booking.name} (${booking.email})
Scheduled Time: ${startDateTime.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}
Meeting Link: ${meetingUrl}
Platform: ${booking.mode || 'Google Meet / Outlook Video'}

Agenda:
${booking.message || 'No specific agenda provided.'}
      `.trim();

      const icsContent = generateConfirmedICS({
        uid: booking.id,
        title: meetingTitle,
        description: agendaText,
        location: meetingUrl,
        startDate: startDateTime,
        endDate: endDateTime,
        organizerName: booking.personName,
        organizerEmail: booking.personEmail,
        attendeeName: booking.name,
        attendeeEmail: booking.email,
      });

      const icsAttachment = {
        filename: `Confirmed_Meeting_${booking.personName.replace(/\s+/g, '_')}.ics`,
        content: icsContent,
        contentType: 'text/calendar; charset=utf-8; method=REQUEST',
      };

      const attendeeConfirmationHtml = `
        <div style="font-family: Arial, sans-serif; padding: 24px; color: #1A1425; background-color: #faf9f6; border-radius: 12px; border: 1px solid #e0d7c7; max-width: 620px; margin: 0 auto;">
          <div style="background-color: #10B981; color: #ffffff; padding: 12px 20px; border-radius: 8px; font-weight: bold; font-size: 16px; margin-bottom: 20px; text-align: center;">
            🎉 Meeting Request Approved & Confirmed
          </div>
          <h2 style="color: #8c6d23; border-bottom: 2px solid #d4af37; padding-bottom: 10px; margin-top: 0;">
            Confirmed Session with ${booking.personName}
          </h2>
          <p style="font-size: 15px;">Hello <strong>${booking.name}</strong>,</p>
          <p>Great news! <strong>${booking.personName}</strong> has officially reviewed and confirmed your meeting request. The session is now scheduled on both Google Meet and Microsoft Outlook calendars.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 18px 0; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #eaeaea; font-size: 14px;">
            <tr style="border-bottom: 1px solid #f0f0f0;"><td style="padding: 10px 15px; font-weight: bold; width: 140px; color: #555;">Host:</td><td style="padding: 10px 15px;"><strong>${booking.personName}</strong> (${booking.personEmail})</td></tr>
            <tr style="border-bottom: 1px solid #f0f0f0;"><td style="padding: 10px 15px; font-weight: bold; color: #555;">Confirmed Time:</td><td style="padding: 10px 15px; color: #10B981; font-weight: bold;">${startDateTime.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}</td></tr>
            <tr style="border-bottom: 1px solid #f0f0f0;"><td style="padding: 10px 15px; font-weight: bold; color: #555;">Purpose:</td><td style="padding: 10px 15px;">${booking.purpose}</td></tr>
            <tr style="border-bottom: 1px solid #f0f0f0;"><td style="padding: 10px 15px; font-weight: bold; color: #555;">Platform:</td><td style="padding: 10px 15px;">${booking.mode}</td></tr>
            <tr><td style="padding: 10px 15px; font-weight: bold; color: #555;">Join Link:</td><td style="padding: 10px 15px;"><a href="${meetingUrl}" style="color: #3b82f6; font-weight: bold;">Click here to join session</a></td></tr>
          </table>

          <div style="text-align: center; margin: 25px 0;">
            <a href="${meetingUrl}" style="display: inline-block; background-color: #D4A54A; color: #1A1425; font-weight: bold; font-size: 14px; text-decoration: none; padding: 14px 28px; border-radius: 8px; text-transform: uppercase; letter-spacing: 0.5px;">
              🎥 Join Meeting Room
            </a>
          </div>

          <p style="font-size: 13px; color: #555;">
            An <code>.ics</code> calendar event is attached to this email. You will receive automatic reminders <strong>24 hours</strong> and <strong>1 hour</strong> prior to the meeting.
          </p>

          <p style="font-size: 11px; color: #777; margin-top: 25px; border-top: 1px solid #e5e5e5; padding-top: 12px;">
            Thiran Private Limited • Integrated Google Meet & Microsoft Outlook Scheduling
          </p>
        </div>
      `;

      try {
        await sendEmail({
          to: booking.email,
          replyTo: booking.personEmail,
          subject: `Confirmed: Meeting with ${booking.personName} (${booking.purpose})`,
          html: attendeeConfirmationHtml,
          attachments: [icsAttachment],
          icalEvent: {
            filename: 'confirmed-invite.ics',
            method: 'REQUEST',
            content: icsContent,
          }
        });
      } catch (err) {
        console.error('Error sending confirmation email to attendee:', err);
      }
    }

    // Redirect to confirmation success page
    const redirectUrl = new URL('/schedule/confirmed', req.url);
    redirectUrl.searchParams.set('host', booking.personName);
    redirectUrl.searchParams.set('attendee', booking.name);
    redirectUrl.searchParams.set('date', booking.date);
    redirectUrl.searchParams.set('slot', booking.timeSlot);
    redirectUrl.searchParams.set('purpose', booking.purpose);

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error('Error approving booking:', error);
    return NextResponse.redirect(new URL('/schedule?error=server_error', req.url));
  }
}
