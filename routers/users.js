const express = require('express');
const router = express.Router();
const fn = require('../functions/users');
const mw = require('../middlewares/users');

router.get('/', mw.userIsLogged, mw.userIsAdmin, (req, res) => {
    res.status(200).json(fn.showUsers(req.body))
})

router.post('/', mw.emailExists, (req, res) => {
    res.status(201).json(fn.createNewUser(req.body))
})

router.post('/login', mw.loginValid, (req, res) => {
    res.status(201).json(fn.loginUser(req.headers))
})


module.exports = router;