const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  if (process.env.SMTP_HOST && process.env.SMTP_EMAIL) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD
      }
    });

    const message = {
      from: `${process.env.FROM_NAME || 'EMS Pro'} <${process.env.FROM_EMAIL || 'noreply@emspro.com'}>`,
      to: options.email,
      subject: options.subject,
      text: options.message
    };

    await transporter.sendMail(message);
  } else {
    // Development fallback if no SMTP configured
    console.log('\n--- EMAIL SIMULATION (Configure SMTP in .env for real emails) ---');
    console.log('To:', options.email);
    console.log('Subject:', options.subject);
    console.log('Content:\n', options.message);
    console.log('--------------------------------------------------------------\n');
  }
};

module.exports = sendEmail;
