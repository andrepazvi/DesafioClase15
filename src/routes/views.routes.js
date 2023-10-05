const express = require("express");
const Product = require("../dao/dbManagers/products.js");
const pm = new Product();
const router = express.Router();

router.get('/', async (req, res) => {
    let products = await pm.getAll();
})

router.get('/realTimeProducts', (req, res) => {
    res.render('realTimeProducts');
})

router.get('/chat', (req, res) => {
    res.render('chat');
})

module.exports = router;
