const Message = require('../models/messageModel.js');

const addMessage = async (req, res) => {
    try{
        const {from, to, message} = req.body;
        const newMessage = await Message.create({
            message: message,
            sender: from,
            users: [from, to]
        });
        res.json({message: "Successfully add message to the database", status: true});
    } catch(err){
        res.json({message: err, status: false});
    }
}

const getMessage = async (req, res) => {
    try{
        const {from, to} = req.body;
        const all = await Message.find({
            users: {
                $all: [from, to]
            }
        }).sort({ createdAt: 1 });
        const allMessages = all.map(msg => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message
            }
        })
        res.json({message: "Successfully retrieve messages", status: true, allMessages});
    } catch(err){
        res.json({message: err, status: false});
    }
}
module.exports = {addMessage, getMessage};