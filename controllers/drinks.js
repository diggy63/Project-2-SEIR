const Drink = require("../models/drink");
const multer = require("multer");
const Ingredient = require("../models/ingredient");



//takes a file input with a multer created name and replaces the old photo name
//with the new one.
async function updatePhoto(req, res) {
     try {
          const newDrink = await Drink.findById(req.params.id);
          newDrink.imageName = req.file.filename;
          newDrink.save(function (err) {
               res.redirect(`/drinks/${newDrink._id}/edit`);
          });
     } catch (error) {}
}


//simple route to render the index
function index(req, res) {
     Drink.find({}, function (err, drinks) {
          res.render("drinks/index", {
               drinks,
          });
     });
}

//GET route to the new drink creation page.
function newDrink(req, res) {
     res.render("drinks/new");
}

//creates a drink schema and puts the User and descriptions into the drink model
async function createDrink(req, res) {
     console.log(req.body);
     req.body.name = req.body.name.toUpperCase();
     req.body.user = req.user._id;
     req.body.userName = req.user.name;
     req.body.userAvatar = req.user.avatar;
     const newDrink = new Drink(req.body);
     newDrink.save(function (err) {
         console.log(newDrink);
          res.render("drinks/makeDrink", {
               newDrink,
          });
     });
}


//Simple route to the show view used populate but could be simplier without the ingredient model
function show(req, res) {
     Drink.findById(req.params.id)
          .populate("ingredients")
          .exec(function (err, drink) {
               console.log(drink);
               res.render("drinks/show", {
                    drink,
               });
          });
}

//Deletes drink with findOneAndDelte
function deleteDrink(req, res) {
     Drink.findOneAndDelete(
          { _id: req.params.id, user: req.user._id },
          function (err) {
               res.redirect("/drinks");
          }
     );
}

//doesnt update put it gets you to the update page
function update(req, res) {
     Drink.findById(req.params.id)
          .populate("ingredients")
          .exec(function (err, drink) {
               res.render("ingredients/update", {
                    drink,
               });
          });
}


module.exports = {
     index,
     new: newDrink,
     create: createDrink,
     show,
     delete: deleteDrink,
     update,
     updatePhoto
};
