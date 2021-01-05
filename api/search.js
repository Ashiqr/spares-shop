const bodyParser = require('body-parser');
const app = require('express')();
const db = require('../db/db');

app.use(bodyParser.json());

app.get('/vehicle', (req, res) => {
    db.SearchVehicle(req.query.tags).then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json({'Error': err});
    });
});

module.exports = app;
