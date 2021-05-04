const nodemailer = require('nodemailer');


exports.sendEmail= async (options) => {
  //create a transporter
  const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      password: process.env.EMAIL_PASSWORD,
    },
  });
  //define the email options
  const mailOptions = {
    from: "book club <kasieuchenna@gmail.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  //send the mail
  await transporter.sendMail(mailOptions);
};

exports.forgotPasswordMessage = async (first_name, resetToken) => {
  const message = {
    subject: "Password Reset",
    content: `Dear ${first_name}
            You requested for a password reset. Click on the button below to confirm this action.</p>
          ;' href='${URL}/reset-password?token=${resetToken}'>Reset Password`,
  };
  return message;
};

