const { Router } = require('express');
const validateEmail = require('../middleware/validateEmail');
const validatePass = require('../middleware/validatepass');
const tokenJs = require('../token');

const loginR = Router();

loginR.post('/', validateEmail, validatePass, (_req, res) => {
  res.status(201).json({ token: tokenJs() });
});

module.exports = loginR;