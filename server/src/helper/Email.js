const nodemailer = require("nodemailer");
const { smtUserName, smtPassword } = require("../secret");


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: smtUserName,
    pass: smtPassword,
  },
});


const emailWithNodeMailer = async (emailData) => {
  try {
    const mailOptions = {
        from: 'Mern-Ecommarce', // sender address
        to: emailData.email, // list of receivers
        subject: emailData.subject, // Subject line
        text: "Hello world?", // plain text body
        html: emailData.html, // html body
       }
    
      const info =  await transporter.sendMail(mailOptions)
      console.log(info.response)
  } catch (error) {
     console.error(error)
     throw error;
  }
}


module.exports = emailWithNodeMailer; 