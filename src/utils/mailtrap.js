const Nodemailer = require("nodemailer");
const { MailtrapTransport } = require("mailtrap");

const sendEmail = async (email, subject, message) => {
 const transporter = Nodemailer.createTransport(
  MailtrapTransport({
   token: process.env.MAILTRAP_TOKEN,
  })
 );

 const mailOptions = {
  from: process.env.EMAIL_FROM,
  to: email,
  subject,
  text: message,
 };

 await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
