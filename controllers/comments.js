const Drink = require('../models/drink');




async function createComment (req,res){ 
    //console.log(req.params.id);
    try {
        const foundDrink = await  Drink.findById(req.params.id);
        req.body.user = req.user._id;
		req.body.userName = req.user.name;
		req.body.userAvatar = req.user.avatar;
        foundDrink.comments.push(req.body);
        console.log(foundDrink);
        foundDrink.save(function(){
            console.log(foundDrink);
            res.redirect(`/drinks/${foundDrink._id}`);
        })
    } catch (error) {
        
    }
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

function deleteTest(req,res){
    res.send("comments");
}



module.exports = {
    create: createComment,
    delete: deleteComment,
    deleteTest
}
