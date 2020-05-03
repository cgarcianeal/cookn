const userService = require('../services/user.service');


module.exports = {
    authenticate,
    getAllUsers,
    register,
    getGoals,
    setGoals
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

function getGoals(req, res, next) {
    let username = '';
    if (req.url.length > 1)
        username = req.url.split("/")[2];

    userService.getGoals(username)
        .then(users => res.json(users))
        .catch(err => next(err));
}

function setGoals(req, res, next) {

    userService.setGoals(req.body.goals, req.body.username)
        .then(user => res.json(user))
        .catch(err => next(err));
}
