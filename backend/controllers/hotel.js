const { query } = require("express");
const Hotel = require("../models/Hotel.js");
const Room = require("../models/Room.js");

const createHotel = async (req, res, next) => {
    const newhotel={
        ...req.body,
        cheapestPrice:Number(req.body.cheapestPrice)
    }
    const newHotel = new Hotel(newhotel);

    try {
        const savedHotel = await newHotel.save();
        res.status(200).json("Added Sucesfully");
    } catch (err) {
        res.status(304).send("Server Error in creating hotel");
    }
};
const updateHotel = async (req, res, next) => {
    
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json("updated succesfuly");
    } catch (err) {
        res.status(304).send("Server Error in updating hotel");
    }
};
const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has been deleted.");
    } catch (err) {
        res.status(304).send("Server Error");
    }
};
const getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
    } catch (err) {
        res.status(304).send("Server Error to get hotel");
    }
};
const getHotels = async (req, res, next) => {
    const { min, max,city} = req.query;
    console.log(min,max,city);
    try {
        const hotels = await Hotel.find({
            city:city,
            cheapestPrice: { $gt: min | 1, $lt: max || 9999999 },
        }).limit(req.query.limit);
        res.status(200).json(hotels);
    } catch (err) {
        res.status(304).send("Server Error to get hotels");
    }
};
const justHotels = async (req, res, next) => {
    try {
        const hotels = await Hotel.find()
        res.status(200).json(hotels);
    } catch (err) {
        res.status(304).send("Server Error in justhotels");
    }
};
const getFeatured = async (req, res, next) => {
    try {
        const hotels = await Hotel.find({featured:true}).limit(req.query.limit);
        res.status(200).json(hotels);
    } catch (err) {
        res.status(304).send("Server Error");
    }
};
const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",");

    try {
        const list = await Promise.all(
            cities.map((city) => {
                return Hotel.countDocuments({ city: city });
            })
        );
        res.status(200).json(list);
    } catch (err) {
        res.status(304).send("Server Error");
    }
};
const getHotelType = async (req, res, next) => {
    const type = req.query.type;
    try {
       const list = await Hotel.find({type:type})
       res.status(200).json(list);
       
    } catch (err) {
        res.status(304).send("Server Error");
    }
};
const countByType = async (req, res, next) => {
    try {
        const hotelCount = await Hotel.countDocuments({ type: "hotel" });
        const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
        const resortCount = await Hotel.countDocuments({ type: "resort" });
        const villaCount = await Hotel.countDocuments({ type: "villa" });
        const cabinCount = await Hotel.countDocuments({ type: "cabin" });

        res.status(200).json([
            { type: "hotel", count: hotelCount },
            { type: "apartment", count: apartmentCount },
            { type: "resort", count: resortCount },
            { type: "villa", count: villaCount },
            { type: "cabin", count: cabinCount },
        ]);
    } catch (err) {
        res.status(400).send("Server Error");
    }
};

const getHotelRooms = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        const list = await Promise.all(
            hotel.rooms.map((room) => {
                return Room.findById(room);
            })
        );
        res.status(200).json(list)
    } catch (err) {
        res.status(400).send("Server Error");
    }
};

module.exports={
  createHotel,
  countByCity,
  countByType,
  deleteHotel,
  getHotel,
  getHotelRooms,
  getHotels,
  updateHotel,
  getHotelType,
  getFeatured,
  justHotels
}