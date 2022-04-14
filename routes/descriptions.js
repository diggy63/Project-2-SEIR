const express = require('express');
const router = express.Router();
const passport = require('passport');
const descripCtrl = require('../controllers/descriptions');


router.put('/drinks/:id/descriptions', descripCtrl.update);


module.exports = router;