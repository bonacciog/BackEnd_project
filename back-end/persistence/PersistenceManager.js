/**
 *  This script manages DB interactions
 *  @author Giovanni Bonaccio
 */

const mysql = require('mysql');
const userClass = require('../model/User');
const messageClass = require('../model/Message');

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

  var sql = "insert into 1001db.users(FirstName, LastName, Email, Username, Password, XP, FieldOfStudy, TypeOfDegree, University) values	('" +
    user.getFirtName + "','" + user.getLastName + "','" + user.getEmail + "','" + user.getUsername + "','" + user.getPassword + "'," + user.getXP + ",'" + user.getFieldStudy + "','" + user.getDegreeType + "','" + user.getUniversity + "')";

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

function getUser(username, password, callback) {

  var user = null;

  var connection = mysql.createConnection(dbParam);
  connection.connect(function (err) {
    if (err) callback(err, null);
    console.log("Connected to DB!");
  });
  var sql = "select * from 1001db.users where username = '" + username + "' and password = '" + password + "'";

  connection.query(sql, function (err, result) {
    if (err) callback(err, null);
    else {
      Object.keys(result).forEach(function (key) {
        var row = result[key];
        user = new userClass.User(row.FirstName, row.LastName, row.Username, row.Email, row.Password, row.University, row.FieldOfStudy, row.TypeOfDegree);
        user.setXP = row.XP;
      });
      callback(null, user);
    }
  });
  connection.end();
}

function updateUser(user) {
  if (!user instanceof userClass.User) {
    throw new ParamError("Incorrect parameter!");
  }
  var connection = mysql.createConnection(dbParam);
  connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to DB!");
  });

  var sql = "UPDATE 1001DB.USERS SET FirstName = '" + user.getFirtName + "'," +
    "LastName = '" + user.getLastName + "'," +
    "Email = '" + user.getEmail + "'," +
    "Username = '" + user.getUsername + "'," +
    "Password = '" + user.getPassword + "'," +
    "XP = '" + user.getXP + "'," +
    "FieldOfStudy = '" + user.getFieldStudy + "'," +
    "TypeOfDegree = '" + user.getDegreeType + "'," +
    "University = '" + user.getUniversity + "'" +
    "WHERE USERNAME = '" + user.getUsername + "'";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record updated");
  });
  connection.end();
}

function saveMessage(message){
  if (!message instanceof messageClass.Message) {
    throw new ParamError("Incorrect parameter!");
  }
  var connection = mysql.createConnection(dbParam);
  connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to DB!");
  });

  var sql = "insert into 1001db.messages(SenderUsername, ReceiverUsername, Text, DateTime, IsRead)" +
            " values ('" + message.getSenderUsername + "','" + message.getReceiverUsername + "','" + message.getText + "','" + message.getDateTime + "','" + message.getIsRead + "')";

  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });

  connection.end();
}

function deleteMessage(message) {
  if (!message instanceof messageClass.Message) {
    throw new ParamError("Incorrect parameter!");
  }
  var connection = mysql.createConnection(dbParam);
  connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to DB!");
  });

  var sql = "delete from 1001db.messages where SenderUsername = '" + message.getSenderUsername + "' and ReceiverUsername = '" + message.getReceiverUsername + "' and DateTime = '" + message.getDateTime + "'";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record deleted");
  });


  connection.end();
}

function getMessages(SenderUsername, ReceiverUsername, limit, callback){
  var connection = mysql.createConnection(dbParam);
  connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to DB!");
  });
  var sql = "select * "+
            "from 1001db.messages" +
            " where SenderUsername = '" + SenderUsername + "' and ReceiverUsername = '" + ReceiverUsername + "'" +
            " order by Datetime limit " + limit
  connection.query(sql, function (err, result) {
    if (err) callback(err, null);
    else {
      var messageArrayDim = 0;
      var message = new Array();
      Object.keys(result).forEach(function (key) {
        var row = result[key];
        message[messageArrayDim] = new messageClass.Message(row.SenderUsername, row.ReceiverUsername, row.Text, row.IsRead, row.DateTime);
        messageArrayDim++;
      });
      callback(null, message);
    }
  });
  connection.end();

}

exports.getUser = getUser;
exports.updateUser = updateUser;
exports.saveUser = saveUser;
exports.deleteUser = deleteUser;
exports.saveMessage = saveMessage;
exports.deleteMessage = deleteMessage;
exports.getMessages = getMessages;
