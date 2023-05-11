const express = require('express');
const controller = require('../controllers/user');
const passport = require('passport');
const router = express.Router();


// localhost:3000/api/user
router.get('/', passport.authenticate('admin-access', {session: false}), controller.get);

// localhost:3000/api/user
router.post('/',   /* passport.authenticate('boss-access', {session: false}), */  controller.post);

// localhost:3000/api/user/:_id
router.patch('/:_id',  passport.authenticate('boss-access', {session: false}),  controller.patch);

// localhost:3000/api/user/:_id
router.delete('/:_id', passport.authenticate('boss-access', {session: false}), controller.delete);

module.exports = router;