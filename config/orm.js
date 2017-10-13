// Create an orm.js file inside config directory.
// Import (require) connection.js into orm.js
// In the orm.js file, create the methods that will execute the necessary MySQL commands in the controllers. These are the methods you will need to use in order to retrieve and store data in your database.
// selectAll()
// insertOne()
// updateOne()
// Export the ORM object in module.exports.

var connection = require('./connection.js');

function addQuestionMarks(ammount) {
  var questionMarkArr = [];

  for (var i = 0; i < ammount; i++) {
    questionMarkArr.push('?');
  }

  return questionMarkArr.toString();
}

function objToSql(obj) {
  var arr = [];

  for (var key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      arr.push(key + '=' + obj[key]);
    }
  }

  return arr.toString();
}

var orm = {

  selectAll: function(table, callback) {
    var queryString = 'SELECT * FROM ' + table + ';';
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      callback(result);
    });
  },

  insertOne: function(table, columns, values, callback) {
    var queryString = 'INSERT INTO ' + table;

    queryString += ' (';
    queryString += columns.toString();
    queryString += ') ';
    queryString += 'VALUES (';
    queryString += addQuestionMarks(values.length);
    queryString += ') ';

    console.log(queryString);
    connection.query(queryString, values, function(err, result) {
      if (err) {
        throw err;
      }
      callback(result);
    });
  },

  updateOne: function(table, objColVals, condition, callback) {
    var queryString = 'UPDATE ' + table;

    queryString += ' SET ';
    queryString += objToSql(objColVals);
    queryString += ' WHERE ';
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      callback(result);
    });
  }

};

module.exports = orm;