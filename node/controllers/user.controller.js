const userService = require('../services/user.service');


module.exports = {
    authenticate,
    getAllUsers,
    register,
    getUser,
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

function getUser(req, res, next) {
    let username;
    if (req.url.length > 1) {
        username = req.url.split('/')[2];
        console.log(username);
    }

    userService.getByUsername(username)
        .then(user => res.json(user))
        .catch(err => next(err));
}

function register(req, res, next) {
    userService.addUser(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function updateBio(req, res, next) {
    let userID = req.user.sub;

    userService.updateBio(userID, req.body.bio)
        .then(bio => res.json({res: "bio updated"}))
        .catch(err => next(err));
}