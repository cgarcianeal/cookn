const config = require('../config.json');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || config.connectionString, { useCreateIndex: true, useNewUrlParser: true });
//mongoose.Promise = global.Promise;

module.exports = {
    User: require('../models/user.model'),
    Recipes: require('../models/article.model').Recipes,
    Discussions: require('../models/article.model').Discussions,
    Concepts: require('../models/article.model').Concepts,
};


