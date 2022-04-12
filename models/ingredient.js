const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredientSchema = new mongoose.Schema({
            ingredients: String,
            amount: String
})



module.exports = mongoose.model('Ingredients', ingredientSchema);