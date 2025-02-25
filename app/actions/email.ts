"use server";

import nodemailer from "nodemailer";

// Configure email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
  secure: process.env.NODE_ENV === "production",
});

export async function sendPasswordResetEmail(
  email: string,
  name: string,
  resetUrl: string
) {
  const mailOptions = {
    from: `"Parish App" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: "Reset Your Password",
    text: `
      Hello ${name},
      
      You requested a password reset for your Parish App account.
      
      Please click the link below to reset your password:
      ${resetUrl}
      
      This link will expire in 1 hour.
      
      If you didn't request this, please ignore this email.
      
      Regards,
      Parish App Team
    `,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Reset Your Password</h2>
        <p>Hello ${name},</p>
        <p>You requested a password reset for your Parish App account.</p>
        <p>Please click the button below to reset your password:</p>
        <p style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
            Reset Password
          </a>
        </p>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
        <p>Regards,<br>Parish App Team</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}
