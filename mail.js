var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

require('dotenv').load();

module.exports.sendmail = (to, from, subject, body) => {
  return new Promise((resolve, reject) => {
    var smtpTransport = nodemailer.createTransport(sgTransport({
      auth: {
        api_user: process.env.SENDGRID_USERNAME,
        api_key: process.env.SENDGRID_PASSWORD
      }
    }));
    var mailOptions = {
      to: to,
      from: from,
      subject: subject,
      text: body
    };
    smtpTransport.sendMail(mailOptions, (err) => {
      if (err){
        reject("Failed to send email " + JSON.stringify(err))
      } 
      resolve("OK")
    });
  });
}
