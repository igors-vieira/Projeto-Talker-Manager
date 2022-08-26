const validateEmail = (req, res, next) => {
  const requiredProp = ['email'];
  const regex = /^\S+@\S+\.\S+$/;

  if (!requiredProp.every((property) => property in req.body)) {
    res.status(400).json({ message: 'O campo "email" é obrigatório' });
  } else if (!regex.test(req.body.email)) {
    res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  } else {
    next();
  }
};

module.exports = validateEmail;