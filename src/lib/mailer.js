// Direct HTTP client for SendGrid v3 Mail API & dynamic SMTP fallback
// 100% compatible with Next.js Turbopack & Vercel serverless without bundler errors

export const sendEmail = async ({ from, to, cc, replyTo, subject, text, html, attachments, icalEvent }) => {
  const apiKey = process.env.SENDGRID_API_KEY || process.env.TWILIO_SENDGRID_API_KEY;
  const senderEmail = from || process.env.SENDGRID_FROM_EMAIL || 'thiranprivateltd@gmail.com';

  // Format attachments for SendGrid v3 API payload
  const formattedAttachments = [];

  if (attachments && attachments.length > 0) {
    attachments.forEach(att => {
      let b64Content = '';
      if (Buffer.isBuffer(att.content)) {
        b64Content = att.content.toString('base64');
      } else if (typeof att.content === 'string') {
        b64Content = Buffer.from(att.content).toString('base64');
      }
      formattedAttachments.push({
        content: b64Content,
        filename: att.filename,
        type: att.contentType || 'text/plain',
        disposition: 'attachment',
      });
    });
  }

  if (icalEvent && icalEvent.content) {
    formattedAttachments.push({
      content: Buffer.from(icalEvent.content).toString('base64'),
      filename: icalEvent.filename || 'invite.ics',
      type: 'text/calendar; method=REQUEST',
      disposition: 'attachment',
    });
  }

  // 1. Primary Method: Direct SendGrid v3 REST API (Zero external package dependencies)
  if (apiKey) {
    try {
      const personalizations = [
        {
          to: [{ email: to }],
          subject: subject || 'Notification from Thiran',
        }
      ];

      if (cc) {
        personalizations[0].cc = [{ email: cc }];
      }

      const payload = {
        personalizations,
        from: {
          email: senderEmail,
          name: 'Thiran Corporate'
        },
        reply_to: {
          email: replyTo || senderEmail
        },
        content: [
          ...(text ? [{ type: 'text/plain', value: text }] : []),
          { type: 'text/html', value: html || text || '<p>Notification from Thiran</p>' }
        ]
      };

      if (formattedAttachments.length > 0) {
        payload.attachments = formattedAttachments;
      }

      const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey.trim()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (res.ok || res.status === 202) {
        return { success: true, status: res.status };
      } else {
        const errText = await res.text();
        console.warn('SendGrid REST API responded with status:', res.status, errText);
      }
    } catch (err) {
      console.error('SendGrid fetch error:', err);
    }
  }

  // 2. Secondary Method: Nodemailer SMTP (Dynamic import to prevent bundling failures)
  try {
    const nodemailer = await import('nodemailer');
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.sendgrid.net',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER || 'apikey',
        pass: apiKey || process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"Thiran Corporate" <${senderEmail}>`,
      to,
      cc,
      replyTo: replyTo || senderEmail,
      subject,
      text,
      html,
      attachments,
      icalEvent
    };

    const info = await transporter.sendMail(mailOptions);
    return { success: true, info };
  } catch (error) {
    console.error('SMTP dynamic relay fallback error:', error);
    return { success: false, error: String(error) };
  }
};
