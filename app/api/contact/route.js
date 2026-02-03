import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: 'Invalid JSON payload' }, { status: 400 });
  }

  const normalize = (value) => (typeof value === 'string' ? value.trim() : '');
  const firstname = normalize(body?.firstname);
  const lastname = normalize(body?.lastname);
  const email = normalize(body?.email);
  const phone = normalize(body?.phone);
  const service = normalize(body?.service);
  const message = normalize(body?.message);

  const isNonEmpty = (value) => value.length > 0;
  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  if (
    !isNonEmpty(firstname) ||
    !isNonEmpty(lastname) ||
    !isNonEmpty(email) ||
    !isNonEmpty(phone) ||
    !isNonEmpty(message) ||
    !isValidEmail(email)
  ) {
    return NextResponse.json({ message: 'Invalid form data' }, { status: 400 });
  }

  const missingEnv = ['EMAIL_USER', 'EMAIL_PASS', 'EMAIL_FROM', 'EMAIL_FROM_NAME']
    .filter((key) => !process.env[key]);
  if (missingEnv.length > 0) {
    console.error('Missing email configuration:', missingEnv);
    return NextResponse.json({ message: 'Email service not configured' }, { status: 500 });
  }

  // Format the date for the subject
  const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });

  // Create a formatted service type
  const serviceType = service ? `[${service}]` : '[General Inquiry]';

  // Create a more descriptive subject line
  const subject = `${serviceType} New Contact from ${firstname} ${lastname} - ${date}`;

  // Create a transporter using SMTP
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // Adjust if using a different provider
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    // Verify SMTP connection configuration
    await transporter.verify();

    // Send email
    await transporter.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM}>`,
      to: "zty9854@gmail.com",
      replyTo: email,
      subject: subject,
      text: `
        Name: ${firstname} ${lastname}
        Email: ${email}
        Phone: ${phone}
        Service: ${service || 'General Inquiry'}
        Message: ${message}
      `,
    });

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Error sending email' }, { status: 500 });
  }
}
