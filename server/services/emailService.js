import nodemailer from 'nodemailer';

/**
 * Checks whether outbound SMTP is configured in the environment.
 */
export function isSmtpConfigured() {
  return Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
}

/**
 * Creates and returns a configured Nodemailer transporter.
 */
function getTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = Number(process.env.SMTP_PORT) || 465;
  const secure = process.env.SMTP_SECURE !== 'false' && (port === 465 || !process.env.SMTP_SECURE);

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    },
    tls: {
      rejectUnauthorized: process.env.NODE_ENV === 'production'
    }
  });
}

/**
 * Dispatches a password recovery OTP to the candidate's email address.
 * 
 * @param {Object} params
 * @param {string} params.toEmail - Recipient candidate email
 * @param {string} params.code - 6-digit verification code
 * @param {string} [params.candidateName] - Candidate name
 * @returns {Promise<{ delivered: boolean, error?: string }>}
 */
export async function sendPasswordResetEmail({ toEmail, code, candidateName = 'Candidate' }) {
  if (!isSmtpConfigured()) {
    console.warn(`[EMAIL SERVICE] ⚠️ SMTP is not configured in .env.`);
    console.warn(`[EMAIL SERVICE] Could not dispatch real email to: ${toEmail}`);
    console.warn(`[EMAIL SERVICE] To enable real inbox delivery, configure SMTP_USER & SMTP_PASS in .env.`);
    console.log(`[EMAIL SERVICE: LOCAL DEV OTP] Code for ${toEmail}: ${code}`);
    return { 
      delivered: false, 
      reason: 'SMTP_NOT_CONFIGURED',
      message: 'SMTP credentials not configured in server environment.' 
    };
  }

  try {
    const transporter = getTransporter();
    const fromAddress = process.env.SMTP_FROM || `"SHORTHAND PLUS (Gaya Shorthand Classes)" <${process.env.SMTP_USER || 'stenoplus.in@gmail.com'}>`;

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Password Recovery Code</title>
        <style>
          body { margin: 0; padding: 0; background-color: #FAF9F6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1C1917; }
          .container { max-width: 560px; margin: 40px auto; background-color: #FFFFFF; border: 1px solid #E7E5E4; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.04); }
          .header { background-color: #1C1917; color: #FAF9F6; padding: 28px 32px; text-align: center; }
          .header h1 { margin: 0 0 6px 0; font-size: 20px; font-weight: 700; letter-spacing: 0.5px; }
          .header p { margin: 0; font-size: 13px; color: #D6D3D1; }
          .body-content { padding: 36px 32px; }
          .greeting { font-size: 16px; font-weight: 600; margin-bottom: 12px; color: #1C1917; }
          .text { font-size: 14px; line-height: 1.6; color: #44403C; margin-bottom: 24px; }
          .code-box { background-color: #F5F5F4; border: 2px dashed #D6D3D1; border-radius: 8px; padding: 20px; text-align: center; margin: 28px 0; }
          .code-label { font-size: 12px; font-weight: 600; color: #78716C; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
          .code-value { font-family: 'SF Mono', Monaco, Consolas, 'Liberation Mono', monospace; font-size: 34px; font-weight: 700; color: #D97706; letter-spacing: 8px; margin: 0; }
          .expiry-notice { font-size: 13px; color: #B45309; background-color: #FEF3C7; padding: 10px 14px; border-radius: 6px; margin-bottom: 24px; text-align: center; font-weight: 500; }
          .footer { background-color: #F5F5F4; border-top: 1px solid #E7E5E4; padding: 20px 32px; text-align: center; font-size: 12px; color: #78716C; line-height: 1.5; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>SHORTHAND PLUS</h1>
            <p>Gaya Shorthand Classes • Professional Training Center (Offline / Online)</p>
          </div>
          <div class="body-content">
            <div class="greeting">Hello, ${candidateName}</div>
            <p class="text">
              We received a request to reset your password for your Shorthand Plus candidate account. 
              Please enter the 6-digit verification code below on the recovery page to set your new password:
            </p>
            <div class="code-box">
              <div class="code-label">Your Verification Code</div>
              <div class="code-value">${code}</div>
            </div>
            <div class="expiry-notice">
              ⏱️ This code is valid for <strong>15 minutes</strong> and can only be used once.
            </div>
            <p class="text" style="font-size: 13px; color: #78716C;">
              If you did not request a password reset, you can safely ignore this email. Your existing password will remain secure and unchanged.
            </p>
          </div>
          <div class="footer">
            SHORTHAND PLUS & Gaya Shorthand Classes<br />
            Gaya College More, Opp. Cyber Thana, Gaya, Bihar | Support: stenoplus.in@gmail.com | Website: https://stenoplus.in
          </div>
        </div>
      </body>
      </html>
    `;

    const info = await transporter.sendMail({
      from: fromAddress,
      to: toEmail,
      subject: `SHORTHAND PLUS - Password Reset Verification Code: ${code}`,
      text: `Hello ${candidateName},\n\nYour 6-digit password reset verification code is: ${code}\n\nThis code will expire in 15 minutes.\n\nIf you did not request this, please ignore this email.\n\nSHORTHAND PLUS (Gaya Shorthand Classes)\nHelpline: +91 9204123453\nWebsite: https://stenoplus.in\nEmail: stenoplus.in@gmail.com`,
      html: htmlContent
    });

    console.log(`[EMAIL DISPATCH: SUCCESS] Delivered verification code to ${toEmail}. MessageId: ${info.messageId}`);
    return { delivered: true, messageId: info.messageId };
  } catch (error) {
    console.error(`[EMAIL DISPATCH: FAILED] Could not send email to ${toEmail}:`, error.message);
    return { delivered: false, error: error.message };
  }
}

