const express = require('express');
const router = express.Router();
const mwu = require('../middlewares/users')
const fn = require('../functions/products')

router.get('/', mwu.userIsLogged, (req, res) => {
    res.status(200).json(fn.getProducts());
})

router.post('/', mwu.userIsLogged, mwu.userIsAdmin, (req, res) => {
    res.status(201).json(fn.createProduct(req.body));
})

router.delete('/:id', mwu.userIsLogged, mwu.userIsAdmin, (req, res) => {
    res.status(200).json(fn.deleteProduct(req.params.id));
})

router.put('/:id', mwu.userIsLogged, mwu.userIsAdmin, (req, res) => {
    res.status(200).json(fn.editProduct(req.params.id, req.body));
})

module.exports =  router;