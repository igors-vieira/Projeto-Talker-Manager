const { Router } = require('express');
const fs = require('fs/promises');
const { join } = require('path');

const talkerR = Router();

talkerR.get('/', async (_req, res) => {
  const talkerJson = await fs.readFile(join(__dirname, '../talker.json'), { encoding: 'utf-8' });
  
  const talkerParse = JSON.parse(talkerJson);

  res.status(200).json(talkerParse);
});

module.exports = talkerR;