const express = require('express');
const router = express.Router();
const passport = require('passport');
const reviewCtrl = require('../controllers/review');
// The root route renders our only view


router.post('/drinks/:id/reviews', reviewCtrl.create);


module.exports = router;