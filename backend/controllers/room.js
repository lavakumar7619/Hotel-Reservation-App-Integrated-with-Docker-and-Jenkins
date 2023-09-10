const Room = require("../models/Room.js");
const Hotel = require("../models/Hotel.js");
const Hotels = require("../models/Hotel.js");


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const cheap_price = await Hotel.findById(hotelId)
  const newRoom = new Room({...req.body,"hotel":hotelId});
  console.log({...req.body,"hotel":hotelId});
  try {
    //update cheap price
    const savedRoom = await newRoom.save();
    if (cheap_price.cheapestPrice > savedRoom.price) {
      await Hotel.findByIdAndUpdate(hotelId, {
        cheapestPrice: savedRoom.price,
      });
      console.log("upadted price");
    }

    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Floor and rooms are created");
  } catch (err) {
    res.status(400).send("Server Error");
  }
};

const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body.editForm,
        $push: {
          "facilities": req.body.value,
        },
      },
      { new: true }
    );
    res.status(200).json("updatedRoom");
  } catch (err) {
    res.status(400).send("Server Error");
  }
};
const updateObject = async (req, res, next) => {
  try {
    await Room.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          "isClean": req.body.isClean,
          "booked.status": false
        }
      },
    );
    res.status(200).json("Room clean status updated");
  } catch (err) {
    res.status(400).send("Server Error");
  }
};
const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "_id": req.params.id },
      {
        $push: {
          "booked.unavailableDates": req.body.dates,
        },
        $set: {
          "booked.user_id": req.body.user_id,
          "booked.status": true,
        },
      }
    );
    const room_name = await Room.findById(req.params.id)
    // client.messages
    //     .create({
    //         body: `Booked Room by Lava Kumar-BOOK-Karo, 
    //             ROOM NAME-${room_name.title}
    //             Payment status-${room.booked.payment} `,
    //             from: "+13613457860",
    //         to: `+917619554450`
    //     })
    //     .then(async(message) => {
    //       res.status(200).json("Room status has been updated.");
    //     })
    //     .catch(err => {
    //         res.status(304).send("Server Error in seneding otp");
    //     });
    res.status(200).json("Room status has been updated.");
  } catch (err) {
    res.status(400).send("Server Error");
  }
};
const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (err) {
      res.status(400).send("Server Error");
    }
    res.status(200).json("Room has been deleted.");
  } catch (err) {
    res.status(400).send("Server Error");
  }
};
const getRoomHotel = async (req, res, next) => {
  const roomId = req.params.id;
  try {
    const hotel = await Hotel.findById({ "rooms": roomId });
    res.status(200).json("Room has been deleted.");
  } catch (err) {
    res.status(400).send("Server Error");
  }
};
const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    const gethotel=await Hotel.findById(room.hotel)
    res.status(200).json(room);
  } catch (err) {
    res.status(400).send("Server Error");
  }
};
const getRooms = async (req, res, next) => {
  console.log("kkk");
  try {
    const rooms = await Room.find();
    console.log("jjs", rooms);
    res.status(200).json(rooms);
  } catch (err) {
    res.status(400).send("Server Error");
  }
};
const getUserRooms = async (req, res, next) => {
  try {


    try {
      const rooms = await Room.find({ "booked.user_id": req.params.id })
      const hotel_id = []
      const hotels = await Hotels.find()
      //console.log(hotels);
      // const tryial=await hotels.map(hotel=>{
      //   return hotel.rooms.filter(room=>{
      //     return (room===rooms.map(data=>{return data._id}))
      //   })
      // })
      // console.log(tryial);
      res.status(200).send(rooms)
    } catch (error) {
      res.status(400).send("Server Error");
    }
    //console.log(hotels);
  } catch (error) {
    res.status(400).send("Server Error");
  }
};
const vacateUser = async (req, res, next) => {
  console.log(req.params.id);
  try {
    await Room.findByIdAndUpdate(req.params.id,
      {
        $set: {
          "isClean": req.body.isClean,
          "booked.unavailableDates": [],
          "booked.user_id": "",
          "booked.status": req.body.status,
          "booked.payment": false
        },
      }
    )
    res.status(200).send("Vaccated")
  } catch (error) {
    //next(error)
    res.status(400).send("Server Error vacate user");
  }
}
const payment = async (req, res, next) => {
  try {
    const getRoomID = await Room.find({ "booked.user_id": req.params.id })
    getRoomID.map(async (room) => {
      if (room.booked.payment == false) {
        try {
          await Room.findByIdAndUpdate(room._id,
            {
              $set: {
                "booked.payment": true
              },
            }
          );
          // client.messages
          //   .create({
          //       body: `Booked Room by Lava Kumar-BOOK-Karo, 
          //           ROOM NAME-${room.title}
          //           Payment status-Succesful 
          //           Transaction ID-${req.body.data.id} `,
          //           from: "+13613457860",
          //       to: `+918660956885`
          //   })
          //   .then(async(message) => {
          //     console.log("message sent");
          //   })
          //   .catch(err => {
          //       res.status(304).send("Server Error in seneding otp");
          //   });

          res.status(200).json("Paid");
          return
        } catch (error) {
          //next({message:"error in payment update"});
          res.status(400).send("error in payment update");
          return
        }
      }
    })
    // try {
    //   await Room.findByIdAndUpdate(getRoomID._id,
    //     {
    //       $set:{
    //         "booked.payment":true
    //       },
    //     }
    //   );
    //   client.messages
    //     .create({
    //         body: `Booked Room by Lava Kumar-BOOK-Karo, 
    //             ROOM NAME-${room_name.title}
    //             Payment status-Succesful 
    //             Transaction ID-${req.body.data.id} `,
    //         from: "+15674853988",
    //         to: `+917619554450`
    //     })
    //     .then(async(message) => {
    //       console.log(message);
    //     })
    //     .catch(err => {
    //         res.status(304).send("Server Error in seneding otp");
    //     });

    //     res.status(200).json("Paid");
    // } catch (error) {
    //   //next({message:"error in payment update"});
    //   res.status(400).send("error in payment update");
    // }

  } catch (err) {
    res.status(400).send("Server Error");
  }
};
module.exports = {
  createRoom,
  updateRoom,
  updateRoomAvailability,
  deleteRoom,
  getRoom,
  getRooms,
  updateObject,
  getUserRooms,
  vacateUser,
  getRoomHotel,
  payment
}