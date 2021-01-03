const sqlite3 = require('sqlite3');
const path = require('path');
var basicTools = require('../tools/basic');  

var db = new sqlite3.Database(path.resolve(__dirname, './spares_shop.sqlite3'));

function InsertVehicle(data) {
  return new Promise ((resolve, reject) => {
    var params = basicTools.CleanQuotes(basicTools.ObjectToArray(data, ['Make', 'Model', 'Derivative', 'Year_From', 'Year_To', 'Tags']));
    db.run('INSERT INTO Vehicle (Make, Model, Derivative, Year_From, Year_To, Tags) VALUES(?,?,?,?,?,?)', params, function(err) {
        if (err) {
          reject(err.message);
        }
        resolve(this.lastID);
    });
  });
}

function FetchVehicle(Id) {
  return new Promise ((resolve, reject) => {
    db.get('Select * from Vehicle where id = ?', [Id], function(err, row) {
        if (err) {
          reject(err.message);
        }
        resolve(row);
    });
  });
}

function UpdateVehicle(data) {
  return new Promise ((resolve, reject) => {
    var params = basicTools.CleanQuotes(basicTools.ObjectToArray(data, ['Make', 'Model', 'Derivative', 'Year_From', 'Year_To', 'Tags', 'Id']));
    db.run(`Update Vehicle 
            Set Make = ?,  Model = ?, Derivative = ?, Year_From = ?, Year_To = ?, Tags = ? 
            Where id = ?`, params, function(err) {
        if (err) {
          reject(err.message);
        }
        resolve(data.Id);
    });
  });
}

exports.InsertVehicle = InsertVehicle;
exports.FetchVehicle = FetchVehicle;
exports.UpdateVehicle = UpdateVehicle;
