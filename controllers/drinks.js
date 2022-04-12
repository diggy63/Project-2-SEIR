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
    newDrink.save(function(err){
        res.render("drinks/description", {
            newDrink
        })
    })
}

function createDecription(req, res){
    Drink.findById(req.params.id, function(err, drink){
        //console.log(req.body);
        drink.description = req.body.description;
        drink.save(function(err){
            res.render(`drinks/addIngredient`, {
                drink
            });
        })
       //drink.description = req.body.description
       
    })

}

function show(req,res){
    Drink.findById(req.params.id).populate("ingredients").exec(function(err, drink){
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
    delete: deleteDrink,
    createDecription
};
