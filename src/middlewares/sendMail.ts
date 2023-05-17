import nodemailer from "nodemailer";

const sendEmail = (email: string, token: string) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'programmingcommunity100@gmail.com',
            pass: 'qrcecskabjyjssci'
        }
    });

    const mailOptions = {
        from: 'programmingcommunity100@gmail.com',
        to: email,
        subject: 'Sending Email using node js',
        html: ` Let us to verify your email address. 
                <br/>
                Hit on the confirm button to activate your account.
                <br/>
                <br/>
                <br/>
                <a href="http://localhost:4000/api/user/verify-email/${token}">Confirm Your Email</a>`
    };


    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })

};

export default sendEmail;