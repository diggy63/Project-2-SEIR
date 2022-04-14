const { resolveInclude } = require("ejs");
const Drink = require("../models/drink");
const Ingredient = require("../models/ingredient");

async function addNew(req, res) {
    try {
        const drink = await Drink.findById(req.params.id);
        let createIngredOne = await Ingredient.create(req.body);
        drink.ingredients.push(createIngredOne._id);
        drink.save(function(error){
            res.redirect(`/drinks/${req.params.id}/edit`);
        })
    } catch (error) {
        
    }
}

async function addIngredients(req, res) {
     try {
          const drink = await Drink.findById(req.params.id);
          drink.imageName = req.file.filename;
          let long = req.body.ingredients.length;
          let temp = { ingredients: "", amount: "" };
          if (typeof req.body.ingredients === "string") {
               let createIngredOne = await Ingredient.create(req.body);
               drink.ingredients.push(createIngredOne._id);
               console.log("save");
          } else {
               for (i = 0; i < long; i++) {
                    temp.ingredients = req.body.ingredients[i];
                    temp.amount = req.body.amount[i];
                    let createIngred = await Ingredient.create(temp);
                    drink.ingredients.push(createIngred._id);
               }
               console.log("done");
          }
          drink.save(function (err) {
               res.redirect(`/drinks/${drink._id}`)
          });
          console.log("end");
     } catch (error) {}
}

async function deleteIngredient(req, res) {
     try {
         console.log(req.params.drinkId);
          const deleteIngredient = await Drink.findById(req.params.drinkId);
          deleteIngredient.ingredients.remove(req.params.id)
          deleteIngredient.save(function(err){
            res.redirect(`/drinks/${req.params.drinkId}/edit`);
          })
     } catch (error) {}
}

async function update(req,res){
    const updateIngred = await Ingredient.findById(req.params.id);
    updateIngred.ingredients = req.body.ingredients;
    updateIngred.amount = req.body.amount;
    updateIngred.save(function(error){
       res.redirect(`/drinks/${req.params.drinkId}/edit`);
    })
}

module.exports = {
     addNew,
     addIngredients,
     delete: deleteIngredient,
     update
};
