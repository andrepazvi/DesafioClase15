const mongoose = require("mongoose");

const cartsCollection = 'carts';

const cartSchema = new mongoose.Schema({
    products: {
        type: Array,
        default: []
    }
});

const cartModel = mongoose.model(cartsCollection, cartSchema);

module.exports = cartModel;
