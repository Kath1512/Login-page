const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes.js');
const messageRoutes = require('./routes/messageRoutes.js');
const app = express();
const cookieParser = require('cookie-parser');
const { Server } = require('socket.io');
const path = require("path");
const User = require("./models/userModel.js");
require('dotenv').config();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use(express.static(path.join(__dirname, "dist")));


const URI = "mongodb+srv://kath1512:pAtHsuhKReU5WD0V@cluster0.l0surwm.mongodb.net/";

const connectDb = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Connected to MongoDB")
    }
    catch (err) {
        console.error(err);
    }
}

connectDb();



app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, '0.0.0.0', () => console.log(`Start server at ${PORT}`));

const io = new Server(server, {
    cors: { origin: "*" }
});

let userSocket = new Map();

io.on("connection", (socket) => {
    console.log(socket.id);
    //get new user
    socket.on("add-user", ({ userId }) => {
        userSocket.set(userId, socket.id);
    });
    //get message
    socket.on("add-msg", (params) => {
        const { from, to, message, createdAt } = params;
        const targetedSocketId = userSocket.get(to);
        if (!targetedSocketId) return;
        // foward message to targeted client
        socket.to(targetedSocketId).emit("new-msg", {
            from: from,
            fromSelf: false,
            message: message,
            createdAt
        });

    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });


});





