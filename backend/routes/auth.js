const express = require('express')
const { login, register,sendOTP,verifyOTP,logout } =require("../controllers/auth.js");

const router=express.Router();

router.post("/register", register)
router.post("/login", login)
router.post("/sendOTP",sendOTP)
router.post("/verifyOTP",verifyOTP )
router.get("/logout", logout)
module.exports=router;