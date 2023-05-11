const express = require('express');
const controller = require('../controllers/auth');
const passport = require('passport');
const router = express.Router();

// localhost:3000/api/auth/login
router.post('/login', controller.login);

// localhost:3000/api/auth
router.get('/', passport.authenticate('seller-access', {session: false}), controller.auth);


module.exports = router;