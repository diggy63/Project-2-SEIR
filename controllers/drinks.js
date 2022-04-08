const Drink = require('../models/drink');




function index(req, res){
    Drink.find({}, function(err, drinks){
        res.render("drinks/index", {
            drinks,
        });
    })
}

function newDrink(req, res){
    console.log(req.user);
    res.render("drinks/new");
}

function createDrink(req, res){
    console.log("drinks Controller");
    const newDrink = new Drink(req.body);
    newDrink.save(function(err){
        res.redirect("/drinks"); 
    })
}

function show(req,res){
    console.log(Drink);
    //console.log(req.params.id);
    Drink.findById(req.params.id, function(err, drink){
        console.log(drink);
        res.render("drinks/show", {
            drink,
        })
    })
}




module.exports = {
    index,
    new: newDrink,
    create: createDrink,
    show
};
