const mongoose=require("mongoose");
const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            requred: true,
        },
        img: {
            type: String,
        },
        city: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        rooms:{
            type:[String],
        },
        bookedRooms: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Room',
            required:false
        }],
        bookingHistory: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Room',
            required:false
        }]
    },
    { timestamps: true }
);

const Users=mongoose.model("Users",UserSchema);
module.exports=Users;