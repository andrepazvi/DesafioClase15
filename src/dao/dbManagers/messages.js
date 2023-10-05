const messageModel = require("../../models/messages.js");

class Message {
    constructor() {
        console.log("Trabajando con MongoDB");
    }

    async getAll() {
        let messages = await messageModel.find();
        messages = messages.map(message => message.toObject());
        return messages;
    }

    async addMessage(message) {
        let result = await messageModel.create(message);
        return result;
    }

    async clearAll() {
        let result = await messageModel.deleteMany();
        return result;
    }
}

module.exports = Message;
