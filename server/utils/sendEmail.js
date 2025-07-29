import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL,
      to,
      subject,
      text,
      html
    });

    console.log(info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendEmail;
