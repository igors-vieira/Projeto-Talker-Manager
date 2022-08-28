const { Router } = require('express');
const fs = require('fs/promises');
const { join } = require('path');
const jeisao = require('../parseJson');
const { validateToken,
   validateName,
    validateAge, validateTalk, validateRate } = require('../middleware/ValiPostPutDel');

const talkerR = Router();

talkerR.get('/', async (_req, res) => {
  const talkersParse = await jeisao();

  res.status(200).json(talkersParse);
});

talkerR.get('/:id', async (req, res) => {
  const talkersParse = await jeisao();

  const findId = talkersParse.find((talker) => talker.id === Number(req.params.id));

  if (!findId) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  res.status(200).json(findId);
});

talkerR.post('/', validateToken,
 validateName, validateAge, validateTalk, validateRate, async (req, res) => {
  const talkersParse = await jeisao();

  const proxID = talkersParse.length + 1;

  const addPeople = { id: proxID, ...req.body };

  talkersParse.push(addPeople);

  await fs.writeFile(join(__dirname, '../talker.json'), JSON.stringify(talkersParse));

  res.status(201).json(addPeople);
});

talkerR.put('/:id', validateToken,
validateName, validateAge, validateTalk, validateRate, async (req, res) => {
  const talkersParse = await jeisao();

  const id = Number(req.params.id);

  const talker = talkersParse.find((tlk) => tlk.id === id);
  if (talker) {
    const i = talkersParse.indexOf(talker);
    const up = { id, ...req.body };
    talkersParse.splice(i, 1, up);
    await fs.writeFile(join(__dirname, '../talker.json'), JSON.stringify(talkersParse));
    return res.status(200).json(up);
  }
  res.status(400).json({ message: 'id da pessoa não encontrado' });
});

talkerR.delete('/:id', validateToken, async (req, res) => {
  const id = Number(req.params.id);
  const talkersParse = await jeisao();

  const delTalker = talkersParse.filter((talker) => talker.id !== id);

  if (!talkersParse.some((t) => t.id === id)) {
    return res.sendStatus(401);
  }
  await fs.writeFile(join(__dirname, '../talker.json'), JSON.stringify(delTalker));
  res.sendStatus(204);
});

module.exports = talkerR;
