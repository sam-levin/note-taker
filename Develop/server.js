const express = require ('express');
const app = express();
const {data} = require('../develop/db/db.json')

app.get('/api/notes', (req, res) => {
    res.json(data);
}) 

app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
  });

