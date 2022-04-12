const express = require('express');
const router = express.Router();
const passport = require('passport');
const ingrdCtrl = require('../controllers/ingredients');


router.post('/drinks/:id/newIngredients', ingrdCtrl.addNew);
router.post('/drinks/:id/addIngredients', ingrdCtrl.addIngredients);
router.delete('/drinks/:drinkId/ingredients/:id', ingrdCtrl.delete);
router.put('/drinks/:drinkId/ingredients/:id', ingrdCtrl.update);
module.exports = router;