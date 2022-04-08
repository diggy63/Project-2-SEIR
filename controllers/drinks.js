const Drinks = require('../models/drink');




function index(req, res){
    res.render("drinks/index");
}






module.exports = {
    index
};
