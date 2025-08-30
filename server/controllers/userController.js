const User = require('../models/userModel');


module.exports.register = async (req, res) => {
    const data = req.body;
    let status = true;
    const {password, email, username} = data;
    if(await User.findOne({username: username})){
        res.json({message: 'Username already taken', status: false});
    }
    if(await User.findOne({email: email})){
        res.json({message: 'Email already taken', status: false});
    }
    const user = await User.create({
        ...data
    })
    res.json({...user, status: true});
}

module.exports.login = async(req, res) => {
    const data = req.body;
    const user = await User.findOne({...data});
    if(!user){
        res.json({message: "Incorrect username or password", status: false});
    }
    else{
        res.json({...user, message: "Login successfully", status: true});
    }
}
