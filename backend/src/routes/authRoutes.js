const express = require('express');
const { body } = require('express-validator');
const { register, login } = require('../controllers/authController');

const router = express.Router();

router.post(
  '/register',
  [body('email').isEmail(), body('password').isLength({ min: 8 }), body('name').notEmpty()],
  register
);

router.post('/login', [body('email').isEmail(), body('password').notEmpty()], login);

module.exports = router;
