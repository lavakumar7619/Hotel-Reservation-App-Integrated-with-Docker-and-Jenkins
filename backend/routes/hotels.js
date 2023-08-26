const express = require("express");
const {
    countByCity,
    countByType,
    createHotel,
    deleteHotel,
    getHotel,
    getHotelRooms,
    getHotels,
    updateHotel,
    getHotelType,
    getFeatured,
    justHotels
} = require("../controllers/hotel.js");
const {verifyAdmin,verifyToken}=require("../utils/verifyToken.js")
const Hotel = require("../models/Hotel.js");


const router = express.Router();

//CREATE
router.post("/",verifyAdmin, createHotel);

//UPDATE
router.put("/:id",verifyAdmin, updateHotel);
//DELETE
router.delete("/:id",verifyAdmin, deleteHotel);
//GET

router.get("/find/:id", getHotel);
//GET ALL

router.get("/", getHotels);
router.get("/all", justHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);
router.get("/getType",getHotelType);
router.get("/getFeatured",getFeatured);
module.exports = router;