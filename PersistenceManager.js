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
      console.log("[PersistenceManager]: Connected to DB!");
    });
    var sql = "insert into 1001db.Users(Firstname, Lastname, University) values	('" +
      user.getFirstname + "','" + user.getLastname + "','" + user.getUniversity + "')";

    connection.query(sql, function (err, result) {
      if (err) callback(err, null);;
      console.log("[PersistenceManager]: New User with ID = " + result.insertId + " inserted.");
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
      console.log("[PersistenceManager]: Connected to DB!");
    });

    var sql = "delete from 1001db.Users where ID = '" + ID + "'";
    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      console.log("[PersistenceManager]: A User with ID = " + ID + " deleted.");

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
      console.log("[PersistenceManager]: Connected to DB!");
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
      console.log("[PersistenceManager]: Connected to DB!");
    });

    var sql = "UPDATE 1001DB.Users SET Firstname = '" + user.getFirstname + "'," +
      "Lastname = '" + user.getLastname + "'," +
      "University = '" + user.getUniversity + "'" +
      " WHERE ID = " + user.getID;
    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      console.log("[PersistenceManager]: 1 record updated");
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
      console.log("[PersistenceManager]: Connected to DB!");
    });

    var sql = "insert into 1001db.Messages(SenderUser_ID, ReceiverUser_ID, Text, DateTime)" +
      " values ('" + message.getSenderUserID + "','" + message.getReceiverUserID + "','" + message.getText + "','" + message.getDateTime + "')";

    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      console.log("[PersistenceManager]: New message with ID = " + result.insertId + " inserted");
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
      console.log("[PersistenceManager]: Connected to DB!");
    });

    var sql = "delete from 1001db.Messages where SenderUser_ID = " + message.getSenderUserID + " and ReceiverUser_ID = " + message.getReceiverUserID + " and DateTime = '" + message.getDateTime + "'";
    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      console.log("[PersistenceManager]: A message deleted");
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
      console.log("[PersistenceManager]: Connected to DB!");
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
      console.log("[PersistenceManager]: Connected to DB!");
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

/* function saveKey(key, callback) {
  try {
    var connection = mysql.createConnection(dbParam);
    connection.connect(function (err) {
      if (err) callback(err, null);
      console.log("[PersistenceManager]: Connected to DB!");
    });
    var sql = "insert into 1001db.ExecutionTable values ('" + key + "')";
    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      console.log("[PersistenceManager]: Key inserted");
    });

    connection.end();
  } catch (err) {
    callback(err, null);
  }
}

function deleteKey(key, callback) {
  var connection = mysql.createConnection(dbParam);
  connection.connect(function (err) {
    if (err) callback(err, null);
    console.log("[PersistenceManager]: Connected to DB!");
  });
  var sql = "delete from 1001db.ExecutionTable where 1001db.ExecutionTable.KEY = '" + key + "'";
  connection.query(sql, function (err, result) {
    if (err) callback(err, null);
    console.log("[PersistenceManager]: Key deleted");
  });

  connection.end();
} */

function getKey(callback) {
  var connection = mysql.createConnection(dbParam);
  connection.connect(function (err) {
    if (err) callback(err, null);
    console.log("[PersistenceManager]: Connected to DB!");
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
      console.log("[PersistenceManager]: Connected to DB!");
    });

    var sql = "insert into 1001db.Topics(TopicName)" +
      " values ('" + topic.getTopicsName + "')";

    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      console.log("[PersistenceManager]: New topic with ID = " + result.insertId + " inserted");
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
      console.log("[PersistenceManager]: Connected to DB!");
    });
    var sql = "delete from 1001db.Topics " +
      "where ID in (select ID from (SELECT * FROM 1001db.Topics) as T2 where TopicName = '" + topicName + "')";
    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      console.log("[PersistenceManager]: 1 record deleted");
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
      console.log("[PersistenceManager]: Connected to DB!");
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
      console.log("[PersistenceManager]: Connected to DB!");
    });
    var sql = "select ID " +
      "from 1001db.Topics where TopicName = " + topic;
    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      else {
        var topicID;
        Object.keys(result).forEach(function (key) {
          var row = result[key];
          topicID = row.ID;
        });
        callback(null, topic);
      }
    });
    connection.end();
  } catch (err) {
    callback(err, null);
  }
}

function saveChallengeQuestion(question, callback) {
  try {
    if (!question instanceof questionClass.ChallengeQuestion) {
      callback(new ParamError("Incorrect parameter!"), null);
    }
    var connection = mysql.createConnection(dbParam);
    connection.connect(function (err) {
      if (err) callback(err, null);
      console.log("[PersistenceManager]: Connected to DB!");
    });
    if (question.getExplanation === undefined)
      var sql = "insert into 1001db.ChallengeQuestions(QuestionText, Answer_A, Answer_B, Answer_C, Answer_D, XPValue, Topics_ID)" +
        " values ('" + question.getQuestionText + "','" + question.getAnswer_A + "','" + question.getAnswer_B + "','" + question.getAnswer_C + "','" + question.getAnswer_D + "'," + question.getXPValue + "," + question.getTopic_ID + ")";
    else
      var sql = "insert into 1001db.ChallengeQuestions(QuestionText, Answer_A, Answer_B, Answer_C, Answer_D, XPValue, Topics_ID, Explanation)" +
        " values ('" + question.getQuestionText + "','" + question.getAnswer_A + "','" + question.getAnswer_B + "','" + question.getAnswer_C + "','" + question.getAnswer_D + "'," + question.getXPValue + "," + question.getTopic_ID + ",'" + question.getExplanation + "')";

    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      console.log("[PersistenceManager]: New question with ID = " + result.insertId + " inserted");
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
      console.log("[PersistenceManager]: Connected to DB!");
    });
    var sql = "delete from 1001db.ChallengeQuestions where ID = " + questionID;
    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      console.log("[PersistenceManager]: A question deleted");
    });

    connection.end();
  } catch (err) {
    callback(err, null);
  }
}

function saveAccumulatedPoints(UserID, TopicID, XP, callback) {
  try {
    if (UserID === undefined || TopicID === undefined || XP === undefined)
      callback(new ParamError('Incorrect Parameter!'), null);
    var connection = mysql.createConnection(dbParam);
    connection.connect(function (err) {
      if (err) callback(err, null);
      console.log("[PersistenceManager]: Connected to DB!");
    });
    var sql = "insert into 1001db.AccumulatedPoints(User_ID, Topic_ID, XP)" +
      " values (" + UserID + "," + TopicID + "," + XP + ")";
    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      console.log("[PersistenceManager]: Points of UserID " + UserID + " inserted");
    });

    connection.end();
  } catch (err) {
    callback(err, null);
  }
}

function deleteAccumulatedPoints(UserID, TopicID, callback) {
  try {
    if (UserID === undefined || TopicID === undefined)
      callback(new ParamError('Incorrect Parameter!'), null);
    var connection = mysql.createConnection(dbParam);
    connection.connect(function (err) {
      if (err) callback(err, null);
      console.log("[PersistenceManager]: Connected to DB!");
    });
    var sql = "delete from 1001db.AccumulatedPoints where  User_ID = " + UserID + " and Topic_ID = " + TopicID;
    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      console.log("[PersistenceManager]: Points of UserID " + UserID + " deleted");
    });

    connection.end();
  } catch (err) {
    callback(err, null);
  }
}

function getUserTopicPoints(UserID, TopicID, callback) {
  try {
    if (UserID === undefined || TopicID === undefined)
      callback(new ParamError('Incorrect Parameter!'), null);
    var connection = mysql.createConnection(dbParam);
    connection.connect(function (err) {
      if (err) callback(err, null);
      console.log("[PersistenceManager]: Connected to DB!");
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
  } catch (err) {
    callback(err, null);
  }
}

function updateAccumulatedPoints(UserID, TopicID, XP, callback) {
  try {
    if (UserID === undefined || TopicID === undefined || XP === undefined)
      callback(new ParamError('Incorrect Parameter!'), null);
    var connection = mysql.createConnection(dbParam);
    connection.connect(function (err) {
      if (err) callback(err, null);
      console.log("[PersistenceManager]: Connected to DB!");
    });
    var sql = "update 1001db.AccumulatedPoints " +
      "set XP = " + XP + " " +
      " where User_ID = " + UserID +
      " and Topic_ID = " + TopicID;
    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      console.log("[PersistenceManager]: Points of UserID " + UserID + " updated");
      callback(null)
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
      console.log("[PersistenceManager]: Connected to DB!");
    });
    var sql = "select U.ID, Firstname, Lastname, University, sum(XP) AS SUMXPs\n" +
      "from 1001db.Topics T, 1001db.Users U, 1001db.AccumulatedPoints P\n" +
      "where T.ID=P.Topic_ID\n" +
      "and  U.ID=P.User_ID\n" +
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
      console.log("[PersistenceManager]: Connected to DB!");
    });
    var sql = "select U.ID, Firstname, Lastname, University, sum(XP) AS SUMXPs\n" +
      "from 1001db.Topics T, 1001db.Users U, 1001db.AccumulatedPoints P\n" +
      "where T.ID=P.Topic_ID\n" +
      "and  U.ID=P.User_ID\n" +
      "and U.ID <> " + ID + "\n" +
      "group by U.ID\n" +
      "order by sum(XP) DESC";
    console.log(sql)
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
  } catch (err) {
    callback(err, null);
  }
}

function getRandomPlayer(ID, callback) {
  try {
    if (ID === undefined)
      callback(new ParamError('Incorrect Parameter!'), null);
    var connection = mysql.createConnection(dbParam);
    connection.connect(function (err) {
      if (err) callback(err, null);
      console.log("[PersistenceManager]: Connected to DB!");
    });
    var sql = "select ID\n" +
      "from 1001db.Users\n" +
      "where ID not in (select SenderProposal_ID\n" +
      "from 1001db.challenge)\n" +
      "and ID not in (select ReceiverProposal_ID\n" +
      "from 1001db.challenge)\n" +
      "and ID <> " + ID + "\n" +
      "order by RAND()\n" +
      "limit 1\n"

    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
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
      console.log("[PersistenceManager]: Connected to DB!");
    });
    var sql = "insert into 1001db.Challenge(SenderProposal_ID, ReceiverProposal_ID, Status)"+ 
    " values(" + challenge.getSender + "," + challenge.getReceiver + ",'" +  challenge.getStatus + "')";

    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      console.log("[PersistenceManager]: New Challenge with ID = " + result.insertId + " inserted.");
      var id = result.insertId;
      callback(err, id);

    });
    connection.end();
  } catch (err) {
    callback(err, null);
  }
}

function updateChallenge(challenge, callback){
  try {
    if (!challenge instanceof challengeClass.Challenge)
      callback(new ParamError('Incorrect Parameter!'), null);
    var connection = mysql.createConnection(dbParam);
    connection.connect(function (err) {
      if (err) callback(err, null);
      console.log("[PersistenceManager]: Connected to DB!");
    });
    var sql = "update 1001db.Challenge"+ 
    " Set Status = '" + challenge.getStatus + "' where ID = " + challenge.getID;

    connection.query(sql, function (err, result) {
      if (err) callback(err, null);;
      console.log("[PersistenceManager]: New Challenge updated.");
      var id = result.insertId;
      callback(err, id);

    });
    connection.end();
  } catch (err) {
    callback(err, null);
  }
}

function isPlaying(ID, callback) {
  try {
    if (ID === undefined)
      callback(new ParamError('Incorrect Parameter!'), null);
    var connection = mysql.createConnection(dbParam);
    connection.connect(function (err) {
      if (err) callback(err, null);
      console.log("[PersistenceManager]: Connected to DB!");
    });
    var sql = "select * from 1001db.Challenge where Status = 'Playing' and (SenderProposal_ID = " + ID + " or ReceiverProposal_ID = " + ID +")";
    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      else {
        if (Object.keys(result).length == 0)
          callback(err, null);
        else
          callback(err, result);
      }
    });
    connection.end();
  } catch (err) {
    callback(err, null);
  }
}

/* function getChallenge(ID, callback) {
  if (ID === undefined)
    callback(new ParamError('Incorrect Parameter!'), null);
  var connection = mysql.createConnection(dbParam);
  connection.connect(function (err) {
    if (err) callback(err, null);
    console.log("[PersistenceManager]: Connected to DB!");
  });
  var sql = "select * from 1001db.challenge where ID = " + ID;
  connection.query(sql, function (err, result) {
    if (err) callback(err, null);
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

} */

function deleteChallenge(ID, callback) {
  try {
    if (ID === undefined)
      callback(new ParamError('Incorrect Parameter!'), null);
    var connection = mysql.createConnection(dbParam);
    connection.connect(function (err) {
      if (err) callback(err, null);
      console.log("[PersistenceManager]: Connected to DB!");
    });
    var sql = "delete from 1001db.Challenge where  ID = " + ID;
    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      console.log("[PersistenceManager]: A challenge with ID = " + ID + " deleted");
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
      console.log("[PersistenceManager]: Connected to DB!");
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
    if (questionID === undefined || typeID == undefined)
      callback(new ParamError('Incorrect Parameter!'), null);
    var connection = mysql.createConnection(dbParam);
    connection.connect(function (err) {
      if (err) callback(err, null);
      console.log("[PersistenceManager]: Connected to DB!");
    });
    var sql = "insert into 1001db.QuestionTypeInformation(ChallengeQuestions_ID, TypeInformations_ID)\n" +
      "values(" + questionID + "," + typeID + ")";
    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      console.log("[PersistenceManager]: A QuestionTypeInformation inserted");
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
      console.log("[PersistenceManager]: Connected to DB!");
    });
    var sql = "insert into 1001db.TypeInformations(Type, TimeInSec) values('" + type + "'," + timeInSec + ")";
    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      console.log("[PersistenceManager]: A Type inserted");
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
      console.log("[PersistenceManager]: Connected to DB!");
    });
    var sql = "delete from 1001db.TypeInformations where  ID = " + ID;
    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      console.log("[PersistenceManager]: A Type deleted");
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
      console.log("[PersistenceManager]: Connected to DB!");
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
      console.log("[PersistenceManager]: Connected to DB!");
    });

    var sql = "insert into 1001db.PendingNotifications(UserID, NotificationJSON)\n" +
      "values (" + UserID + ",'" + NotificationJSON + "')";
    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      console.log("[PersistenceManager]: A pending notification for User " + UserID + " inserted");
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
      console.log("[PersistenceManager]: Connected to DB!");
    });
    var sql = "delete from 1001db.PendingNotifications where  UserID = " + ID;
    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      console.log("[PersistenceManager]: A pending notification deleted");
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
      console.log("[PersistenceManager]: Connected to DB!");
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
      console.log("[PersistenceManager]: Connected to DB!");
    });

    var sql = "insert into 1001db.UsersActivities(UserID, Type, DateTime)\n" +
      "values (" + UserID + ",'" + Type + "','" + DateTime + "')";
    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      console.log("[PersistenceManager]: An activities for User " + UserID + " inserted");
    });

    connection.end();
  } catch (err) {
    callback(err, null);
  }
}

function getChallengeResult(ChallengeID,callback){
  try {
    if (ChallengeID === undefined)
      callback(new ParamError('Incorrect Parameter!'), null);
    var connection = mysql.createConnection(dbParam);
    connection.connect(function (err) {
      if (err) callback(err, null);
      console.log("[PersistenceManager]: Connected to DB!");
    });

    var sql = "select * from 1001db.ChallengeResults";
    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      var challengeresult;
      Object.keys(result).forEach(function (key) {
        var row = result[key];
        challengeresult = {
          PlayerID : row.PlayerID, 
          QuestionID : row.QuestionID, 
          ChallengeID : row.ChallengeID
        }
      });
      callback(null, challengeresult);
    });

    connection.end();
  } catch (err) {
    callback(err, null);
  }
}

function saveChallengeResult(UserID, QuestionID, ChallengeID, callback) {
  try {
    if (UserID === undefined || QuestionID === undefined || ChallengeID === undefined)
      callback(new ParamError('Incorrect Parameter!'), null);
    var connection = mysql.createConnection(dbParam);
    connection.connect(function (err) {
      if (err) callback(err, null);
      console.log("[PersistenceManager]: Connected to DB!");
    });

    var sql = "insert into 1001db.ChallengeResults(PlayerID, QuestionID, ChallengeID)\n" +
      "values (" + UserID + "," + QuestionID + "," + ChallengeID + ")";
    connection.query(sql, function (err, result) {
      if (err) callback(err, null);
      console.log("[PersistenceManager]: A result for User " + UserID + " inserted");
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
//exports.saveKey = saveKey;
exports.saveTopic = saveTopic;
//exports.deleteKey = deleteKey;
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
exports.savePendingNotification = savePendingNotification;
exports.deletePendingNotification = deletePendingNotification;
exports.getPendingNotifications = getPendingNotifications;
exports.getRivals = getRivals;
exports.saveUserActivity = saveUserActivity;
exports.saveChallengeResult = saveChallengeResult;
exports.getTopicID = getTopicID;
exports.updateChallenge = updateChallenge;
exports.getChallengeResult = getChallengeResult;