const express = require('express');
const router = express.Router();
const passport = require('passport');
const drinkCtrl = require('../controllers/drinks');
const multer = require('multer');
const isLoggedIn = require('../config/auth');

//define multer storage
const storage = multer.diskStorage({
    //destination for files
    destination: function(req, file, cb){
        cb(null, './public/uploads');
    },
    // adding a filer name
    filename: function(req,file, cb){
        cb(null, Date.now() + file.originalname)
    }
});

//uypload paramaeter for multer
const upload = multer({
    storage: storage
})
// The root route renders our only view


router.put('/:id/upload', isLoggedIn, upload.single('image'), drinkCtrl.updatePhoto);
router.get('/', drinkCtrl.index);
router.get('/new', isLoggedIn, drinkCtrl.new);
router.post('/', isLoggedIn, drinkCtrl.create);
router.get('/:id', drinkCtrl.show);
router.delete('/:id', isLoggedIn, drinkCtrl.delete);
router.get('/:id/edit', isLoggedIn, drinkCtrl.update);



module.exports = router;