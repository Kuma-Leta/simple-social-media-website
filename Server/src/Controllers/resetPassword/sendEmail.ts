import nodemailer from "nodemailer";

// Function to send an email
export const sendEmail = async (options: {
  to: string;
  subject: string;
  text: string;
}) => {
  try {
    // Create a transporter with your SMTP settings
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Define email options
    const mailOptions = {
      from: `"Your Application" <${process.env.SMTP_FROM_EMAIL}>`,
      to: options.to,
      subject: options.subject,
      text: options.text,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
  } catch (error: any) {
    throw new Error("Failed to send email: " + error.message);
  }
};
