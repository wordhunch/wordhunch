const nodemailer = require('nodemailer')

export default async () => {
    //set up sending email

    let transporter = nodemailer.createTransport({
        host: '',//host goes here?
        port: '???',
        secure: false,
        auth: {
            user: 'user',
            pass: 'pass'
        }
    })

    let info = await transporter.sendMail({
        from: 'sender address',
        to: 'user email',
        subject: 'Welcome to WordHunch!',
        text: 'Whatever text we want',
        html: '<h1>Hello World (html)</h1>'
    })
}