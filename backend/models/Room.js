const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema(
    { 
        hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel',
        required: false
    },
        title: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        maxPeople: {
            type: Number,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        booked: {
            status: {
                type: Boolean,
                default: false,
            },
            unavailableDates: {
                type: [Date]
            },
            user_id: {
                type: String
            },
            payment:{
                type: Boolean,
                default: false,
            }
        },
        isClean: {
            type: Boolean,
            default: true,
        },
        facilities: [],
        rating: {
            type: Number,
            min: 0,
            max: 5,
            default:5
        },
    },
    { timestamps: true }
);

const Rooms = mongoose.model("Rooms", RoomSchema);
module.exports = Rooms;