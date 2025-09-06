const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken, authenticateToken } = require('./auth');
require('dotenv').config();

let refreshTokens = [];

const register = async (req, res) => {
    const data = req.body;
    let status = true;
    const {password, email, username} = data;
    if(await User.findOne({username})){
        return res.json({message: 'Username already taken', status: false});
    }
    if(await User.findOne({email: email})){
        return res.json({message: 'Email already taken', status: false});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        ...data,
        password: hashedPassword
    })
    const accessToken = generateAccessToken({username}, '15s');
    return res.json({user: {
        username: user.username,
        _id: user._id
    }, message: "Register successfully", status: true, accessToken});
}

const login = async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username: username});
    if(!user){
        return res.json({message: "Invalid username", status: false});
    }
    let cp = await bcrypt.compare(password, user.password);
    if(!cp){
        return res.json({message: "Wrong password", status: false});
    }
    const accessToken = generateAccessToken({username: username}, '15s');
    const refreshToken = generateRefreshToken({username: username}, '7d');

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 3600 * 1000
    });
    refreshTokens.push(refreshToken);
    return res.json({user: {
        username: user.username,
        _id: user._id
    }, message: "Login successfully", status: true, accessToken});
}

const getProfile =  async (req, res) => {
    const username = req.user.username;
    const user = await User.findOne({username: username});
    if(!user){
        res.json({message: "Invalid username", status: false});
    }
    res.json({email: user.email, status: true});
};

const getNewAccessToken = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.status(401).json({message: "No refresh token provided"});
    if(!refreshTokens.includes(refreshToken)) return res.status(401).json({message: "Refresh token not found"});
    jwt.verify(refreshToken, process.env.REFRESH_KEY, (err, user) => {
        if(err) return res.status(403).json({message: "Invalid refreshToken"});
        const newAccessToken = generateAccessToken({username: user.username}, '15s');
        res.json({accessToken: newAccessToken});
    })
}

const getAllUsers = async(req, res) => {
    const allUsers = await User.find({}).select('username');
    res.json(allUsers);
}

module.exports = {register, login, authenticateToken, getProfile, getNewAccessToken, getAllUsers};


