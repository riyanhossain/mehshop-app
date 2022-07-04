const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { generateJwtToken } = require("../utils/genateJwtToken");
const dotenv = require("dotenv");

dotenv.config();

const userRegister = async (req, res) => {
  try {
    const hassPassword = await bcrypt.hash(req.body.password, 12);
    req.body.password = hassPassword;
    const user = new userModel(req.body);
    await user.save();
    res.status(201).json({
      message: "user created successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (user) {
      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (isPasswordValid) {
        const token = generateJwtToken(user);
        res.status(200).json({
          message: "user logged in successfully",
          access_token: token,
        });
      } else {
        res.status(401).json({
          message: "invalid password",
        });
      }
    } else {
      res.status(401).json({
        message: "invalid email",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const userResetPassword = async (req, res) => {
  const { email } = req.body;
  const user = await userModel.findOne({email});
  if(user){
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL, // generated ethereal user
        pass: process.env.PASSWORD, // generated ethereal password
      },
    });
  
    // send mail with defined transport object
    try {
      await transporter.sendMail({
        from: `"Mehshop.com" <${process.env.EMAIL}>`, // sender address
        to: `${email}`, // list of receivers
        subject: "Reset Password", // Subject line
        html: `<a href="http://localhost:3000/user/verify-email?token=${generateJwtToken(
          user
        )}">Click here <span> to reset your password <span> </a>`, // html body
      });
      res.status(200).json({
          message : "Reset password email sent"
      })
    } catch (err) {
      console.log(err);
    }
    
  }else{
    res.status(200).json({
      message : "Invail email"
    })
  }

};
module.exports = { userRegister, userLogin, userResetPassword };
