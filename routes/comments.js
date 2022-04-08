const express = require('express');
const router = express.Router();
const passport = require('passport');
const comtCtrl = require('../controllers/comments');


router.post('/drinks/:id/comments', comtCtrl.create);
router.delete('/drinks/:drinkId/comments/:commentId', comtCtrl.delete);


module.exports = router;