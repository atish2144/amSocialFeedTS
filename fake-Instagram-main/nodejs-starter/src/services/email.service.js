const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');
const config = require('../config/config');
const logger = require('../config/logger');




const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'nk1845425@gmail.com',
      pass: 'Raja098@'
  }
});
if (config.env !== 'test') {
transporter
          .verify()
          .then(() => logger.info(`Connected to email server => ${config.email.smtp.host}`))
          .catch(() => logger.warn('Unable to connect to email server. Make sure you have correctly configured the SMTP options in .env'));
      }


// const transport = (function () {
 
//   switch (config.email.provider) {

//     case "sendgrid":
//       logger.info("Setting SendGrid API key...");
//       sgMail.setApiKey(config.email.key);
//       return sgMail;

//     case "aws":
//       // To be implemented later. Use smtp for development
//       throw new Error("AWS Mailer not supported");

//     case "gmail":
//     //  { service: 'gmail',
//     //   auth: {
//     //     user: 'asifsayyed1999@gmail.com',
//     //     pass: ''
//     // }}
//     // break;

//     default:
//       const tp = nodemailer.createTransport(config.email.smtp);
//       if (config.env !== 'test') {
//         tp
//           .verify()
//           .then(() => logger.info(`Connected to email server => ${config.email.smtp.host}`))
//           .catch(() => logger.warn('Unable to connect to email server. Make sure you have correctly configured the SMTP options in .env'));
//       }
//       return tp;
//   }


// })();

/**
 * 
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to, subject, text) => {
  
  const msg = {
    from: config.email.from,
    to,
    subject,
    text
  };

  switch(config.email.provider) {
    case "sendgrid":
      await transporter.send(msg);
      break;

    case "aws":
      await transporter.send(msg);
      break;

    case "smtp":
      // await transporter.send(msg);
      // break;


    default:
      await transporter.sendMail(msg);
      break;
  }
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */

const sendResetPasswordEmail = async (to, token) => {
  const subject = 'Reset password';
  // replace this url with the link to the reset password page of your front-end app
  const resetPasswordUrl = `${config.siteUrl}/reset-password?token=${token}`;
  const text = `Dear user,
To reset your password, click on this link: ${resetPasswordUrl}
If you did not request any password resets, then ignore this email.`;
  await sendEmail(to, subject, text);
};

/**
 * Send verification email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendVerificationEmail = async (to, token) => {
  const subject = 'Email Verification';
  // replace this url with the link to the email verification page of your front-end app
  const verificationEmailUrl = `${config.siteUrl}/verify-email?token=${token}`;
  console.log(to, verificationEmailUrl);
  const text = `Dear user,
To verify your email, click on this link: ${verificationEmailUrl}
If you did not create an account, then ignore this email.`;
  await sendEmail(to, subject, text);
};

module.exports = {
  transporter,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
};
