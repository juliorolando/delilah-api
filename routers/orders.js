const express = require('express');
const router = express.Router();
const mwu = require('../middlewares/users');
const fn = require('../functions/orders');

router.get('/checkout', mwu.userIsLogged, (req, res) => {
    res.status(200).json(fn.checkout(req.headers))
})
router.get('/history', mwu.userIsLogged, (req, res) => {
    res.status(200).json(fn.historyOrders(req.headers))
})

router.get('/', mwu.userIsAdmin, mwu.userIsLogged, (req, res) => {
    res.status(201).json(fn.showOrders())
})

router.post('/', mwu.userIsLogged, (req, res) => {
    res.status(201).json(fn.addProduct(req.headers))
})

router.put('/editstatus/:id', mwu.userIsAdmin, (req, res) => {
    res.status(201).json(fn.editOrderStatus(req.params.id, req.headers))
})

module.exports =  router;