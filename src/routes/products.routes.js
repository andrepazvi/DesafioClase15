const { Router } = require("express");
const Product = require("../dao/dbManagers/products.js");
const io = require("../index.js");

const pm = new Product();

const router = Router();

router.get('/', async(req, res) => { 
    let users = await pm.getAll();

    (!users)?res.status(500).send({status: "Error", error: "No info avaliable"}):res.send({status: "Ok", payload:users});
})

router.post('/', async(req, res) => { 
    const {title, description, code, price, stock, thumbnails} = req.body;
    let newProduct = {
        title,
        description,
        code,
        price,
        stock,
        thumbnails
    }

    if (!title || !description || !code || !price || !stock) {
        res.send({status: 404, payload: "Some data is missing"});
    } else {
        const result = await pm.saveProduct(newProduct);
        res.send({status: "Ok", payload: result});
    }
    let products = await pm.getAll();
    io.emit('products', products);
})

router.put('/:pid', async(req, res) => { 
    const id = req.params.pid;

    const {title, description, code, price, stock, thumbnails} = req.body;
    let newProduct = {
        title,
        description,
        code,
        price,
        stock,
        thumbnails
    }

    let result = await pm.updateProduct(id, newProduct);
    res.send({status: "Ok", payload: result});
    let products = await pm.getAll();
    io.emit('products', products);
})

router.delete('/:pid', async(req, res) => { 
    const id = req.params.pid;

    let result = await pm.deleteProduct(id);
    res.send({status: "Ok", payload: result});
    let products = await pm.getAll();
    io.emit('products', products);
})

module.exports = router;
