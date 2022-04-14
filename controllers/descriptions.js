const Drink = require('../models/drink');

async function update(req,res){
    const drink = await Drink.findById(req.params.id);
    drink.description = req.body.description;
    drink.save((err) => {
        res.redirect(`/drinks/${drink._id}/edit`);

    });
}


module.exports = {
    update
}
