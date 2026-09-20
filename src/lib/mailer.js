import sgMail from '@sendgrid/mail';
import nodemailer from 'nodemailer';

// Initialize Twilio SendGrid if standard SendGrid API key exists
const initialApiKey = process.env.SENDGRID_API_KEY || process.env.TWILIO_SENDGRID_API_KEY;
if (initialApiKey && initialApiKey.startsWith('SG.')) {
  sgMail.setApiKey(initialApiKey);
}

// Fallback SMTP Transporter (SendGrid SMTP)
export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.sendgrid.net',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY || process.env.TWILIO_SENDGRID_API_KEY || process.env.SMTP_PASS,
  },
});

export const sendEmail = async ({ from, to, cc, replyTo, subject, text, html, attachments, icalEvent }) => {
  const apiKey = process.env.SENDGRID_API_KEY || process.env.TWILIO_SENDGRID_API_KEY;
  const senderEmail = from || process.env.SENDGRID_FROM_EMAIL || 'ceothiran@outlook.com';

  // 1. Primary Method: Twilio SendGrid Web API (Direct HTTPS)
  if (apiKey && apiKey.startsWith('SG.')) {
    try {
      sgMail.setApiKey(apiKey);

      const msg = {
        to,
        from: {
          email: senderEmail,
          name: 'Thiran Corporate'
        },
        replyTo: replyTo || senderEmail,
        subject,
        text: text || '',
        html: html || '',
      };

      if (cc) msg.cc = cc;

      // Handle attachments / .ics calendar invite for SendGrid API
      const formattedAttachments = [];

      if (attachments && attachments.length > 0) {
        attachments.forEach(att => {
          formattedAttachments.push({
            content: Buffer.isBuffer(att.content) 
              ? att.content.toString('base64') 
              : Buffer.from(att.content).toString('base64'),
            filename: att.filename,
            type: att.contentType || 'text/plain',
            disposition: 'attachment',
          });
        });
      }

      if (icalEvent) {
        formattedAttachments.push({
          content: Buffer.from(icalEvent.content).toString('base64'),
          filename: icalEvent.filename || 'meeting-invite.ics',
          type: 'text/calendar; method=REQUEST',
          disposition: 'attachment',
        });
      }

      if (formattedAttachments.length > 0) {
        msg.attachments = formattedAttachments;
      }

      const response = await sgMail.send(msg);
      return { success: true, response };
    } catch (error) {
      console.error("Twilio SendGrid API send error:", error?.response?.body || error);
    }
  }

  // 2. Fallback Method: SendGrid SMTP Relay via Nodemailer
  try {
    const mailOptions = {
      from: `"Thiran Corporate" <${senderEmail}>`,
      to,
      cc,
      replyTo,
      subject,
      text,
      html,
      attachments,
      icalEvent
    };

    const info = await transporter.sendMail(mailOptions);
    return { success: true, info };
  } catch (error) {
    console.error("SMTP Relay error:", error);
    return { success: false, error };
  }
};
