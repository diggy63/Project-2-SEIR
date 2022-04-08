const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const reviews = require('../controllers/reviews');

const reviewSchema = new mongoose.Schema({
    content: {type: String, required: true},
    rating: {type: Number, min: 1, max: 5, default: 5},
  // Add the 3 new properties below
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    userName: String,
    userAvatar: String
} , {
    timestamp: true
})


const drinksSchema = new mongoose.Schema({
            name: String,
            reviews:[reviewSchema]

}, {
    timestamps: true
})
// Create your User Model
module.exports = mongoose.model('Drinks', drinksSchema);