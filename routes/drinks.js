const express = require('express');
const router = express.Router();
const passport = require('passport');
const drinkCtrl = require('../controllers/drinks');
// The root route renders our only view


router.get('/', drinkCtrl.index);


module.exports = router;