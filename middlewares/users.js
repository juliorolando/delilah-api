const users = require('../models/users');
const liveUsers = require('../models/liveUsers');


// Middleware que valida si el email ya existe en el array users.
const emailExists = (req, res, next) => {
    const idEmail = users.findIndex(function (element) {
        return element.email == req.body.email
    });
    if (idEmail == -1) {
        next()
    } else {
        res.status(400).json({ msg: "This email is already used." });
    }
};

// Middleware que valida si el email y password coinciden con un objeto(usuario) en el array users.
const loginValid = (req, res, next) => {
    const idEmail = users.findIndex(function (element) {
        return element.email == req.headers.email && element.password == req.headers.password
    });
    if (idEmail !== -1) {
        next()
    } else {
        res.status(400).json({ msg: "Incorrect email or password. Try again." });
    }
};

// Middleware que valida si el usuario inició sesión.
const userIsLogged = (req, res, next) => {
    const idExists = liveUsers.findIndex(function (element) {
        return element == req.headers.user_id
    });
   if (idExists !== -1) {
        next()
    } else {
        res.status(400).json({ msg: "You must log in before this action." });
    } 
};

// Middleware que valida si el usuario tiene privilegios de administrador.
const userIsAdmin = (req, res, next) => {
    const isAdmin = users.findIndex(function (element) {
        return element.user_id == req.headers.user_id && element.isAdmin === true;
    });
    if (isAdmin !== -1) {
        next()
    } else {
        res.status(403).json({ msg: "You don't have access to this resource." });
    }
};
module.exports = { emailExists, loginValid, userIsLogged, userIsAdmin }