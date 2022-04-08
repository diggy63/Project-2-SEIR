const mongoose = require('mongoose');
const drinksSchema = new mongoose.Schema({
            name: String
            

}, {
    timestamps: true
})
// Create your User Model
module.exports = mongoose.model('Drinks', drinksSchema);