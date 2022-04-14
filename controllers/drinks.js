const Drink = require("../models/drink");
const multer = require("multer");
const Ingredient = require("../models/ingredient");

//define multer storage
// const storage = multer.diskStorage({
//     //destination for files
//     destination: function(req, file, cb){
//         cb(null, './public/uploads');
//     },
//     // adding a filer name
//     filename: function(req,file, cb){
//         cb(null, Date.now() + file.originalname)
//     }
// });

// //upload paramaters for multer
// const upload = multer({
//     storage: storage,
// })

async function addPhoto(req, res) {
     try {
          const newDrink = await Drink.findById(req.params.id);
          newDrink.imageName = req.file.filename;
          newDrink.save(function (err) {
               res.redirect(`/drinks/${newDrink._id}`);
          });
     } catch (error) {}
}

async function updatePhoto(req, res) {
     try {
          const newDrink = await Drink.findById(req.params.id);
          newDrink.imageName = req.file.filename;
          newDrink.save(function (err) {
               res.redirect(`/drinks/${newDrink._id}/edit`);
          });
     } catch (error) {}
}

function index(req, res) {
     Drink.find({}, function (err, drinks) {
          res.render("drinks/index", {
               drinks,
          });
     });
}

function newDrink(req, res) {
     res.render("drinks/new");
}

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

// async function createDrink(req, res) {
//      try {
//           req.body.name = req.body.name.toUpperCase();
//           req.body.user = req.user._id;
//           req.body.userName = req.user.name;
//           req.body.userAvatar = req.user.avatar;
//           const drink = new Drink(req.body);
//           console.log(drink)
//           drink.description = req.body.description;
//           let long = req.body.ingredients.length;
//           let temp = { ingredients: "", amount: "" };
//           console.log("before If");
//           if (typeof req.body.ingredients === "string") {
//                 console.log("in if")
//                let createIngredOne = await Ingredient.create(req.body);
//                drink.ingredients.push(createIngredOne._id);
//                console.log("after if");
//           } else {console.log("start else")
//                for (i = 0; i < long; i++) {
//                     temp.ingredients = req.body.ingredients[i];
//                     temp.amount = req.body.amount[i];
//                     let createIngred = await Ingredient.create(temp);
//                     drink.ingredients.push(createIngred._id);
//                }
//                console.log("outside of for");
//           }console.log("beofore save");
//           drink.save(function (err) {
//               let crank = drink;
//               console.log(crank);
//                 console.log("4");
//                res.redirect("/drinks");
//                console.log("5");
//           });
//           console.log("end");
//      } catch (error) {}
// }

function createDecription(req, res) {
     Drink.findById(req.params.id, function (err, drink) {
          //console.log(req.body);
          drink.description = req.body.description;
          drink.save(function (err) {
               res.render(`drinks/addIngredient`, {
                    drink,
               });
          });
          //drink.description = req.body.description
     });
}

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

function deleteDrink(req, res) {
     Drink.findOneAndDelete(
          { _id: req.params.id, user: req.user._id },
          function (err) {
               res.redirect("/drinks");
          }
     );
}

function update(req, res) {
     console.log(req.params.id);
     Drink.findById(req.params.id)
          .populate("ingredients")
          .exec(function (err, drink) {
               res.render("ingredients/update", {
                    drink,
               });
          });
}

function updateDescription(req,res){
    console.log(req.body);
    res.send("we here");
    //res.redirect(`/drinks/${req.params.id}`);
}

module.exports = {
     index,
     new: newDrink,
     create: createDrink,
     show,
     delete: deleteDrink,
     createDecription,
     update,
     addPhoto,
     updatePhoto,
     updateDescription
};
