
module.exports = (username) => {
    return `<!DOCTYPE html>
    <!-- PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> -->
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>WordLogic</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </head>
    <body style="background-color:'#ffffff'; margin: 0; padding: 0;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="margin-top: 100px; border: 1px solid #cccccc; border-collapse: collapse;">
            <tr>
                <td align="center" bgcolor="#ffffff" style="padding: 0px 0 0px 0; color: #cccccc; font-size: 28px; font-weight: bold; font-family: Arial, sans-serif;">
<<<<<<< HEAD
                    <a href="http://localhost:3000/#/" style="color: #ffffff;">
                    <img src='http://localhost:3000/static/media/templogo.e20848d7.png'
                     alt="WordLogic" width="500" height="200" />
=======
                    <a href="wordlogic.net" style="color: #ffffff;">n
                    <img src='wordlogic.net/images/wordlogic-logo.png'
                     alt="Word Logic" width="500" height="200" />
>>>>>>> master
                    </a>
                </td>
            </tr>
            <tr>
                <td style="background-color: white;text-align: center; color: #223377; font-family: Arial, sans-serif; font-size: 24px;">
                    <b>Welcome to WordLogic, ${username}!</b>
                </td>
            </tr>
            <tr>
                <td align="center" style="background-color: white; text-align: center; padding: 25px 25 25 25; color: #364440; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                Thanks for joining!
                </td>
            </tr>
        </table>
    </body>
    </html>
    `
}