const validateToken = (req, res, next) => {
  const { authorization } = req.headers;

  console.log(authorization);

  if (!authorization) {
    res.status(401).json({ message: 'Token não encontrado' });
  } else if (authorization.length !== 16) {
    res.status(401).json({ message: 'Token inválido' });
  } else {
    next();
  }
};

const validateName = (req, res, next) => {
  const requiredProp = ['name'];

  if (!requiredProp.every((property) => property in req.body)) {
    res.status(400).json({ message: 'O campo "name" é obrigatório' });
  } else if (req.body.name.length < 3) {
    res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  } else {
    next();
  }
};

const validateAge = (req, res, next) => {
  const requiredProp = ['age'];

  if (!requiredProp.every((property) => property in req.body)) {
    res.status(400).json({ message: 'O campo "age" é obrigatório' });
  } else if (req.body.age < 18) {
    res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  } else {
    next();
  }
};

const validateTalk = (req, res, next) => {
  const requiredProp = ['talk'];
  const requiredWatchedAt = ['watchedAt'];
  const requiredRate = ['rate'];

  if (!requiredProp.every((property) => property in req.body)) {
    res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  } else if (!requiredWatchedAt.every((property) => property in req.body.talk)) {
    res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  } else if (!requiredRate.every((prop) => prop in req.body.talk)) {
    res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  } else {
    next();
  }
};

const validateRate = (req, res, next) => {
  const { rate, watchedAt } = req.body.talk;
  const regexData = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

  if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
    res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  } else if (!regexData.test(watchedAt)) {
    res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  } else {
    next();
  }
};

module.exports = {
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateRate,
};
