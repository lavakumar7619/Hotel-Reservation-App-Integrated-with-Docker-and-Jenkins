const express = require('express')
const router=express.Router();
const {getUser,deleteUser,getUsers,updateUser,updateUser_admin_access}=require("../controllers/user.js")
const {verifyAdmin, verifyUser}=require("../utils/verifyToken")

router.get("/all",getUsers)
router.get("/:id",getUser)
router.delete("/:id",deleteUser)
router.put("/:id",updateUser)
router.put("/admin_access/:id",verifyAdmin,updateUser_admin_access)
module.exports=router;