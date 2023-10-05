const express = require('express');
const Message = require('../dao/dbManagers/messages.js');

const router = express.Router();
const mm = new Message();

router.get('/', async (req, res) => { 
    try {
        let result = await mm.getAll();
        res.send({ status: 'Ok', payload: result });
    } catch (error) {
        res.status(500).send({ status: 'Error', error: error.message });
    }
});

router.post('/', async (req, res) => { 
    try {
        let { user, message } = req.body;
        let fullMessage = {
            user,
            message
        }
        let result = await mm.addMessage(fullMessage);
        res.send({ status: 'Ok', payload: result });
    } catch (error) {
        res.status(500).send({ status: 'Error', error: error.message });
    }
});

module.exports = router;
