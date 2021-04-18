const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const multiparty = require("multiparty");
require("dotenv").config();

app.use(express.urlencoded()); 
app.use('/static',express.static('static'))


app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views')) 

const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
       user: 'parth.gupta023@nmims.edu.in',
       pass: '@Parth1001'
    }
});

transport.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});


app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('gym.pug', params);
})

app.post('/',(req,res) =>{
    let form = new multiparty.Form();
    let data = {};
    form.parse(req,function (err,fields) {
        console.log(fields);
        Object.keys(fields).forEach(function (property) {
            data[property] = fields[property].toString();
        });
        console.log(data);
        const mail = {
          sender: 'parth.gupta023@nmims.edu.in',
          to: 'parth.gupta023@nmims.edu.in', // receiver email,
          subject: 'New Form Filled!',
          text: `Name : ${data.name}, Age : ${data.age},\nGender : ${data.gender}, Mobno. : ${data.mob},\nEmail : ${data.email}, \nWeight : ${data.weight}, Height : ${data.height}`
        }
        transporter.sendMail(mail, (err, data) => {
          if (err) {
            console.log(err);
            res.status(500).send("Something went wrong.");
          } else {
            res.status(200).send("Email successfully sent to recipient!");
          }
        });
    });
//     const params = {};
//     res.status(200).render('gym.pug',params);
})

PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`The application started successfully on port 3000`);
});
