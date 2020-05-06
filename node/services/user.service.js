const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/database');
const User = db.User;



module.exports = {
    authenticate,
    getAllUsers,
    getByUsername,
    addUser,
    updateBio
};

async function authenticate({ username, password }) {

    console.log({ username, password });
    const user = await User.findOne({ username });
    console.log('**********************\n', user);
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
}

async function getAllUsers() {
    //Returning the result of the promise.
    return await User.find().select('-hash');
}

async function updateBio(userID, bio) {

    let user = await User.findById(userID);

    if (user) {
        user.bio = bio;

        await user.save();
    }
    else
        throw 'Username "' + userID + '" not found';
}

async function getByUsername(username) {

    return await User.find({username:username});
}

async function addUser(userParam) {

    // validate

    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }
    else  if (await User.findOne({ email: userParam.email })) {
        throw 'Email "' + userParam.email + '" is already taken';
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();

}



