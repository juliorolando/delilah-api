const express = require('express');
const router = express.Router();
const mwu = require('../middlewares/users');
const fn = require('../functions/paymethods');

router.post('/', mwu.userIsLogged,mwu.userIsAdmin,  (req, res) => {
    res.status(201).json(fn.createPayMethod(req.headers))
})

router.get('/', mwu.userIsLogged, mwu.userIsAdmin,  (req, res) => {
    res.status(200).json(fn.showPayMethods(req.body))
})

router.delete('/', mwu.userIsLogged, mwu.userIsAdmin, (req, res) => {
    res.status(200).json(fn.deletePayMethod(req.headers))
})

router.put('/', mwu.userIsLogged, mwu.userIsAdmin, (req, res) => {
    res.status(201).json(fn.editPayMethod(req.headers))
})

module.exports = router;