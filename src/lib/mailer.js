import nodemailer from 'nodemailer';

// Supports Outlook / Office 365 or Gmail or generic SMTP
export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp-mail.outlook.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || 'ceothiran@outlook.com',
    pass: process.env.SMTP_PASS,
  },
  tls: {
    ciphers: 'SSLv3',
    rejectUnauthorized: false
  }
});

export const sendEmail = async ({ to, cc, replyTo, subject, text, html, attachments, icalEvent }) => {
  try {
    const mailOptions = {
      from: `"Thiran Scheduling" <${process.env.SMTP_USER || 'ceothiran@outlook.com'}>`,
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
    console.error("Email send error:", error);
    return { success: false, error };
  }
};
