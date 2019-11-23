const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/* sgMail.setApiKey(sendgridAPIKey);
const msg = {
  to: 'xvr.mnts@icloud.com',
  from: 'xvr.mnts@icloud.com',
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail.send(msg); */

const sendWelcomeEmail = (email,name) => {
    const welcomeMessage = {
        to: email,
        from: 'xvr.mnts@icloud.com',
        subject: 'thanks for joining in',
        text: `Welcome to the app, ${name}. Let me know`
    }
    sgMail.send(welcomeMessage)
}

const sendCancelationEmail = (email,name) => {
    const cancelMessage = {
        to: email,
        from: 'xvr.mnts@icloud.com',
        subject: 'it has been a pleasure',
        text: `See you soon, ${name}. Let me know`
    }
    sgMail.send(cancelMessage)
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}