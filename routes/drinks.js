const express = require('express');
const router = express.Router();
const passport = require('passport');
const drinkCtrl = require('../controllers/drinks');
// The root route renders our only view


router.get('/', drinkCtrl.index);
router.get('/new', drinkCtrl.new);
router.post('/', drinkCtrl.create);
router.get('/:id', drinkCtrl.show);
router.delete('/:id', drinkCtrl.delete);

module.exports = router;