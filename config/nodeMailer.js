const nodemailer = require("nodemailer");
const NODEMAILER_MAIL = process.env.NODEMAILER_MAIL;
const BASE_MAIL = process.env.BASE_MAIL;
const NODEMAILER_PASSWORD = process.env.NODEMAILER_PASSWORD;
const NODEMAILER_SERVICE = process.env.NODEMAILER_SERVICE;
const NODEMAILER_HOST = process.env.NODEMAILER_HOST;
const NODEMAILER_PORT = process.env.NODEMAILER_PORT;

const nodeMailer = async (email, data) => {
  try {
    const transporter = nodemailer.createTransport({
      host: NODEMAILER_HOST,
      port: NODEMAILER_PORT,
      service: NODEMAILER_SERVICE,
      secure: false,
      auth: {
        user: BASE_MAIL,
        pass: NODEMAILER_PASSWORD,
      },
    });
    await transporter.sendMail({
      from: NODEMAILER_MAIL,
      to: email,
      html: data,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = nodeMailer;
