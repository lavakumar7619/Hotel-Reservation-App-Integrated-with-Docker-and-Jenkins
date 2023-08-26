const Users = require("../models/Users.js")

const getUser=async(req,res,next)=>{
    Users.findById(req.params.id)
    .then(result=>{
       res.status(200).json(result);
    })
    .catch(err=>res.status(400).send("Server Error"))
}

const getUsers=async(req,res,next)=>{
    Users.find()
    .then(result=>{
       res.status(200).json(result);
    })
    .catch(err=>res.status(400).send("Server Error"))
}

const updateUser=async(req,res,next)=>{
    try {
        const updatedUser = await Users.findByIdAndUpdate(
          req.params.id,
          { $set: req.body.data },
          { new: true }
        );
        res.status(200).json({updated:true});
      } catch (err) {
        res.status(400).send("Server Error");
      }
}
const updateUser_admin_access=async(req,res,next)=>{
  const admin=(req.body.isAdmin==="false") ? true :false;
  try {
      const updatedUser = await Users.findByIdAndUpdate(
        req.params.id,
        { isAdmin: admin},
        { new: true }
      );
      res.status(200).json("Admin Access Modified.");
    } catch (err) {
      res.status(400).send("Server Error");
    }
}
const deleteUser=async(req,res,next)=>{
    try {
        await Users.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted.");
    } catch (err) {
      res.status(400).send("Server Error");
    }
}
module.exports={
    getUser,
    getUsers,
    updateUser,
    deleteUser,
    updateUser_admin_access
}