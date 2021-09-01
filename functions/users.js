const users = require('../models/users')
const liveUsers = require('../models/liveUsers')
const search = require('../functions/finders')


//Crea un nuevo usuario. El user_id coincide con el indice del elemento dentro del array users.
const createNewUser = (req) => {
    users.push({
        user_id: users.length,
        user: req.username,
        name_lastname: req.name_lastname,
        email: req.email,
        phone: req.phone,
        address: req.address,
        password: req.password,
        isAdmin: false,
    })
    return { msg: "New user created" };
};

// Login de usuario
const loginUser = (req) => {
    const completeUserInfo = search.byEmail(users, req.email)
    liveUsers.push(req.email, completeUserInfo.user_id) 
    return { msg: `You are now logged in as ${req.email} and your ID is ${completeUserInfo.user_id}` };
}

// Retorna array de todos los usuarios registrados.
const showUsers = () => {
    return { users }
}



module.exports = { createNewUser, loginUser, showUsers }