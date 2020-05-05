const userService = require('../services/user.service');


module.exports = {
    authenticate,
    getAllUsers,
    register,
    updateBio
};


function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function getAllUsers(req, res, next) {
    userService.getAllUsers()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function register(req, res, next) {
    userService.addUser(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function updateBio(req, res, next) {
    let username = req.user.sub;

    userService.updateBio(username, req.body.bio)
        .then(bio => res.json({res: "bio updated"}))
        .catch(err => next(err));
}