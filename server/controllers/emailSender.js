const nodemailer = require("nodemailer");
const moment = require("moment");
const schedule = require("node-schedule");

const emailSend = (data) => {
  const { date_email, email, email_subject, email_text } = data;

  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let cronJob = "task_" + email;
  const myDate = moment(date_email, "YYYY-MM-DD, HH:mm:ss").toDate();

  cronJob = schedule.scheduleJob(email, myDate, function () {
    console.log("---------------------");
    console.log("Running Cron Job");

    let messageOptions = {
      from: process.env.EMAIL_FROM,
      to: `${email}`,
      subject: `${email_subject}`,
      text: `${email_text}`,
    };

    transporter.sendMail(messageOptions, function (error, info) {
      if (error) {
        throw error;
      } else {
        console.log("Email successfully sent!");
      }
    });
  });

  return cronJob;
};

module.exports = { emailSend };
