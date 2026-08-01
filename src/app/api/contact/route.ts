import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { validateContact } from "@/utils/validators/contact";

const errorResponse = (message: string, status: number) => {
  return NextResponse.json({ success: false, error: message }, { status });
};

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse("Invalid request body", 400);
  }

  const validation = validateContact(body);
  if (!validation.success) {
    return errorResponse("Please fill in all fields with a valid email address", 400);
  }
  const { name, email, message } = validation.data;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_TO_EMAIL) {
    console.error("Contact form: SMTP env vars are not configured");
    return errorResponse("Contact form is not configured yet", 500);
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      from: SMTP_USER,
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `New contact form message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${message.replace(/\n/g, "<br>")}</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form send error:", error);
    return errorResponse("Failed to send message. Please email us directly.", 500);
  }
}
