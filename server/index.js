const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth.js')
const app = express();

app.use(express.json());
app.use(cors());

const URI = "mongodb+srv://kath1512:pAtHsuhKReU5WD0V@cluster0.l0surwm.mongodb.net/";

const connectDb = async () => {
    try{
        await mongoose.connect(URI)
        console.log("Connected to MongoDB")
    }
    catch(err){
        console.error(err);
    }
}

connectDb();

app.use('/api/auth', authRoutes);

app.listen(5000, () => console.log('Start server at 5000'));