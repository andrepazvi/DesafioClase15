const mongoose = require("mongoose");

const messagesCollection = 'messages';

const messageSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

const messageModel = mongoose.model(messagesCollection, messageSchema);

module.exports = messageModel;
