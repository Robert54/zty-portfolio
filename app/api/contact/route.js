import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  const body = await request.json();
  const { firstname, lastname, email, phone, service, message } = body;

  console.log('EMAIL_USER:', process.env.EMAIL_USER);
  console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Set' : 'Not set');

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
      subject: subject,
      text: `
        Name: ${firstname} ${lastname}
        Email: ${email}
        Phone: ${phone}
        Service: ${service}
        Message: ${message}
      `,
    });

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Error sending email', error: error.message }, { status: 500 });
  }
}