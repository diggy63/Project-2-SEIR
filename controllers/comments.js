const Drink = require('../models/drink');




function createComment (req,res){ 

    Drink.findById(req.params.id, function(err, drink) {
		// add the review (req.body) to the movieFromTheDatabase

		//updates the review model so that is has the information in the datatbase\
		req.body.user = req.user._id;
		req.body.userName = req.user.name;
		req.body.userAvatar = req.user.avatar;
        console.log(drink.comments);
        drink.comments.push(req.body);
        drink.save(function(err){
            res.redirect(`/drinks/${drink._id}`);
        })
    })
}

function deleteComment(req,res){
    Drink.findOne({'comments._id': req.params.commentId}).then(function(drink){
        const comment = drink.comments.id(req.params.commentId);
        if (!comment.user.equals(req.user._id)) return res.redirect(`/drinks/${drink._id}`);
        comment.remove();
        drink.save().then(function(){
            res.redirect(`/drinks/${drink._id}`);
        }).catch(function(err){
            return next(err);
        })
    })
    
}



module.exports = {
    create: createComment,
    delete: deleteComment
}
