// Model setup

// Inside your burger directory, create a folder named models.
// In models, make a burger.js file.
// Inside burger.js, import orm.js into burger.js
// Also inside burger.js, create the code that will call the ORM functions using burger specific input for the ORM.
// Export at the end of the burger.js file.
// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var burger = {

  selectAll: function(callback) {
    orm.selectAll("burgers", function(res) {
      callback(res);
    });
  },

  insertOne: function(columns, values, callback) {
    orm.insertOne("burgers", columns, values, function(res) {
      callback(res);
    });
  },

  updateOne: function(objColVals, condition, callback) {
    orm.updateOne("burgers", objColVals, condition, function(res) {
      callback(res);
    });
  }
};

module.exports = burger;