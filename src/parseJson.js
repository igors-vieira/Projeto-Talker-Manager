const fs = require('fs/promises');
const { join } = require('path');

async function Jsao() {
  const talkerJson = await fs.readFile(join(__dirname, './talker.json'), { encoding: 'utf-8' });
  
  const talkerParse = JSON.parse(talkerJson);

  return talkerParse;
}

module.exports = Jsao;
