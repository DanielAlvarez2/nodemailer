const express = require('express')
const nodemailer = require('nodemailer')
require('dotenv').config()
const app = express()
app.use(express.json())
app.use(express.static('public'))
const PORT = process.env.PORT || 5005
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/public/index.html')
})
app.post('/',(req,res)=>{
    const transporter = nodemailer.createTransport({
        host:'smtp.ionos.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.IONOS_USER,
            pass: process.env.IONOS_PASS
        }
    })
    const mailOptions = {
        from: req.body.email,
        to: 'daniel.alvarez@togglesoftware.com',
        subject: `Message from ${req.body.email}: ${req.body.subject}`,
        text: req.body.message
    }
    transporter.sendMail(mailOptions, (error,info)=>{
        if(error){
            console.log(error)
            res.send('Error')
        }else{
            console.log('Email Sent: ' + info.response)
            res.send('Success')
        }
    })
})
app.listen(PORT,()=>{
    console.log(`Server Running on Port: ${PORT}`)
})