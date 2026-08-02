import { NextResponse } from "next/server";
import { errorResponse } from "@/lib/api";
import nodemailer from "nodemailer";
import { validateContact } from "@/utils/validators/contact";


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

  const { COMPANY_SMTP_HOST, COMPANY_SMTP_PORT, COMPANY_USER, COMPANY_APP_PASSWORD } = process.env;
  if (!COMPANY_SMTP_HOST || !COMPANY_SMTP_PORT || !COMPANY_USER || !COMPANY_APP_PASSWORD) {
    console.error("Contact form: SMTP env vars are not configured");
    return errorResponse("Contact form is not configured yet", 500);
  }

  try {
    const transporter = nodemailer.createTransport({
      host: COMPANY_SMTP_HOST,
      port: Number(COMPANY_SMTP_PORT),
      secure: Number(COMPANY_SMTP_PORT) === 465,
      auth: { user: COMPANY_USER, pass: COMPANY_APP_PASSWORD },
    });

    await transporter.sendMail({
      from: COMPANY_USER,
      // Submissions land in the same mailbox that sends them — .env has no
      // separate recipient key.
      to: COMPANY_USER,
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
