const express = require('express');
const chance = require('chance').Chance();
const shuffleArray = require('shuffle-array');

const app = express();

app.use(express.static('public'));

const data = {
  headers: ['Name', 'Age', 'Profession', 'Country'],
  rows: new Array(10).fill(undefined).map(() => {
    return [
      chance.name(),
      chance.age(),
      chance.profession(),
      chance.country({ full: true }),
    ];
  }),
};

app.get('/data', (req, res) => {
  res.json({
    headers: data.headers,
    rows: shuffleArray(data.rows),
    lastUpdated: new Date().toISOString(),
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`app i running`));
