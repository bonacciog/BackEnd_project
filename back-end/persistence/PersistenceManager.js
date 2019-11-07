/**
 *  This script manages DB interactions
 *  @author Giovanni Bonaccio
 */

const mysql = require('mysql');
const userClass = require('../model/User');
const messageClass = require('../model/Message');
const topicClass = require('../model/Topic');
const questionClass = require('../model/Question');

var dbParam = {
  host: "localhost",
  user: "1001DB_admin",
  password: "JacopoBarozzi",
  database: "1001db"
};



function saveUser(user, callback) {
  if (!user instanceof userClass.User) {
    throw new ParamError("Incorrect parameter!");
  }

  var connection = mysql.createConnection(dbParam);
  connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to DB!");
  });
  var sql = "insert into 1001db.users(Firstname, Lastname, University) values	('" +
    user.getFirstname + "','" + user.getLastname + "','" + user.getUniversity + "')";

  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    var id = result.insertId;
    callback(err, id);

  });



  connection.end();
}

function deleteUser(ID) {

  var connection = mysql.createConnection(dbParam);
  connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to DB!");
  });

  var sql = "delete from 1001db.users where ID = '" + ID + "'";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record deleted");

  });
  connection.end();
}

function getUser(ID, callback) {

  var user = null;

  var connection = mysql.createConnection(dbParam);
  connection.connect(function (err) {
    if (err) callback(err, null);
    console.log("Connected to DB!");
  });
  var sql = "select * from 1001db.users where  ID = '" + ID + "'";

  connection.query(sql, function (err, result) {
    if (err) callback(err, null);
    else {
      var user;
      Object.keys(result).forEach(function (key) {
        var row = result[key];
        user = new userClass.User(row.Firstname, row.Lastname, row.University);
        user.setID = row.ID;
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

  var sql = "UPDATE 1001DB.USERS SET Firstname = '" + user.getFirstname + "'," +
    "Lastname = '" + user.getLastname + "'," +
    "University = '" + user.getUniversity + "'" +
    " WHERE ID = " + user.getID;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record updated");
  });
  connection.end();
}

function saveMessage(message) {
  if (!message instanceof messageClass.Message) {
    throw new ParamError("Incorrect parameter!");
  }
  var connection = mysql.createConnection(dbParam);
  connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to DB!");
  });

  var sql = "insert into 1001db.messages(SenderUser_ID, ReceiverUser_ID, Text, DateTime, IsRead)" +
    " values ('" + message.getSenderUserID + "','" + message.getReceiverUserID + "','" + message.getText + "','" + message.getDateTime + "','" + message.getIsRead + "')";

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

  var sql = "delete from 1001db.messages where SenderUser_ID = " + message.getSenderUserID + " and ReceiverUser_ID = " + message.getReceiverUserID + " and DateTime = '" + message.getDateTime + "'";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record deleted");
  });


  connection.end();
}
/**
 * 
 * @param {*} SenderUsername 
 * @param {*} ReceiverUsername 
 * @param {*} limit 
 * @param {*} callback 
 * 
 * @returns returns only messages sended from sender to receiver
 */
function getMessages(SenderUserID, ReceiverUserID, limit, callback) {
  var connection = mysql.createConnection(dbParam);
  connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to DB!");
  });
  var sql = "select * " +
    "from 1001db.messages" +
    " where SenderUser_ID = " + SenderUserID + " and ReceiverUser_ID = " + ReceiverUserID +
    " order by Datetime limit " + limit
  connection.query(sql, function (err, result) {
    if (err) callback(err, null);
    else {
      var messageArrayDim = 0;
      var message = new Array();
      Object.keys(result).forEach(function (key) {
        var row = result[key];
        message[messageArrayDim] = new messageClass.Message(row.SenderUser_ID, row.ReceiverUser_ID, row.Text, row.IsRead, row.DateTime);
        messageArrayDim++;
      });
      callback(null, message);
    }
  });
  connection.end();

}

/**
 * 
 * @param {*} Username_1 
 * @param {*} Username_2 
 * @param {*} limit 
 * @param {*} callback 
 * 
 * @returns returns all messages sended from 1 to 2 and viceversa
 * 
 */

function getAllMessages(ID_1, ID_2, limit, callback) {
  var connection = mysql.createConnection(dbParam);
  connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to DB!");
  });
  var sql = "select * " +
    "from 1001db.messages" +
    " where (SenderUser_ID = " + ID_1 + " and ReceiverUser_ID = " + ID_2 + ")" +
    " or (SenderUser_ID = " + ID_2 + " and ReceiverUser_ID = " + ID_1 + ")" +
    " order by Datetime limit " + limit
  connection.query(sql, function (err, result) {
    if (err) callback(err, null);
    else {
      var messageArrayDim = 0;
      var message = new Array();
      Object.keys(result).forEach(function (key) {
        var row = result[key];
        message[messageArrayDim] = new messageClass.Message(row.SenderUser_ID, row.ReceiverUser_ID, row.Text, row.IsRead, row.DateTime);
        messageArrayDim++;
      });
      callback(null, message);
    }
  });
  connection.end();

}

function saveKey(key) {
  var connection = mysql.createConnection(dbParam);
  connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to DB!");
  });
  var sql = "insert into 1001db.ExecutionTable values ('" + key + "')";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });

  connection.end();
}

function deleteKey(key) {
  var connection = mysql.createConnection(dbParam);
  connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to DB!");
  });
  var sql = "delete from 1001db.ExecutionTable where 1001db.ExecutionTable.KEY = '" + key + "'";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record deleted");
  });

  connection.end();
}

function getKey(callback) {
  var connection = mysql.createConnection(dbParam);
  connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to DB!");
  });
  var sql = "select * " +
    "from 1001db.ExecutionTable"
  connection.query(sql, function (err, result) {
    if (err) callback(err, null);
    else {
      var exKey;
      Object.keys(result).forEach(function (key) {
        var row = result[key];
        exKey = row.KEY;
      });
      callback(null, exKey);
    }
  });
  connection.end();

}

function saveTopic(topic) {
  if (!topic instanceof topicClass.Topic) {
    throw new ParamError("Incorrect parameter!");
  }
  var connection = mysql.createConnection(dbParam);
  connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to DB!");
  });

  var sql = "insert into 1001db.Topics(TopicName)" +
    " values ('" + topic.getTopicsName + "')";

  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });

  connection.end();
}

function deleteTopic(topicName) {
  var connection = mysql.createConnection(dbParam);
  connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to DB!");
  });
  var sql = "delete from 1001db.Topics " +
    "where ID in (select ID from (SELECT * FROM 1001db.Topics) as T2 where TopicName = '" + topicName + "')";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record deleted");
  });

  connection.end();
}

function getAllTopics(callback) {
  var connection = mysql.createConnection(dbParam);
  connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to DB!");
  });
  var sql = "select * " +
    "from 1001db.Topics";
  connection.query(sql, function (err, result) {
    if (err) callback(err, null);
    else {
      var topicArrayDim = 0;
      var topics = new Array();
      Object.keys(result).forEach(function (key) {
        var row = result[key];
        topics[topicArrayDim] = new topicClass.Topic(row.TopicName);
        topics[topicArrayDim].setID = row.ID;
        topicArrayDim++;
      });
      callback(null, topics);
    }
  });
  connection.end();
}

function saveChallengeQuestion(question, callback) {
  if (!question instanceof questionClass.Question) {
    throw new ParamError("Incorrect parameter!");
  }
  var connection = mysql.createConnection(dbParam);
  connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to DB!");
  });
  if (question.getExplanation === undefined)
    var sql = "insert into 1001db.ChallengeQuestions(QuestionText, Answer_A, Answer_B, Answer_C, Answer_D, XPValue, Topics_ID)" +
      " values ('" + question.getQuestionText + "','" + question.getAnswer_A + "','" + question.getAnswer_B + "','" + question.getAnswer_C + "','" + question.getAnswer_D + "'," + question.getXPValue + "," + question.getTopic_ID + ")";
  else
    var sql = "insert into 1001db.ChallengeQuestions(QuestionText, Answer_A, Answer_B, Answer_C, Answer_D, XPValue, Topics_ID, Explanation)" +
      " values ('" + question.getQuestionText + "','" + question.getAnswer_A + "','" + question.getAnswer_B + "','" + question.getAnswer_C + "','" + question.getAnswer_D + "'," + question.getXPValue + "," + question.getTopic_ID + ",'"+question.getExplanation+"')";

  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    var id = result.insertId;
    callback(null, id);
  });

  connection.end();
}

function deleteChallengeQuestion(questionID) {
  var connection = mysql.createConnection(dbParam);
  connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to DB!");
  });
  var sql = "delete from 1001db.ChallengeQuestions where ID = " + questionID;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record deleted");
  });

  connection.end();
}

function saveAccumulatedPoints(UserID, TopicID, XP) {
  var connection = mysql.createConnection(dbParam);
  connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to DB!");
  });
  var sql = "insert into 1001db.AccumulatedPoints(Users_ID, Topics_ID, XP)" +
    " values (" + UserID + "," + TopicID + "," + XP + ")";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });

  connection.end();
}

function deleteAccumulatedPoints(UserID, TopicID) {
  var connection = mysql.createConnection(dbParam);
  connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to DB!");
  });
  var sql = "delete from 1001db.AccumulatedPoints where  Users_ID = " + UserID + " and Topics_ID = " + TopicID;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record deleted");
  });

  connection.end();
}

function getUserTopicPoints(UserID, TopicID, callback) {
  var connection = mysql.createConnection(dbParam);
  connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to DB!");
  });
  var sql = "select XP " +
    "from 1001db.AccumulatedPoints" +
    " where User_ID = " + UserID +
    " and Topic_ID = " + TopicID;
  connection.query(sql, function (err, result) {
    if (err) callback(err, null);
    else {
      var XP;
      Object.keys(result).forEach(function (key) {
        var row = result[key];
        XP = row.XP;
      });
      callback(null, XP);
    }
  });
  connection.end();
}

function updateAccumulatedPoints(UserID, TopicID, XP) {
  var connection = mysql.createConnection(dbParam);
  connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to DB!");
  });
  var sql = "update 1001db.AccumulatedPoints " +
    "set XP = " + XP + " " +
    " where User_ID = " + UserID +
    " and Topic_ID = " + TopicID;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record updated");
  });

  connection.end();
}

function getLeaderBoard(callback) {
  var connection = mysql.createConnection(dbParam);
  connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to DB!");
  });
  var sql = "select U.ID, Firstname, Lastname, University, sum(XP) AS SUMXPs\n" +
    "from 1001db.topics T, 1001db.users U, 1001db.accumulatedpoints P\n" +
    "where T.ID=P.Topics_ID\n" +
    "and  U.ID=P.Users_ID\n" +
    "group by U.ID\n" +
    "order by sum(XP) DESC";
  connection.query(sql, function (err, result) {
    if (err) callback(err, null);
    else {
      var resArrayDim = 0;
      var res = new Array();
      Object.keys(result).forEach(function (key) {
        var row = result[key];
        res[resArrayDim] = {
          Firstname: row.Firstname,
          Lastname: row.Lastname,
          University: row.University,
          UserID: row.ID,
          XP: row.SUMXPs
        }
        resArrayDim++;
      });
      callback(null, res);
    }
  });
  connection.end();

}

function getRandomPlayer(ID, callback) {
  var connection = mysql.createConnection(dbParam);
  connection.connect(function (err) {
    if (err) throw callback(err, null);
    console.log("Connected to DB!");
  });
  var sql = "select ID\n" +
    "from 1001db.users\n" +
    "where ID not in (select SenderProposal_ID\n" +
    "from 1001db.challenge)\n" +
    "and ID not in (select ReceiverProposal_ID\n" +
    "from 1001db.challenge)\n" +
    "and ID <> " + ID + "\n" +
    "order by RAND()\n" +
    "limit 1\n"

  connection.query(sql, function (err, result) {
    if (err) throw callback(err, null);
    else {
      var resultID;
      Object.keys(result).forEach(function (key) {
        var row = result[key];
        resultID = row.ID
      });

      callback(err, resultID);
    }
  });
  connection.end();
}

function saveChallenge(ID1, ID2, callback) {
  var connection = mysql.createConnection(dbParam);
  connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to DB!");
  });
  var sql = "insert into 1001db.challenge(SenderProposal_ID, ReceiverProposal_ID) values(" + ID1 + "," + ID2 + ")";
  connection.query(sql, function (err, result) {
    if (err) throw callback(err, null);
    console.log("1 record inserted");
    var id = result.insertId;
    callback(null, id);
  });
  connection.end();
}

function isPlaying(ID, callback) {
  var connection = mysql.createConnection(dbParam);
  connection.connect(function (err) {
    if (err) throw callback(err, null);
    console.log("Connected to DB!");
  });
  var sql = "select * from 1001db.challenge where SenderProposal_ID = " + ID + " or ReceiverProposal_ID = " + ID
  connection.query(sql, function (err, result) {
    if (err) throw callback(err, null);
    else {
      if (Object.keys(result).length == 0)
        callback(err, null);
      else
        callback(err, result);
    }
  });
  connection.end();

}

function deleteChallenge(ID) {
  var connection = mysql.createConnection(dbParam);
  connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to DB!");
  });
  var sql = "delete from 1001db.challenge where  ID = " + ID;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record deleted");
  });

  connection.end();
}

function getRandomQuestions(topicID, type, numberRows, callback) {
  var connection = mysql.createConnection(dbParam);
  connection.connect(function (err) {
    if (err) throw callback(err, null);
    console.log("Connected to DB!");
  });
  var sql = "select *\n" + 
  "from 1001db.challengequestions C, 1001db.questiontypeinformation Q, 1001db.typeinformations T\n" + 
  "where C.ID = Q.ChallengeQuestions_ID\n"+
  "and T.Type = '" + type +"'\n"+
  "and T.ID = Q.TypeInformations_ID\n"+
  "and C.Topics_ID = " + topicID + "\n"
  "order by rand()\n"+
  "limit " + numberRows;
  connection.query(sql, function (err, result) {
    if (err) throw callback(err, null);
    else {
      var questionArray = new Array();
      var questionDim = 0;
      Object.keys(result).forEach(function (key) {
        var row = result[key];
        questionArray[questionDim] = new questionClass.Question(row.QuestionText, row.Answer_A,
          row.Answer_B, row.Answer_C, row.Answer_D, row.XPValue, row.Topics_ID, row.Explanation);
        questionArray[questionDim].setType = row.Type;
        questionArray[questionDim].setTimeInSec = row.TimeInSec;
        questionDim++;
      });
      callback(err, questionArray);
    }
  });
  connection.end();
}

function addQuestionTypeInformations(questionID, typeID){
  var connection = mysql.createConnection(dbParam);
  connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to DB!");
  });
  var sql = "insert into 1001db.questiontypeinformation(ChallengeQuestions_ID, TypeInformations_ID)\n"+
           "values(" + questionID +","+ typeID+ ")";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });

  connection.end();
}

function saveTypeInformations(type, timeInSec) {
  var connection = mysql.createConnection(dbParam);
  connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to DB!");
  });
  var sql = "insert into 1001db.typeinformations(Type, TimeInSec) values('" + type +"',"+ timeInSec+ ")";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });

  connection.end();
}

function deleteTypeInformations(ID){
  var connection = mysql.createConnection(dbParam);
  connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to DB!");
  });
  var sql = "delete from 1001db.typeinformations where  ID = " + ID;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record deleted");
  });

  connection.end();
}

function getTypeInformationsID(type, callback){
  var connection = mysql.createConnection(dbParam);
  connection.connect(function (err) {
    if (err) throw callback(err, null);
    console.log("Connected to DB!");
  });
  var sql = "select ID\n" +
    "from 1001db.typeinformations\n" +
    "where Type ='" + type + "'\n"
  connection.query(sql, function (err, result) {
    if (err) throw callback(err, null);
    else {
      var resultId;
      Object.keys(result).forEach(function (key) {
        var row = result[key];
        resultId = row.ID;
      });
      callback(null, resultId);
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
exports.getAllMessages = getAllMessages;
exports.saveKey = saveKey;
exports.saveTopic = saveTopic;
exports.deleteKey = deleteKey;
exports.deleteTopic = deleteTopic;
exports.saveChallengeQuestion = saveChallengeQuestion;
exports.deleteChallengeQuestion = deleteChallengeQuestion;
exports.getAllTopics = getAllTopics;
exports.getKey = getKey;
exports.saveAccumulatedPoints = saveAccumulatedPoints;
exports.deleteAccumulatedPoints = deleteAccumulatedPoints;
exports.getUserTopicPoints = getUserTopicPoints;
exports.updateAccumulatedPoints = updateAccumulatedPoints;
exports.getLeaderBoard = getLeaderBoard;
exports.getRandomPlayer = getRandomPlayer;
exports.saveChallenge = saveChallenge;
exports.isPlaying = isPlaying;
exports.deleteChallenge = deleteChallenge;
exports.getRandomQuestions = getRandomQuestions;
exports.saveTypeInformations = saveTypeInformations;
exports.deleteTypeInformations = deleteTypeInformations;
exports.getTypeInformationsID = getTypeInformationsID;
exports.addQuestionTypeInformations = addQuestionTypeInformations;