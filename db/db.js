const sqlite3 = require('sqlite3');
const path = require('path');
var basicTools = require('../tools/basic');  

var db = new sqlite3.Database(path.resolve(__dirname, './spares_shop.sqlite3'));

function InsertVehicle(data) {
  return new Promise ((resolve, reject) => {
    data.Tags = basicTools.AutoTag([data.Make, data.Model, data.Derivative], data.Tags);
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
    data.Tags = basicTools.AutoTag([data.Make, data.Model, data.Derivative], data.Tags);
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

function SearchVehicle(tags, includeAll) {
  return new Promise ((resolve, reject) => {
    if (tags) {
      try {
        tags = tags.split(',');
        var search = basicTools.MakeSearchTags(tags.length, includeAll ? 'AND' : 'OR');
        db.all('Select * from Vehicle where ' + search, tags, function(err, rows) {
            if (err) {
              reject(err.message);
            }
            resolve(rows);
        });
      }
      catch(ex){
        reject(ex.message);
      }
    }
    else{
      reject('No search Data');
    }
  });
}

exports.InsertVehicle = InsertVehicle;
exports.FetchVehicle = FetchVehicle;
exports.UpdateVehicle = UpdateVehicle;
exports.SearchVehicle = SearchVehicle;
