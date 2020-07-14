const nodemailer = require('nodemailer')
require('dotenv').config()
const {GMAIL_USER, GMAIL_PASSWORD} = process.env


const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: GMAIL_USER,
            pass: GMAIL_PASSWORD
        }
    })

module.exports = {
    transporter
}
