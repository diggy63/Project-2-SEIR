const Drink = require("../models/drink");
const Ingredient = require("../models/ingredient");

function addNew(req, res) {
     //console.log(req.body);
     const newIngred = Ingredient(req.body);
     Drink.findById(req.params.id, function (err, drink) {
          newIngred.save(function (err) {
               res.render(`drinks/addIngredient`, {
                    drink,
               });
          });
     });
}



function assignIngreds(drink, req){
    drink.description = req.body.description;
    let long = req.body.ingredients.length;
     let temp = { ingredients: "", amount: "" };

    if (typeof req.body.ingredients === "string") {
        Ingredient.create(req.body, function (err, ingred) {
             drink.ingredients.push(ingred._id);
             drink.save(function (err) {
                  res.redirect(`/drinks`);
             });
        });
   }else {
    for (i = 0; i < long; i++) {
         temp.ingredients = req.body.ingredients[i];
         temp.amount = req.body.amount[i];
         Ingredient.create(temp, function (err, ingred) {
             drink.ingredients.push(ingred._id);
             console.log(drink.ingredients);
             console.log("changing");
         })
     
    }
}
console.log("end of function");
return drink;

}

async function addIngredients(req, res) {
     try {
        const drink = await Drink.findById(req.params.id)
        assignIngreds(drink, req).then(()=>{

        
        console.log(`${newDrink} did this get skipped`);
            console.log(newDrink);
            console.log(drink.ingredients);
            newDrink.save(function (err) {
            res.redirect(`/drinks`);
            });
        }).then(() => {
            console.log("did this work");
        })
        console.log("did this work");
        
    

     } catch (error) {
         
     }
}


module.exports = {
     addNew,
     addIngredients,
};
