const nodeMailer = require('nodemailer')

// create reusable transporter object using the default SMTP transport
let transporter = nodeMailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'cf9df348507a19',
        pass: '96e2d415c9d3a3'
    },
    tls: {
        rejectUnauthorized: false
    }
});

module.exports = transporter;