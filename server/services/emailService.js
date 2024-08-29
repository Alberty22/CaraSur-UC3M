require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

const sendEmail = async ({ to, subject, text, html }) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,  
    to,                            
    subject,                       
    text,                          
    html,                         
  };

  try {
    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error(`Unable to send the email: ${error.message || error}`);
  }
}

module.exports = { sendEmail };
