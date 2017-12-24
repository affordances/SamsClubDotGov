const knex = require('../db/connection');

const express = require('express');

const app = express();

app.set('port', (process.env.API_PORT || 3001));

app.get('/api/product', (req, res) => {
  knex('products').select('*')
    .then(products => {
      res.json({ products: products });
    });
  }
);

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});
