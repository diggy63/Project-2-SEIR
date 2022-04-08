const Drink = require('../models/drink');



function createReview (req,res){ 

    Drink.findById(req.params.id, function(err, drink) {
		// add the review (req.body) to the movieFromTheDatabase

		console.log(req.user);
		//updates the review model so that is has the information in the datatbase\
		req.body.user = req.user._id;
		req.body.userName = req.user.name;
		req.body.userAvatar = req.user.avatar;
        drink.reviews.push(req.body);
            drink.save(function(err){
                res.redirect(`/drinks/${drink._id}`)	
            })
    })
}

module.exports = {
    create: createReview,
};
