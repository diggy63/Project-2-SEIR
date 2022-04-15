const express = require('express');
const router = express.Router();
const passport = require('passport');
const ingrdCtrl = require('../controllers/ingredients');
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






router.post('/drinks/:id/addIngredients', upload.single('image'), ingrdCtrl.addIngredients);
router.delete('/drinks/:drinkId/ingredients/:id', ingrdCtrl.delete);
router.put('/drinks/:drinkId/ingredients/:id', ingrdCtrl.update);
module.exports = router;