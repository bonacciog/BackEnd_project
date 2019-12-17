/**
 *  This script manages DB interactions
 *  @author Giovanni Bonaccio
 */

const mysql = require('mysql');
const userClass = require('../model/User');
const messageClass = require('../model/Message');
const topicClass = require('../model/Topic');
const questionClass = require('../model/ChallengeQuestion');
const challengeClass = require('../model/Challenge');
const challengeResultClass = require('../model/ChallengeResult');
const companyClass = require('../model/Company');

var dbParam = {
  host: "localhost",
  user: "1001DB_admin",
  password: "JacopoBarozzi",
  database: "1001db"
};



function saveUser(user, callback) {
  try {
    if (!user instanceof userClass.User) {
      callback(new ParamError("Incorrect parameter!"), null);
    }

    var connection = mysql.createConnection(dbParam);
    connection.connect(function (err) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: Connected to DB!");
    });
    var sql = "insert into 1001db.Users(Firstname, Lastname, University) values	('" +
      user.getFirstname + "','" + user.getLastname + "','" + user.getUniversity + "')";

    connection.query(sql, function (err, result) {
      if (err) callback(err, null);;
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: New User with ID = " + result.insertId + " inserted.");
      var id = result.insertId;
      callback(err, id);

    });



    connection.end();
  } catch (err) {
    callback(err, null);
  }
}

function deleteUser(ID, callback) {
  try {
    if (ID === undefined)
      callback(new ParamError('Incorrect Parameter!'), null);
    var connection = mysql.createConnection(dbParam);
    connection.connect(function (err) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: Connected to DB!");
    });

    var sql = "delete from 1001db.Users where ID = '" + ID + "'";
    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: A User with ID = " + ID + " deleted.");

    });
    connection.end();
  } catch (err) {
    callback(err, null);
  }
}

function getUser(ID, callback) {
  try {
    if (ID === undefined)
      callback(new ParamError('Incorrect Parameter!'), null);
    var user = null;

    var connection = mysql.createConnection(dbParam);
    connection.connect(function (err) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: Connected to DB!");
    });
    var sql = "select * from 1001db.Users where  ID = " + ID;

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
  } catch (err) {
    callback(err, null);
  }
}

function updateUser(user, callback) {
  try {
    if (!user instanceof userClass.User) {
      callback(new ParamError("Incorrect parameter!"), null);
    }
    var connection = mysql.createConnection(dbParam);
    connection.connect(function (err) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: Connected to DB!");
    });

    var sql = "UPDATE 1001DB.Users SET Firstname = '" + user.getFirstname + "'," +
      "Lastname = '" + user.getLastname + "'," +
      "University = '" + user.getUniversity + "'" +
      " WHERE ID = " + user.getID;
    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: 1 record updated");
    });
    connection.end();
  } catch (err) {
    callback(err, null);
  }
}

function saveMessage(message, callback) {
  try {
    if (!message instanceof messageClass.Message) {
      callback(new ParamError("Incorrect parameter!"), null);
    }
    var connection = mysql.createConnection(dbParam);
    connection.connect(function (err) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: Connected to DB!");
    });

    var sql = "insert into 1001db.Messages(SenderUser_ID, ReceiverUser_ID, Text, DateTime)" +
      " values ('" + message.getSenderUserID + "','" + message.getReceiverUserID + "','" + message.getText + "','" + message.getDateTime + "')";

    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: New message with ID = " + result.insertId + " inserted");
    });

    connection.end();
  } catch (err) {
    callback(err, null);
  }
}

function deleteMessage(message, callback) {
  try {
    if (!message instanceof messageClass.Message) {
      callback(new ParamError("Incorrect parameter!"), null);
    }
    var connection = mysql.createConnection(dbParam);
    connection.connect(function (err) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: Connected to DB!");
    });

    var sql = "delete from 1001db.Messages where SenderUser_ID = " + message.getSenderUserID + " and ReceiverUser_ID = " + message.getReceiverUserID + " and DateTime = '" + message.getDateTime + "'";
    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: A message deleted");
    });


    connection.end();
  } catch (err) {
    callback(err, null);
  }
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
  try {
    if (SenderUserID === undefined || ReceiverUserID === undefined || limit === undefined)
      callback(new ParamError('Incorrect Parameter!'), null);
    var connection = mysql.createConnection(dbParam);
    connection.connect(function (err) {
      if (err) callback(err, null);;
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: Connected to DB!");
    });
    var sql = "select * " +
      "from 1001db.Messages" +
      " where SenderUser_ID = " + SenderUserID + " and ReceiverUser_ID = " + ReceiverUserID +
      " order by Datetime limit " + limit
    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      else {
        var messageArrayDim = 0;
        var message = new Array();
        Object.keys(result).forEach(function (key) {
          var row = result[key];
          message[messageArrayDim] = new messageClass.Message(row.SenderUser_ID, row.ReceiverUser_ID, row.Text, row.DateTime);
          messageArrayDim++;
        });
        callback(null, message);
      }
    });
    connection.end();
  } catch (err) {
    callback(err, null);
  }
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
  try {
    if (ID_1 === undefined || ID_2 === undefined || limit === undefined)
      callback(new ParamError('Incorrect Parameter!'), null);
    var connection = mysql.createConnection(dbParam);
    connection.connect(function (err) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: Connected to DB!");
    });
    var sql = "select * " +
      "from 1001db.Messages" +
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
          message[messageArrayDim] = new messageClass.Message(row.SenderUser_ID, row.ReceiverUser_ID, row.Text, row.DateTime);
          messageArrayDim++;
        });
        callback(null, message);
      }
    });
    connection.end();
  } catch (err) {
    callback(err, null);
  }
}


function getKey(callback) {
  var connection = mysql.createConnection(dbParam);
  connection.connect(function (err) {
    if (err) callback(err, null);
    console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: Connected to DB!");
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

function saveTopic(topic, callback) {
  try {
    if (!topic instanceof topicClass.Topic) {
      callback(new ParamError("Incorrect parameter!"), null);
    }
    var connection = mysql.createConnection(dbParam);
    connection.connect(function (err) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: Connected to DB!");
    });

    var sql = "insert into 1001db.Topics(TopicName)" +
      " values ('" + topic.getTopicsName + "')";

    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: New topic with ID = " + result.insertId + " inserted");
    });

    connection.end();
  } catch (err) {
    callback(err, null);
  }
}

function deleteTopic(topicName, callback) {
  try {
    if (topicName === undefined)
      callback(new ParamError('Incorrect Parameter!'), null);
    var connection = mysql.createConnection(dbParam);
    connection.connect(function (err) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: Connected to DB!");
    });
    var sql = "delete from 1001db.Topics " +
      "where ID in (select ID from (SELECT * FROM 1001db.Topics) as T2 where TopicName = '" + topicName + "')";
    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: 1 record deleted");
    });

    connection.end();
  } catch (err) {
    callback(err, null);
  }
}

function getAllTopics(callback) {
  try {
    var connection = mysql.createConnection(dbParam);
    connection.connect(function (err) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: Connected to DB!");
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
  } catch (err) {
    callback(err, null);
  }
}

function getTopicID(topic, callback) {
  try {
    var connection = mysql.createConnection(dbParam);
    connection.connect(function (err) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: Connected to DB!");
    });
    var sql = "select ID " +
      "from 1001db.Topics where TopicName = '" + topic + "'";
    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      else {
        var topicID;
        Object.keys(result).forEach(function (key) {
          var row = result[key];
          topicID = row.ID;
        });
        callback(null, topicID);
      }
    });
    connection.end();
  } catch (err) {
    callback(err, null);
  }
}

async function saveChallengeQuestion(question, callback) {
  try {
    if (!question instanceof questionClass.ChallengeQuestion) {
      callback(new ParamError("Incorrect parameter!"), null);
    }
    var connection = mysql.createConnection(dbParam);
    connection.connect(function (err) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: Connected to DB!");
    });
    if (question.getExplanation === undefined)
      var sql = "insert into 1001db.ChallengeQuestions(QuestionText, Answer_A, Answer_B, Answer_C, Answer_D, XPValue, Topics_ID)\n" +
        " values ('" + question.getQuestionText + "','" + question.getAnswer_A + "','" + question.getAnswer_B + "','" + question.getAnswer_C + "','" + question.getAnswer_D + "'," + question.getXPValue + "," + question.getTopic_ID + ")";
    else
      var sql = "insert into 1001db.ChallengeQuestions(QuestionText, Answer_A, Answer_B, Answer_C, Answer_D, XPValue, Topics_ID, Explanation)\n" +
        " values ('" + question.getQuestionText + "','" + question.getAnswer_A + "','" + question.getAnswer_B + "','" + question.getAnswer_C + "','" + question.getAnswer_D + "'," + question.getXPValue + "," + question.getTopic_ID + ",'" + question.getExplanation + "')";

    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: New question with ID = " + result.insertId + " inserted ");
      var id = result.insertId;
      callback(null, id);
    });

    connection.end();
  } catch (err) {
    callback(err, null);
  }
}


function deleteChallengeQuestion(questionID, callback) {
  try {
    if (questionID === undefined)
      callback(new ParamError('Incorrect Parameter!'), null);
    var connection = mysql.createConnection(dbParam);
    connection.connect(function (err) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: Connected to DB!");
    });
    var sql = "delete from 1001db.ChallengeQuestions where ID = " + questionID;
    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: A question deleted");
    });

    connection.end();
  } catch (err) {
    callback(err, null);
  }
}





function getLeaderBoard(callback) {
  try {
    var connection = mysql.createConnection(dbParam);
    connection.connect(function (err) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: Connected to DB!");
    });
    var sql = "select U.ID, Firstname, Lastname, University, sum(XP) AS SUMXPs\n" +
      "from 1001db.Users U LEFT JOIN 1001db.ChallengeResults P ON (U.ID=P.PlayerID)\n" +
      "group by U.ID\n" +
      "order by sum(XP) DESC";
    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      else {
        var resArrayDim = 0;
        var res = new Array();
        Object.keys(result).forEach(function (key) {
          var row = result[key];
          if (row.SUMXPs === null)
            res[resArrayDim] = {
              Firstname: row.Firstname,
              Lastname: row.Lastname,
              University: row.University,
              UserID: row.ID,
              XP: 0
            }
          else
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
  } catch (err) {
    callback(err, null);
  }
}

function getRivals(ID, callback) {
  try {
    if (ID === undefined)
      callback(new ParamError('Incorrect Parameter!'), null);
    var connection = mysql.createConnection(dbParam);
    connection.connect(function (err) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: Connected to DB!");
    });
    var sql = "select U.ID, Firstname, Lastname, University, sum(XP) AS SUMXPs\n" +
      "from 1001db.Users U LEFT JOIN 1001db.ChallengeResults P ON (U.ID=P.PlayerID)\n" +
      "where U.ID <> " + ID + "\n" +
      "group by U.ID\n" +
      "order by sum(XP) DESC";
    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      else {
        var resArrayDim = 0;
        var res = new Array();
        Object.keys(result).forEach(function (key) {
          var row = result[key];
          if (row.SUMXPs === null)
            res[resArrayDim] = {
              Firstname: row.Firstname,
              Lastname: row.Lastname,
              University: row.University,
              UserID: row.ID,
              XP: 0
            }
          else
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
  } catch (err) {
    callback(err, null);
  }
}

function isThereASlot(ID, callback) {
  try {
    if (ID === undefined)
      callback(new ParamError('Incorrect Parameter!'), null);
    var connection = mysql.createConnection(dbParam);
    connection.connect(function (err) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: Connected to DB!");
    });
    var sql = "select ID, SenderProposal_ID\n" +
      "from 1001db.Challenge\n" +
      "where  Status = '" + challengeClass.ChallengeStatus.WaitingOtherPlayer + "'\n"+
    "and ReceiverProposal_ID is null\n" +
      "and SenderProposal_ID <> " + ID + "\n" +
      "order by ID\n" +
      "limit 1\n";

    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      else {
        if (Object.keys(result).length == 0)
          callback(null, null);
        else {
          var result;
          Object.keys(result).forEach(function (key) {
            var row = result[key];
            result = {
              ID: row.ID,
              SenderProposal_ID: row.SenderProposal_ID
            }
          });
          callback(null, result);
        }
      }
    });
    connection.end();
  } catch (err) {
    callback(err, null);
  }
}


function saveChallenge(challenge, callback) {
  try {
    if (!challenge instanceof challengeClass.Challenge)
      callback(new ParamError('Incorrect Parameter!'), null);
    var connection = mysql.createConnection(dbParam);
    connection.connect(function (err) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: Connected to DB!");
    });
    var sql = "insert into 1001db.Challenge(SenderProposal_ID, ReceiverProposal_ID, Status)" +
      " values(" + challenge.getSender + "," + challenge.getReceiver + ",'" + challenge.getStatus + "')";
    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: New Challenge with ID = " + result.insertId + " inserted.");
      var id = result.insertId;
      callback(null, id);

    });
    connection.end();
  } catch (err) {
    callback(err, null);
  }
}

function updateChallenge(challenge, callback) {
  try {
    if (!challenge instanceof challengeClass.Challenge)
      callback(new ParamError('Incorrect Parameter!'), null);
    var connection = mysql.createConnection(dbParam);
    connection.connect(function (err) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: Connected to DB!");
    });
    var sql = "update 1001db.Challenge" +
      " Set Status = '" + challenge.getStatus + "', SenderProposal_ID = " + challenge.getSender + ", ReceiverProposal_ID = " + challenge.getReceiver + " where ID = " + challenge.getID;

    connection.query(sql, function (err, result) {
      if (err) callback(err, null);;
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: A Challenge updated.");

    });
    connection.end();
  } catch (err) {
    callback(err, null);
  }
}

function addDATETIMEtoChallenge(date, challengeID, callback) {
  try {
    if (challengeID === undefined || date === undefined)
      callback(new ParamError('Incorrect Parameter!'), null);
    var connection = mysql.createConnection(dbParam);
    connection.connect(function (err) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: Connected to DB!");
    });
    var sql = "update 1001db.Challenge" +
      " Set Datetime = '" + date + "' where ID = " + challengeID;

    connection.query(sql, function (err, result) {
      if (err) callback(err, null);;
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: A Challenge updated.");

    });
    connection.end();
  } catch (err) {
    callback(err, null);
  }
}

function getQuestionsByChallengeID(ID, callback) {
  try {
    if (ID === undefined)
      callback(new ParamError('Incorrect Parameter!'), null);
    var connection = mysql.createConnection(dbParam);
    connection.connect(function (err) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: Connected to DB!");
    });
    var sql = "select CQ.*,T.Type, T.TimeInSec\n" +
      "from 1001db.Challenge C, 1001db.ChallengeResults CR, 1001db.ChallengeQuestions CQ,1001db.QuestionTypeInformation Q, 1001db.TypeInformations T\n" +
      "where  C.ID = " + ID + "\n" +
      "and CQ.ID = Q.ChallengeQuestions_ID\n" +
      "and T.ID = Q.TypeInformations_ID\n" +
      "and C.ID = CR.ChallengeID\n" +
      "and CQ.ID = CR.QuestionID\n" +
      "order by CR.ID";

    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      else {
        var questionArray = new Array();
        var questionDim = 0;
        Object.keys(result).forEach(function (key) {
          var row = result[key];
          questionArray[questionDim] = new questionClass.ChallengeQuestion(row.QuestionText, row.Answer_A,
            row.Answer_B, row.Answer_C, row.Answer_D, row.XPValue, row.Topics_ID, row.Explanation);
          questionArray[questionDim].setType = row.Type;
          questionArray[questionDim].setID = row.ID;
          questionArray[questionDim].setTimeInSec = row.TimeInSec;
          questionDim++;
        });
        callback(err, questionArray);
      }
    });
    connection.end();
  } catch (err) {
    callback(err, null);
  }
}


function deleteChallenge(ID, callback) {
  try {
    if (ID === undefined)
      callback(new ParamError('Incorrect Parameter!'), null);
    var connection = mysql.createConnection(dbParam);
    connection.connect(function (err) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: Connected to DB!");
    });
    var sql = "delete from 1001db.Challenge where  ID = " + ID;
    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: A challenge with ID = " + ID + " deleted");
    });

    connection.end();
  } catch (err) {
    callback(err, null);
  }
}

function getRandomQuestions(topicID, type, numberRows, callback) {
  try {
    if (topicID === undefined || type == undefined || numberRows == undefined)
      callback(new ParamError('Incorrect Parameter!'), null);
    var connection = mysql.createConnection(dbParam);
    connection.connect(function (err) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: Connected to DB!");
    });
    var sql = "select C.ID, QuestionText, Answer_A, Answer_B, Answer_C, Answer_D, XPValue, Topics_ID, Explanation, Type, TimeInSec\n" +
      "from 1001db.ChallengeQuestions C, 1001db.QuestionTypeInformation Q, 1001db.TypeInformations T\n" +
      "where C.ID = Q.ChallengeQuestions_ID\n" +
      "and T.Type = '" + type + "'\n" +
      "and T.ID = Q.TypeInformations_ID\n" +
      "and C.Topics_ID = " + topicID + "\n" +
      "order by rand()\n limit " + numberRows;

    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      else {
        var questionArray = new Array();
        var questionDim = 0;
        Object.keys(result).forEach(function (key) {
          var row = result[key];
          questionArray[questionDim] = new questionClass.ChallengeQuestion(row.QuestionText, row.Answer_A,
            row.Answer_B, row.Answer_C, row.Answer_D, row.XPValue, row.Topics_ID, row.Explanation);
          questionArray[questionDim].setType = row.Type;
          questionArray[questionDim].setID = row.ID;
          questionArray[questionDim].setTimeInSec = row.TimeInSec;
          questionDim++;
        });
        callback(err, questionArray);
      }
    });
    connection.end();
  } catch (err) {
    callback(err, null);
  }
}

function addQuestionTypeInformations(questionID, typeID, callback) {
  try {
    if (questionID === undefined || typeID === undefined)
      callback(new ParamError('Incorrect Parameter!'), null);
    var connection = mysql.createConnection(dbParam);
    connection.connect(function (err) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: Connected to DB!");
    });
    var sql = "insert into 1001db.QuestionTypeInformation(ChallengeQuestions_ID, TypeInformations_ID)\n" +
      "values(" + questionID + "," + typeID + ")";
    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: A QuestionTypeInformation inserted");
    });

    connection.end();
  } catch (err) {
    callback(err, null);
  }
}



function saveTypeInformations(type, timeInSec, callback) {
  try {
    if (type === undefined || timeInSec == undefined)
      callback(new ParamError('Incorrect Parameter!'), null);
    var connection = mysql.createConnection(dbParam);
    connection.connect(function (err) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: Connected to DB!");
    });
    var sql = "insert into 1001db.TypeInformations(Type, TimeInSec) values('" + type + "'," + timeInSec + ")";
    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: A Type inserted");
    });

    connection.end();
  } catch (err) {
    callback(err, null);
  }
}


function deleteTypeInformations(ID, callback) {
  try {
    if (ID === undefined)
      callback(new ParamError('Incorrect Parameter!'), null);
    var connection = mysql.createConnection(dbParam);
    connection.connect(function (err) {
      if (err) callback(err, null);;
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: Connected to DB!");
    });
    var sql = "delete from 1001db.TypeInformations where  ID = " + ID;
    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: A Type deleted");
    });

    connection.end();
  } catch (err) {
    callback(err, null);
  }
}

function getTypeInformationsID(type, callback) {
  try {
    if (type === undefined)
      callback(new ParamError('Incorrect Parameter!'), null);

    var connection = mysql.createConnection(dbParam);
    connection.connect(function (err) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: Connected to DB!");
    });
    var sql = "select ID\n" +
      "from 1001db.TypeInformations\n" +
      "where Type ='" + type + "'\n"
    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
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
  } catch (err) {
    callback(err, null);
  }
}




function savePendingNotification(UserID, NotificationJSON, callback) {
  try {
    if (UserID === undefined || NotificationJSON === undefined)
      callback(new ParamError('Incorrect Parameter!'), null);
    var connection = mysql.createConnection(dbParam);
    connection.connect(function (err) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: Connected to DB!");
    });

    var sql = "insert into 1001db.PendingNotifications(UserID, NotificationJSON)\n" +
      "values (" + UserID + ",'" + NotificationJSON + "')";
    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: A pending notification for User " + UserID + " inserted");
    });

    connection.end();
  } catch (err) {
    callback(err, null);
  }
}

function deletePendingNotification(ID, callback) {
  try {
    if (ID === undefined)
      callback(new ParamError('Incorrect Parameter!'), null);
    var connection = mysql.createConnection(dbParam);
    connection.connect(function (err) {
      if (err) callback(err, null);;
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: Connected to DB!");
    });
    var sql = "delete from 1001db.PendingNotifications where  UserID = " + ID;
    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: A pending notification deleted");
    });

    connection.end();
  } catch (err) {
    callback(err, null);
  }
}


function getPendingNotifications(UserID, callback) {
  try {
    if (UserID === undefined)
      callback(new ParamError('Incorrect Parameter!'), null);
    var connection = mysql.createConnection(dbParam);
    connection.connect(function (err) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: Connected to DB!");
    });
    var sql = "select *\n" +
      "from 1001db.PendingNotifications\n" +
      "where UserID =" + UserID + "\n"
    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      else {
        var notificationArrayDim = 0;
        var notifications = new Array();
        Object.keys(result).forEach(function (key) {
          var row = result[key];
          notifications[notificationArrayDim] = row.NotificationJSON;
          notificationArrayDim++;
        });
        callback(null, notifications);
      }
    });
    connection.end();
  } catch (err) {
    callback(err, null);
  }
}

function saveUserActivity(UserID, Type, DateTime, callback) {
  try {
    if (UserID === undefined || Type === undefined || DateTime === undefined)
      callback(new ParamError('Incorrect Parameter!'), null);
    var connection = mysql.createConnection(dbParam);
    connection.connect(function (err) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: Connected to DB!");
    });

    var sql = "insert into 1001db.UsersActivities(UserID, Type, DateTime)\n" +
      "values (" + UserID + ",'" + Type + "','" + DateTime + "')";
    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: An activities for User " + UserID + " inserted");
    });

    connection.end();
  } catch (err) {
    callback(err, null);
  }
}


function getChallengeResult(ChallengeID, callback) {
  try {
    if (ChallengeID === undefined)
      callback(new ParamError('Incorrect Parameter!'), null);
    var connection = mysql.createConnection(dbParam);
    connection.connect(function (err) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: Connected to DB!");
    });

    var sql = "select * from 1001db.ChallengeResults where ChallengeID = " + ChallengeID;
    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      var challengeresult = new Array();
      var dim = 0;
      Object.keys(result).forEach(function (key) {
        var row = result[key];
        challengeresult[dim] = new challengeResultClass.ChallengeResult(row.PlayerID, row.QuestionID, row.ChallengeID, row.XP, row.TimeInSec, row.Status)
        challengeresult[dim].setID = row.ID;
        dim++;
      });
      callback(null, challengeresult);
    });

    connection.end();
  } catch (err) {
    callback(err, null);
  }
}

function saveChallengeResult(challengeResult, callback) {
  try {
    if (!(challengeResult instanceof challengeResultClass.ChallengeResult))
      callback(new ParamError('Incorrect Parameter!'), null);
    var connection = mysql.createConnection(dbParam);
    connection.connect(function (err) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: Connected to DB!");
    });

    var sql = "insert into 1001db.ChallengeResults(PlayerID, QuestionID, ChallengeID, XP, TimeInSec, Status)\n" +
      "values (" + challengeResult.getPlayerID + "," + challengeResult.getQuestionID + "," + challengeResult.getChallengeID + "," + challengeResult.getXP + "," + challengeResult.getTimeInSec + ",'" + challengeResult.getStatus + "')";
    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: A result for User " + challengeResult.getPlayerID + " inserted");
    });

    connection.end();
  } catch (err) {
    callback(err, null);
  }
}

function updateChallengeResult(challengeResult, callback) {
  try {
    if (!(challengeResult instanceof challengeResultClass.ChallengeResult))
      callback(new ParamError('Incorrect Parameter!'), null);
    var connection = mysql.createConnection(dbParam);
    connection.connect(function (err) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: Connected to DB!");
    });

    var sql = "update 1001db.ChallengeResults\n" +
      "set Status = '" + challengeResult.getStatus + "',\n" +
      " TimeInSec = " + challengeResult.getTimeInSec + ",\n" +
      " XP = " + challengeResult.getXP + "\n" +
      "where PlayerID = " + challengeResult.getPlayerID + "\n" +
      "and QuestionID = " + challengeResult.getQuestionID + "\n" +
      "and ChallengeID = " + challengeResult.getChallengeID;
    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: A result for User " + challengeResult.getPlayerID + " updated");
    });

    connection.end();
  } catch (err) {
    callback(err, null);
  }
}

function getWaitingChallengeCounter(UserID, callback) {
  try {
    if (UserID === undefined)
      callback(new ParamError('Incorrect Parameter!'), null);
    var connection = mysql.createConnection(dbParam);
    connection.connect(function (err) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: Connected to DB!");
    });
    var sql = "select COUNT(*) as Counter\n" +
      "from 1001db.Challenge C\n" +
      "where SenderProposal_ID = " + UserID + "\n" +
      "and C.Status = 'WaitingOtherPlayer'";
    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      var counter = 0;
      Object.keys(result).forEach(function (key) {
        var row = result[key];
        counter = row.Counter;
      });

      callback(null, counter);
    });

    connection.end();
  } catch (err) {
    callback(err, null);
  }

}

function getPlayingChallenge(UserID, callback) {
  try {
    if (UserID === undefined)
      callback(new ParamError('Incorrect Parameter!'), null);
    var connection = mysql.createConnection(dbParam);
    connection.connect(function (err) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: Connected to DB!");
    });
    var sql = "select * "+
    " from 1001db.Challenge"+
    " where (SenderProposal_ID = " + UserID + " or ReceiverProposal_ID = " + UserID + ")  and Status = 'Playing'";
    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      var challenge = new Array();
      var challengeDim = 0;
      Object.keys(result).forEach(function (key) {
        var row = result[key];
        challenge[challengeDim] = new challengeClass.Challenge(row.SenderProposal_ID, row.ReceiverProposal_ID, row.Status);
        challenge[challengeDim].setID = row.ID;
        challenge[challengeDim].setDatetime = row.Datetime;
        challengeDim++;
      });

      callback(null, challenge);
    });

    connection.end();
  } catch (err) {
    callback(err, null);
  }
}



function getWaitingChallenge(UserID, callback) {
  try {
    if (UserID === undefined)
      callback(new ParamError('Incorrect Parameter!'), null);
    var connection = mysql.createConnection(dbParam);
    connection.connect(function (err) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: Connected to DB!");
    });
    var sql = "select C.ID, C.SenderProposal_ID, C.ReceiverProposal_ID, C.Status, C.Datetime, CQ.Topics_ID\n" +
      "from 1001db.Challenge C,1001db.ChallengeResults CR, 1001db.ChallengeQuestions CQ\n" +
      "where C.ID=CR.ChallengeID\n" +
      "and CR.QuestionID=CQ.ID\n" +
      "and (C.ReceiverProposal_ID = " + UserID  +" or C.SenderProposal_ID = " + UserID +")\n" +
      "and C.Status = '" + challengeClass.ChallengeStatus.WaitingOtherPlayer + "'\n" +
      "group by C.ID";
    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      var challenge = new Array();
      var challengeDim = 0;
      Object.keys(result).forEach(function (key) {
        var row = result[key];
        challenge[challengeDim] = new challengeClass.Challenge(row.SenderProposal_ID, row.ReceiverProposal_ID, row.Status);
        challenge[challengeDim].setID = row.ID;
        challenge[challengeDim].setDatetime = row.Datetime;
        challenge[challengeDim].setTopicID = row.Topics_ID;
        challengeDim++;
      });

      callback(null, challenge);
    });

    connection.end();
  } catch (err) {
    callback(err, null);
  }
}

function getAllChallengesResults(UserID, callback) {
  try {
    if (UserID === undefined)
      callback(new ParamError('Incorrect Parameter!'), null);
    var connection = mysql.createConnection(dbParam);
    connection.connect(function (err) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: Connected to DB!");
    });
    var sql = "select  C.ID, TopicName, C.ReceiverProposal_ID as Opponent, sum(CR.XP) as MYXP, IF(sum(CR.XP)>sum(OpponentTable.OpponentXPs),'true','false') as Win\n" +
      " from 1001db.Challenge C, 1001db.ChallengeResults CR, 1001db.ChallengeQuestions CQ, 1001db.Topics T, (\n" +
      "select ReceiverProposal_ID, sum(XP) as OpponentXPs, ChallengeID\n" +
      " from 1001db.Challenge C, 1001db.ChallengeResults CR\n" +
      " where C.ID = CR.ChallengeID and ReceiverProposal_ID = PlayerID and C.Status = 'Finished'\n" +
      " group by ReceiverProposal_ID\n" +
      ") as OpponentTable\n" +
      "where C.SenderProposal_ID = " + UserID + "\n" +
      "and C.SenderProposal_ID = PlayerID\n" +
      "and CQ.ID = CR.QuestionID\n" +
      " and T.ID = CQ.Topics_ID\nand C.Status = 'Finished'\n" +
      " and OpponentTable.ChallengeID = C.ID\n" +
      "and OpponentTable.ReceiverProposal_ID = C.ReceiverProposal_ID\n" +
      "group by C.ID, PlayerID\n" +
      "UNION\n" +
      "select  C.ID, TopicName, C.SenderProposal_ID, sum(CR.XP) as MYXP, IF(sum(CR.XP)>sum(OpponentTable.OpponentXPs),'true','false') as Win\n" +
      "from 1001db.Challenge C, 1001db.ChallengeResults CR, 1001db.ChallengeQuestions CQ, 1001db.Topics T, (\n" +
      "select SenderProposal_ID, sum(XP) as OpponentXPs, ChallengeID\n" +
      "from 1001db.Challenge C, 1001db.ChallengeResults CR\n" +
      " where C.ID = CR.ChallengeID and SenderProposal_ID = PlayerID and C.Status = 'Finished'\n" +
      " group by SenderProposal_ID\n" +
      ") as OpponentTable\n" +
      "where C.ReceiverProposal_ID = " + UserID + "\n" +
      "and C.ReceiverProposal_ID = PlayerID\nand C.Status = 'Finished'\n" +
      "and CQ.ID = CR.QuestionID\n" +
      "and T.ID = CQ.Topics_ID\n" +
      "and OpponentTable.ChallengeID = C.ID\n" +
      "and OpponentTable.SenderProposal_ID = C.SenderProposal_ID\n" +
      "group by C.ID, PlayerID;"
    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      var challengeInfo = new Array();
      var challengeInfoDim = 0;
      Object.keys(result).forEach(function (key) {
        var row = result[key];
        challengeInfo[challengeInfoDim] = {
          ID: row.ID, TopicName: row.TopicName, Opponent: row.Opponent, MYXP: row.MYXP, Win: row.Win
        };
        challengeInfoDim++;
      });
      callback(null, challengeInfo);
    });

    connection.end();
  } catch (err) {
    callback(err, null);
  }
}

function saveIndustry(Name, callback) {
  try {
    if (Name === undefined)
      callback(new ParamError('Incorrect Parameter!'), null);
    var connection = mysql.createConnection(dbParam);
    connection.connect(function (err) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: Connected to DB!");
    });
    var sql = "insert into 1001db.Industries(Name)" +
      " values('" + Name + "')";
    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: New Industry with ID = " + result.insertId + " inserted.");
      var id = result.insertId;
      callback(null, id);

    });
    connection.end();
  } catch (err) {
    callback(err, null);
  }
}

function getAllIndustries(callback){
  try {
    var connection = mysql.createConnection(dbParam);
    connection.connect(function (err) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: Connected to DB!");
    });
    var sql = "select * " +
      "from 1001db.Industries";
    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      else {
        var industriesArrayDim = 0;
        var industries = new Array();
        Object.keys(result).forEach(function (key) {
          var row = result[key];
          industries[industriesArrayDim] = {
            ID: row.ID,
            Name: row.Name
          }
          industriesArrayDim++;
        });
        callback(null, industries);
      }
    });
    connection.end();
  } catch (err) {
    callback(err, null);
  }
}

function getAllCompanyTypes(callback){
  try {
    var connection = mysql.createConnection(dbParam);
    connection.connect(function (err) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: Connected to DB!");
    });
    var sql = "select * " +
      "from 1001db.CompanyTypes";
    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      else {
        var typesArrayDim = 0;
        var types = new Array();
        Object.keys(result).forEach(function (key) {
          var row = result[key];
          types[typesArrayDim] = {
            ID: row.ID,
            Name: row.Name
          }
          typesArrayDim++;
        });
        callback(null, types);
      }
    });
    connection.end();
  } catch (err) {
    callback(err, null);
  }
}

function getAllCompanySizes(callback){
  try {
    var connection = mysql.createConnection(dbParam);
    connection.connect(function (err) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: Connected to DB!");
    });
    var sql = "select * " +
      "from 1001db.CompanySizes";
    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      else {
        var sizesArrayDim = 0;
        var Sizes = new Array();
        Object.keys(result).forEach(function (key) {
          var row = result[key];
          Sizes[sizesArrayDim] = {
            ID: row.ID,
            Quantity: row.Quantity
          }
          sizesArrayDim++;
        });
        callback(null, Sizes);
      }
    });
    connection.end();
  } catch (err) {
    callback(err, null);
  }
}

function saveCompany(company, callback) {
  try {
    if (!company instanceof companyClass.Company) {
      callback(new ParamError("Incorrect parameter!"), null);
    }
    var connection = mysql.createConnection(dbParam);
    connection.connect(function (err) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: Connected to DB!");
    });
    if (company.getLogoPath === undefined)
      var sql = "insert into 1001db.Companies(Name, WebSiteURL, LinkedinProfileURL, Industries_ID, CompanyTypes_ID, CompanySizes_ID)\n" +
        " values ('" + company.getName + "','" + company.getWebSiteURL + "','" + company.getLinkedinProfileURL + "'," + company.getIndustry + "," + company.getCompanyType + "," + company.getCompanySize + ")";
    else
      var sql = "insert into 1001db.Companies(Name, WebSiteURL, LinkedinProfileURL, Logo_path, Industries_ID, CompanyTypes_ID, CompanySizes_ID)\n" +
        " values ('" + company.getName + "','" + company.getWebSiteURL + "','" + company.getLinkedinProfileURL + "','" + companyClass.getLogoPath + "'," + company.getIndustry + "," + company.getCompanyType + "," + company.getCompanySize + ")";

    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: New Company with ID = " + result.insertId + " inserted ");
      var id = result.insertId;
      callback(null, id);
    });

    connection.end();
  } catch (err) {
    callback(err, null);
  }
}
function getChallengeByID(ID, callback) {
  try {
    if (ID === undefined)
      callback(new ParamError('Incorrect Parameter!'), null);
    var connection = mysql.createConnection(dbParam);
    connection.connect(function (err) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: Connected to DB!");
    });
    var sql = "select *\n" +
      "from 1001db.Challenge\n"+
      "where ID = " + ID;
    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      var challenge;
      Object.keys(result).forEach(function (key) {
        var row = result[key];
        challenge = new challengeClass.Challenge(row.SenderProposal_ID, row.ReceiverProposal_ID, row.Status);
        challenge.setID = row.ID;
        challenge.setDatetime = row.Datetime;
      });

      callback(null, challenge);
    });

    connection.end();
  } catch (err) {
    callback(err, null);
  }
}

function IsChallengeOnFinished(ID, callback) {
  try {
    if (ID === undefined)
      callback(new ParamError('Incorrect Parameter!'), null);
    var connection = mysql.createConnection(dbParam);
    connection.connect(function (err) {
      if (err) callback(err, null);
      console.log("[" + Date(Date.now()).toString() + "] - " + "[PersistenceManager]: Connected to DB!");
    });
    var sql = "select C.ID, COUNT(*) as Finished\n"+
    "from 1001db.Challenge C JOIN 1001db.ChallengeResults CR ON (CR.ChallengeID = C.ID)\n"+
    "where (C.SenderProposal_ID = PlayerID or C.ReceiverProposal_ID = PlayerID)\n"+
    "and C.ID = " + ID + "\n"+
    "and CR.Status = 'Answered'";
    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      var result;
      Object.keys(result).forEach(function (key) {
        var row = result[key];
        result = row.Finished;
      });

      callback(null, result);
    });

    connection.end();
  } catch (err) {
    callback(err, null);
  }
}

exports.getUser = getUser;
exports.updateUser = updateUser;
exports.saveUser = saveUser;
exports.deleteUser = deleteUser;
exports.saveMessage = saveMessage;
exports.deleteMessage = deleteMessage;
exports.getMessages = getMessages;
exports.getAllMessages = getAllMessages;
exports.saveTopic = saveTopic;
exports.deleteTopic = deleteTopic;
exports.saveChallengeQuestion = saveChallengeQuestion;
exports.deleteChallengeQuestion = deleteChallengeQuestion;
exports.getAllTopics = getAllTopics;
exports.getKey = getKey;
exports.getLeaderBoard = getLeaderBoard;
exports.isThereASlot = isThereASlot;
exports.saveChallenge = saveChallenge;
exports.deleteChallenge = deleteChallenge;
exports.getRandomQuestions = getRandomQuestions;
exports.saveTypeInformations = saveTypeInformations;
exports.deleteTypeInformations = deleteTypeInformations;
exports.getTypeInformationsID = getTypeInformationsID;
exports.addQuestionTypeInformations = addQuestionTypeInformations;
exports.savePendingNotification = savePendingNotification;
exports.deletePendingNotification = deletePendingNotification;
exports.getPendingNotifications = getPendingNotifications;
exports.getRivals = getRivals;
exports.saveUserActivity = saveUserActivity;
exports.saveChallengeResult = saveChallengeResult;
exports.getTopicID = getTopicID;
exports.updateChallenge = updateChallenge;
exports.getChallengeResult = getChallengeResult;
exports.updateChallengeResult = updateChallengeResult;
exports.getWaitingChallenge = getWaitingChallenge;
exports.getAllChallengesResults = getAllChallengesResults;
exports.getQuestionsByChallengeID = getQuestionsByChallengeID;
exports.saveCompany = saveCompany;
exports.saveIndustry = saveIndustry;
exports.addDATETIMEtoChallenge = addDATETIMEtoChallenge;
exports.getWaitingChallengeCounter = getWaitingChallengeCounter;
exports.getAllCompanySizes = getAllCompanySizes;
exports.getAllCompanyTypes = getAllCompanyTypes;
exports.getAllIndustries = getAllIndustries;
exports.getPlayingChallenge=getPlayingChallenge;
exports.getChallengeByID=getChallengeByID;
exports.IsChallengeOnFinished = IsChallengeOnFinished;