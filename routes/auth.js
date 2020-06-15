const express = require('express');
const router = express.Router();
const passport = require('passport');
const auth = require('../app/controllers/auth');
const decryptToken = require('../app/middlewares/decrypt-token');

router.post('/register', auth.register);
router.post('/login', auth.login);
router.post('/token', decryptToken, passport.authenticate('jwt', { session: false }), auth.token);

module.exports = router;