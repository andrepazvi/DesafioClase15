const productsModel = require("../../models/products");

class Product {
    constructor() {
        console.log("Trabajando con MongoDB");
    }

    getAll = async () => {
        let products = await productsModel.find();
        return products.map(product => product.toObject());
    }

    getOne = async (id) => {
        let product = await productsModel.findOne({ _id: id });
        return product;
    }

    saveProduct = async (product) => {
        let result = await productsModel.create(product);
        return result;
    }

    updateProduct = async (id, product) => {
        let result = await productsModel.updateOne({ _id: id }, product);
        return result;
    }

    deleteProduct = async (id) => {
        let result = await productsModel.deleteOne({ _id: id });
        return result;
    }
}

module.exports = Product;
