const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');

function readCollection(name) {
  const file = path.join(dataDir, `${name}.json`);
  if (!fs.existsSync(file)) return [];
  const raw = fs.readFileSync(file, 'utf8');
  try {
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Failed to parse ${file}`, err);
    return [];
  }
}

function writeCollection(name, data) {
  const file = path.join(dataDir, `${name}.json`);
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
}

module.exports = {
  readCollection,
  writeCollection
};
