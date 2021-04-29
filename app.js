const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyparser = require("body-parser");
const nodemailer = require('nodemailer');

const app = express();

app.use('/static',express.static(process.cwd() + '/static'))
app.use(bodyparser.urlencoded({extended: true}))

app.route("/").get(function (req, res) {
  res.sendFile(process.cwd() + "/static/gym.html");
});

app.route("/about").get(function (req, res) {
  res.sendFile(process.cwd() + "/static/about.html");
});

app.route("/connect").get(function (req, res) {
  res.sendFile(process.cwd() + "/static/connect.html");

});
app.post("/faliure", function(req,res){
  res.redirect("/connect");
});

app.post("/send", (req, res) => {
   const smtpTrans = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: 'parth.gupta023@nmims.edu.in',
      pass: '@Parth1001'
    }
  });

  const mailOpts = {
    from: 'parth.gupta023@nmims.edu.in',
    to: 'parth.gupta023@nmims.edu.in',
    subject: 'New Form Filled!',
    text: `Name : ${req.body.name}, Age : ${req.body.age},\nGender : ${req.body.gender},\nAddress: ${req.body.address1}\n${req.body.address2} \nMobno. : ${req.body.mob},\nEmail : ${req.body.email}, \nWeight : ${req.body.weight}, Height : ${req.body.height}`
  }

  smtpTrans.sendMail(mailOpts, (err, response) => {
    if (response.statusCode === 200){
      res.sendFile(__dirname + "/static/failure.html");
    } else{
      res.sendFile(__dirname + "/static/success.html");
    }
  });
});

app.listen(process.env.PORT || 3000, function() {
    console.log("The application started successfully on port 3000");
});
