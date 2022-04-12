const express = require('express');
const router = express.Router();
const passport = require('passport');
const drinkCtrl = require('../controllers/drinks');
const multer = require('multer');

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
    storage: storage,
})
// The root route renders our only view



router.post('/:id/upload', upload.single('image'), drinkCtrl.addPhoto);
router.put('/:id/upload', upload.single('image'), drinkCtrl.updatePhoto);
router.get('/', drinkCtrl.index);
router.get('/new', drinkCtrl.new);
router.post('/', drinkCtrl.create);
router.get('/:id', drinkCtrl.show);
router.delete('/:id', drinkCtrl.delete);
router.get('/:id/edit', drinkCtrl.update);



module.exports = router;