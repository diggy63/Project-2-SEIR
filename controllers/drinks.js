const Drink = require('../models/drink');
const multer = require('multer');

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

async function addPhoto(req, res){
    try{
    const newDrink = await Drink.findById(req.params.id);
    newDrink.imageName = req.file.filename;
    console.log(newDrink);
    newDrink.save(function(err) {
        res.redirect(`/drinks/${newDrink._id}`);  
    })
    }catch(error){

    }
}


async function updatePhoto(req, res){
    try{
    const newDrink = await Drink.findById(req.params.id);
    newDrink.imageName = req.file.filename;
    console.log(newDrink);
    newDrink.save(function(err) {
        res.redirect(`/drinks/${newDrink._id}/edit`);  
    })
    }catch(error){

    }
}





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
        res.render("drinks/makeDrink", {
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
        console.log(drink);
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

function update(req,res){
    console.log(req.params.id);
    Drink.findById(req.params.id).populate("ingredients").exec(function(err, drink){
        res.render("ingredients/update", {
            drink,
        })
})
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
    updatePhoto
};
