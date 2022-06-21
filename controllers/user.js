const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const { generateJwtToken } = require("../middlewares/genateJwtToken");

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
    try{
        const user  = await userModel.findOne({email: req.body.email});
        if(user){
            const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
            if(isPasswordValid){
                const token = generateJwtToken(user);
                res.status(200).json({
                    message: "user logged in successfully",
                    access_token : token
                })
            }else{
                res.status(401).json({
                    message: "invalid password"
                })
            }
        }else{
            res.status(401).json({
                message: "invalid email"
            })
        }

    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}
module.exports = { userRegister, userLogin };
