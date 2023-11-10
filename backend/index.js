require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require("cors")
const cookieParser = require('cookie-parser')
const multer = require("multer")
const path = require("path")
const usersRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const hotelsRoute = require("./routes/hotels")
const roomsRoute = require("./routes/rooms")
const http = require("http")
const { Server } = require("socket.io")
const { log } = require('console')
const stripe = require('stripe')(process.env.Secret_key)
//connection to db
const port = process.env.PORT || 5000
const app = express()

const server = http.createServer(app);
//{ useapp.use(cors());NewUrlParser: true,useUnifiedTopology: true,useFindAndModify:false }
mongoose.connect(process.env.DB_URL)
    .then(res => {
        server.listen(port)
        console.log(`Database connected,Server running on ${port}`);
    })
    .catch(err => console.log(err))

const io = new Server(server, {
    cors: {
        origin:process.env.FRONTEND_URL,
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    socket.on("send_notification", (data) => {
        socket.broadcast.emit("recive_notification", data)
    })
})


//middle ware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend/src')));
app.use(cookieParser())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("backend running")
})
//multer
const storage = multer.diskStorage({
    destination: './public/images/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage })


// app.post('/upload', (req, res) => {
//     console.log(req.file);
//     upload=(req,res,(err)=>{
//         if(err){
//             console.log(err);
//         }
//         else{
//             console.log(req.file);
//         }
//     })
// })

//error message request
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        data: errorMessage
    });
});

app.use("/user", usersRoute);
app.use("/user/auth", authRoute);
app.use("/hotels", hotelsRoute);
app.use("/rooms", roomsRoute);



// app.get("/getCookies",(req,res)=>{
//     const cookies=req.cookies;
//     console.log(cookies);
//     res.json(cookies)
// })

// app.get("/setCookies",(req,res)=>{
//     res.cookie("isAdmin",true,{maxAge:60*60});
//     console.log("kkkkk");
//     res.send("set")
// })







