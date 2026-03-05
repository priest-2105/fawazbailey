import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `"${name}" <${process.env.GMAIL_USER}>`,
    to: "fawzybailey782@gmail.com",
    replyTo: email,
    subject: `Portfolio message from ${name}`,
    text: message,
    html: `
      <div style="font-family: sans-serif; max-width: 560px;">
        <p style="font-size: 13px; color: #999; margin-bottom: 24px;">
          Message via fawazbailey.com
        </p>
        <p style="font-size: 16px; color: #111; line-height: 1.7;">${message.replace(/\n/g, "<br/>")}</p>
        <hr style="margin: 24px 0; border: none; border-top: 1px solid #eee;" />
        <p style="font-size: 13px; color: #555;">
          From: <strong>${name}</strong> &lt;${email}&gt;
        </p>
      </div>
    `,
  });

  return NextResponse.json({ ok: true });
}
