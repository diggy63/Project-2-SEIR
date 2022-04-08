const Drinks = require('../models/drink');




function index(req, res){
    res.render("drinks/index");
}

function newDrink(req, res){
    res.render("drinks/new");
}

function createDrink(req, res){
    res.redirect("/");
}





module.exports = {
    index,
    new: newDrink,
    create: createDrink
};
