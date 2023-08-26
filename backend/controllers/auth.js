const Users = require("../models/Users.js");
const OTP = require("../models/Otp")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createError = require("../utils/error.js");
const Otps = require("../models/Otp");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


const register = async (req, res, next) => {
    try {
        const user = await Users.findOne({ phone: req.body.data.phone });
        if (user) {
            res.status(200).send({ info: "alerdy registered" });
            return
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.data.password, salt);

        const newUser = new Users({
            ...req.body.data,
            password: hash,
            img: "",
        });
        await newUser.save();
        res.status(200).send({ info: "User has been created." });
    } catch (err) {
        res.status(304).send("Server Error");
    }
};


const login = async (req, res, next) => {
    try {
        const user = await Users.findOne({ phone: req.body.phone });
        if (!user) return next("User not found!");
        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!isPasswordCorrect)
            return next("Wrong password or username!");

        const day=60*60*24;
        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT,
        );
        const { password, ...otherDetails } = user._doc;

        console.log("test login");
        res.cookie("access_token", token, {
            httpOnly: false
        })
        res.status(200).send({ details: { ...otherDetails},token});
    } catch (err) {
        res.status(304).send("Server Error");
    }
};



const sendOTP = async (req, res, next) => {
    const PhoneNumber = req.body.PhoneNumber
    let OTP = Math.floor(1000 + Math.random() * 9000)
    console.log(OTP, " - ", PhoneNumber);
    client.messages
        .create({
            body: `Verification by Lava Kumar-BOOK-Karo, OTP-${OTP}`,
            from: "+13613457860",
            to: `+917619554450`
        })
        .then(async(message) => {
            console.log("jejjj");
            const saveOTP=new Otps({code:OTP,phone:PhoneNumber})
            await saveOTP.save()
            res.status(200).send("OTP has been sent")
        })
        .catch(err => {
            console.log(err);
            res.status(304).send("Server Error in seneding otp");
        });
}
const verifyOTP = async (req, res, next) => {
    try {
        const check=await Otps.findOne({code:req.body.OTP})
        if (!check) return res.send("Wrong OTP");
       if(check){
        //getting data of user
        const user = await Users.findOne({ phone:check.phone });
        if (!user) return res.send("User not found");

        const day=60*60*24;
        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT,
        );
        const { password, ...otherDetails } = user._doc;

        console.log("test login");
        // res.cookie("access_token", token, {
        //     httpOnly: false
        // })
        res.status(200).send({ details: { ...otherDetails},token});
        
        await Otps.findByIdAndDelete(check._id);
        
       }
    } catch (error) {
        res.status(304).send("Server Error in verifying otp");
    }
}
const logout=async(req,res,next)=>{
    res.clearCookie("access_token")
    res.status(200).send("Logged out")
}
module.exports = {
    login,
    register,
    verifyOTP,
    sendOTP,
    logout
}
