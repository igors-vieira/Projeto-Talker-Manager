const validatePass = (req, res, next) => {
  const requiredProp = ['password'];

  if (!requiredProp.every((property) => property in req.body)) {
    res.status(400).json({ message: 'O campo "password" é obrigatório' });
  } else if ((req.body.password.length < 6)) {
    res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  } else {
    next();
  }
};

module.exports = validatePass;