const express = require("express");
const {
    createRoom,
    deleteRoom,
    getRoom,
    getRooms,
    updateRoom,
    updateRoomAvailability,
    updateObject,
    getUserRooms,
    vacateUser,
    getRoomHotel,
    payment
} = require("../controllers/room.js");
const {verifyAdmin, verifyUser}=require("../utils/verifyToken")

const router = express.Router();
//CREATE
router.post("/:hotelid",verifyAdmin, createRoom);

//UPDATE
router.put("/availability/:id", updateRoomAvailability);
router.put("/object/:id", updateObject);
router.put("/:id", updateRoom);
router.put("/vacate/:id",vacateUser)
//DELETE
router.delete("/:id/:hotelid", deleteRoom);
//GET
router.get("/:id", getRoom);
router.get("/:id", getRoomHotel);
//GET ALL
router.get("/allrooms", getRooms);
router.get("/user/:id", getUserRooms);

//payment
router.put("/payment/:id",payment)
module.exports = router;


