const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentsSchema = new mongoose.Schema({
    content: {type: String, required: true},
    rating: {type: Number, min: 1, max: 10, default: 5},
  // Add the 3 new properties below
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    userName: String,
    userAvatar: String
} , {
    timestamp: true
})


const drinksSchema = new mongoose.Schema({
            name: String,
            comments: [commentsSchema]

}, {
    timestamps: true
})
// Create your User Model
module.exports = mongoose.model('Drinks', drinksSchema);