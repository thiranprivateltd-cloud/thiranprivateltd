// Helper to get transporter for a specific sender email or default master account
export const getTransporter = (fromEmail) => {
  let user = process.env.SMTP_USER || 'ceothiran@outlook.com';
  let pass = process.env.SMTP_PASS;

  if (fromEmail) {
    const emailLower = fromEmail.toLowerCase();
    if (emailLower.includes('ceothiran')) {
      user = process.env.OUTLOOK_VARSHITH_USER || user;
      pass = process.env.OUTLOOK_VARSHITH_PASS || pass;
    } else if (emailLower.includes('coothiran')) {
      user = process.env.OUTLOOK_DHARSHAN_USER || user;
      pass = process.env.OUTLOOK_DHARSHAN_PASS || pass;
    } else if (emailLower.includes('projectmanagerthiran')) {
      user = process.env.OUTLOOK_BRUNDAVANAM_USER || user;
      pass = process.env.OUTLOOK_BRUNDAVANAM_PASS || pass;
    } else if (emailLower.includes('productmanagerthiran')) {
      user = process.env.OUTLOOK_RAHAV_USER || user;
      pass = process.env.OUTLOOK_RAHAV_PASS || pass;
    } else if (emailLower.includes('techleadthiran')) {
      user = process.env.OUTLOOK_MUKUNTHAN_USER || user;
      pass = process.env.OUTLOOK_MUKUNTHAN_PASS || pass;
    } else if (emailLower.includes('hrcoordinatorthiran')) {
      user = process.env.OUTLOOK_PRAVEENA_USER || user;
      pass = process.env.OUTLOOK_PRAVEENA_PASS || pass;
    } else if (emailLower.includes('digitalmediathiran')) {
      user = process.env.OUTLOOK_AKASH_USER || user;
      pass = process.env.OUTLOOK_AKASH_PASS || pass;
    } else if (emailLower.includes('careerresearchanalystthiran')) {
      user = process.env.OUTLOOK_HARIHARAN_USER || user;
      pass = process.env.OUTLOOK_HARIHARAN_PASS || pass;
    } else if (emailLower.includes('aimldevthiran')) {
      user = process.env.OUTLOOK_KEERTHANA_USER || user;
      pass = process.env.OUTLOOK_KEERTHANA_PASS || pass;
    }
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp-mail.outlook.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user,
      pass,
    },
    tls: {
      ciphers: 'SSLv3',
      rejectUnauthorized: false
    }
  });
};

export const sendEmail = async ({ from, to, cc, replyTo, subject, text, html, attachments, icalEvent }) => {
  try {
    const senderEmail = from || process.env.SMTP_USER || 'ceothiran@outlook.com';
    const transporter = getTransporter(senderEmail);

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
    console.error("Email send error:", error);
    return { success: false, error };
  }
};
