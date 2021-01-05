const bodyParser = require('body-parser');
const app = require('express')();
const db = require('../db/db');
// const formidable = require('formidable');
// const fs = require('fs');
// const path = require('path');
// var multer = require('multer');

app.use(bodyParser.json());
app.post('/', (req, res) => {
  db.InsertVehicle(req.body).then((result) => {
     res.json({'Id': result});
  })
  .catch((err) => {
    res.json({'Error': err});
  });
});

app.patch('/', (req, res) => {
  db.UpdateVehicle(req.body).then((result) => {
     res.json({'Id': result});
  })
  .catch((err) => {
    res.json({'Error': err});
  });
 
});

app.get('/', (req, res) => {
  db.FetchVehicle(req.query.id).then((result) => {
    res.json(result);
  })
  .catch((err) => {
    res.json({'Error': err});
  });
});

// app.post('/upload', (req, res) =>{
//   var form = new formidable.IncomingForm();
//   form.parse(req, function (err, fields, files) {
//     if (err) {
//       res.end(err.message);
//     }
//     var newPath = path.resolve(__dirname, '../assets/vehicle/' + req.query.id.toString()  + '/' + files.file.name);
//     // var oldPath = path.resolve(__dirname, files.file.path);
//     fs.writeFile(newPath, files.file(), () => {
//       res.end('File uploaded');
//     })
//     .catch((err) => {
//       res.end(err.message);
//     });
//     // fs.rename(oldPath, newPath, function (err) {
//     //   if (err) {
//     //     res.end(err.message);
//     //   }
//     //   else{
//     //     res.end('File uploaded');
//     //   }
//     // });
//   });
// })

module.exports = app;
