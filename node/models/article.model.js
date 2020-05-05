const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    body: { type: String, required: false },
    ingredients: { type: JSON, required: false },
    instructions: { type: String, required: false },
    image: { type: String, required: false },
    tags: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    createdDate: { type: Date, default: Date.now }});

schema.index({createdDate:1, createdBy:1}, { unique: true });

schema.set('toJSON', { virtuals: true });

module.exports =  {
    Recipes: mongoose.model('Recipes', schema),
    Concepts: mongoose.model('Concepts', schema),
    Discussions: mongoose.model('Discussions', schema),
};

