/**
 *  This script manages DB interactions
 *  @author Giovanni Bonaccio
 */

const mysql = require('mysql');
const userClass = require('../model/User');


var dbParam = {
  host: "localhost",
  user: "1001DB_admin",
  password: "JacopoBarozzi",
  database: "1001db"
};



function saveUser(user) {
  if (!user instanceof userClass.User) {
    throw new ParamError("Incorrect parameter!");
  }

  var connection = mysql.createConnection(dbParam);
  connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to DB!");
  });

  var sql = "insert into 1001db.users(FirstName, LastName, Email, Username, Password, XP) values	('" +
    user.getFirtName + "','" + user.getLastName + "','" + user.getEmail + "','" + user.getUsername + "','" + user.getPassword + "'," + user.getXP + ")";

  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });

  connection.end();
}

function deleteUser(user) {
  if (!user instanceof userClass.User) {
    throw new ParamError("Incorrect parameter!");
  }
  var connection = mysql.createConnection(dbParam);
  connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to DB!");
  });

  var sql = "delete from 1001db.users where username = '" + user.getUsername + "'";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record deleted");
  });


  connection.end();
}

function getUser(username, password) {

  var user = null;

  var connection = mysql.createConnection(dbParam);
  connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to DB!");
  });
  var sql = "select * from 1001db.users where username = '" + username + "' and password = '" + password + "'";
  connection.query(sql, function (err, result) {
    if (err) throw err;
  });
  Object.keys(result).forEach(function (key) {
    var row = result[key];
    user = new userClass.User(row.FirstName, row.LastName, row.Username, row.Email, row.Password);
    user.setXP = row.XP;
  });
  console.log(user);
  connection.end();
  return user;
}

function updateUser() {
  connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to DB!");
  });
  connection.end();
}

exports.getUser = getUser;
exports.updateUser = updateUser;
exports.saveUser = saveUser;
exports.deleteUser = deleteUser;