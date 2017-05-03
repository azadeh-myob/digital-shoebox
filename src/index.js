const express = require('express');
const imageStoreController = require('./imageStoreController');
const bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded ({extended : true}));

app.post('/images', imageStoreController.postImage);

app.listen(3002, () => {
  console.log('Service started on port 3002');
});
