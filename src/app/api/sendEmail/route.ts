import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';


// Validate environment variables
if (!process.env.COMPANY_USER || !process.env.COMPANY_SMTP_HOST || !process.env.COMPANY_APP_PASSWORD) {
  throw new Error('Server configuration error: Missing company email credentials');
}

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

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
      from: `"${name} via Speeir" <${process.env.COMPANY_USER}>`,
      to: process.env.COMPANY_USER,
      replyTo: email, 
      subject: `New contact from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 8px;">
            New Contact Form Submission
          </h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Message:</strong></p>
          <div style="background-color: #f8f9fa; border-left: 4px solid #2563eb; padding: 12px; margin: 12px 0;">
            ${message.replace(/\n/g, '<br>')}
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
          <h2 style="color: #2563eb;">Thank you for contacting us, ${name}!</h2>
          <p>We've received your message and will get back to you soon.</p>
          
          <div style="background-color: #f8f9fa; padding: 16px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Your Message:</h3>
            <p>${message.replace(/\n/g, '<br>')}</p>
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
      { 
        error: 'Failed to send email',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}