const { Router } = require('express');
const fs = require('fs/promises');
const { join } = require('path');
const jeisao = require('../parseJson');
const { validateToken,
   validateName,
    validateAge, validateTalk, validateRate } = require('../middleware/ValiPostPutDel');

const talkerR = Router();

talkerR.get('/', async (_req, res) => {
  const talkerParse = await jeisao();

  res.status(200).json(talkerParse);
});

talkerR.get('/:id', async (req, res) => {
  const talkerParse = await jeisao();

  const findId = talkerParse.find((talker) => talker.id === Number(req.params.id));

  if (!findId) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  res.status(200).json(findId);
});

talkerR.post('/', validateToken,
 validateName, validateAge, validateTalk, validateRate, async (req, res) => {
  const talkerParse = await jeisao();

  const proxID = talkerParse.length + 1;

  const addPeople = { id: proxID, ...req.body };

  talkerParse.push(addPeople);

  await fs.writeFile(join(__dirname, '../talker.json'), JSON.stringify(talkerParse));

  res.status(201).json(addPeople);
});

module.exports = talkerR;
