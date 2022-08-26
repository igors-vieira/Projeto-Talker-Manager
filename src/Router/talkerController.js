const { Router } = require('express');
const fs = require('fs/promises');
const { join } = require('path');

const talkerR = Router();

talkerR.get('/', async (_req, res) => {
  const talkerJson = await fs.readFile(join(__dirname, '../talker.json'), { encoding: 'utf-8' });
  
  const talkerParse = JSON.parse(talkerJson);

  res.status(200).json(talkerParse);
});

talkerR.get('/:id', async (req, res) => {
  const talkerJson = await fs.readFile(join(__dirname, '../talker.json'), { encoding: 'utf-8' });
  
  const talkerParse = JSON.parse(talkerJson);

  const findId = talkerParse.find((talker) => talker.id === Number(req.params.id));

  if (!findId) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  res.status(200).json(findId);
});

module.exports = talkerR;