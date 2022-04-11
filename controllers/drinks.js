const Drink = require('../models/drink');




function index(req, res){
    Drink.find({}, function(err, drinks){
        res.render("drinks/index", {
            drinks,
        });
    })
}

function newDrink(req, res){
    res.render("drinks/new");
}

function createDrink(req, res){
    req.body.user = req.user._id;
	req.body.userName = req.user.name;
	req.body.userAvatar = req.user.avatar;
    const newDrink = new Drink(req.body);
    console.log(newDrink);
    newDrink.save(function(err){
        res.redirect("/drinks"); 
    })
}

function show(req,res){
    //console.log(req.params.id);
    Drink.findById(req.params.id, function(err, drink){
        console.group(drink);
        res.render("drinks/show", {
            drink,
        })
    })
}

function deleteDrink(req, res){
    Drink.findOneAndDelete(
        {_id: req.params.id, user: req.user._id}, function(err) {
        res.redirect("/drinks");

    })
}




module.exports = {
    index,
    new: newDrink,
    create: createDrink,
    show,
    delete: deleteDrink
};
