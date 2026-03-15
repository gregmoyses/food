const express = require('express');
const { body } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');
const { chat } = require('../controllers/chatController');

const router = express.Router();

router.post('/', authMiddleware, [body('message').isString().notEmpty()], chat);

module.exports = router;
