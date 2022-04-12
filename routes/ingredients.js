const express = require('express');
const router = express.Router();
const passport = require('passport');
const ingrdCtrl = require('../controllers/ingredients');


router.post('/drinks/:id/newIngredient', ingrdCtrl.addNew);
router.post('/drinks/:id/addIngredients', ingrdCtrl.addIngredients);


module.exports = router;