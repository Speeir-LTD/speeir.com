import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(1).max(5000),
});

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request: Request) {
  if (!process.env.COMPANY_USER || !process.env.COMPANY_SMTP_HOST || !process.env.COMPANY_APP_PASSWORD) {
    console.error('sendEmail called but COMPANY_USER/COMPANY_SMTP_HOST/COMPANY_APP_PASSWORD are not configured');
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid input', details: parsed.error.issues.map(i => i.message) },
      { status: 400 }
    );
  }

  const { name, email, message } = parsed.data;
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

  try {
    // Create transporter using SMTP server
    const transporter = nodemailer.createTransport({
      host: process.env.COMPANY_SMTP_HOST,
      port: parseInt(process.env.COMPANY_SMTP_PORT || '465', 10), // Use port 465 for SSL
      secure: true, // Use SSL
      auth: {
        user: process.env.COMPANY_USER,
        pass: process.env.COMPANY_APP_PASSWORD,
      },
    });

    // Email to admin (you)
    const adminEmail = {
      from: `"${safeName} via Speeir" <${process.env.COMPANY_USER}>`,
      to: process.env.COMPANY_USER,
      replyTo: email,
      subject: `New contact from ${safeName}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 8px;">
            New Contact Form Submission
          </h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          <p><strong>Message:</strong></p>
          <div style="background-color: #f8f9fa; border-left: 4px solid #2563eb; padding: 12px; margin: 12px 0;">
            ${safeMessage}
          </div>
        </div>
      `,
    };

    // Confirmation email to sender
    const confirmationEmail = {
      from: `"Speeir Team" <${process.env.COMPANY_USER}>`,
      to: email,
      subject: `We've received your message`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Thank you for contacting us, ${safeName}!</h2>
          <p>We've received your message and will get back to you soon.</p>

          <div style="background-color: #f8f9fa; padding: 16px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Your Message:</h3>
            <p>${safeMessage}</p>
          </div>

          <p style="margin-top: 30px; color: #6c757d; font-size: 0.9em;">
            This is an automated message. Our team will respond to your inquiry as soon as possible.
          </p>
        </div>
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(adminEmail),
      transporter.sendMail(confirmationEmail),
    ]);

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
