const pm = require('../persistence/PersistenceManager');
const userClass = require('../model/User');
const messageClass = require('../model/Message');
const topicClass = require('../model/Topic');
const questionClass = require('../model/ChallengeQuestion');
const challengeClass = require('../model/Challenge');
const EventEmitter = require('events').EventEmitter;
const extractionQuestionsFactory = require('./RandomQuestionAlgorithmFactory');
const challengeResultClass = require('../model/ChallengeResult');



const users = new Map();

var eventRequest = new EventEmitter();
var errorJSON = {
    error: ""
};
var allRightJSON = {
    response: "It's all right!"
}
var response;

function sendIfPossibleOrSaveNotification(ID, notification) {
    var UserID = parseInt(ID, 10);
    if (users.has(UserID))
        users.get(UserID).send(notification);
    else
        pm.savePendingNotification(UserID, notification, (err, result) => {
            if (err) throw err;
        });
}

function notificationCheck(UserID, ws) {
    try {
        pm.getPendingNotifications(UserID, function (err, notifications) {
            if (err) throw err;
            else {
                if (notifications != "") {
                    notifications.forEach(element => {
                        ws.send(element);
                    });
                }
                else
                    console.log("[" + Date(Date.now()).toString() + "] - " + "[Controller]: There aren't notifications for user " + UserID);
            }
        });
        pm.deletePendingNotification(UserID, (err, result) => {
            if (err) throw err;
        });
    } catch (err) {
        errorJSON.error = 'Input error or interaction with the database';
        response = JSON.stringify(errorJSON);
        ws.send(response);
    }
}

eventRequest.on('saveUser', function (req, res) {
    try {
        pm.getKey(function (err, key) {
            if (key === req.key) {
                pm.saveUser(new userClass.User(req.User.Firstname, req.User.Lastname, req.User.University), function (err, id) {
                    response = JSON.stringify({
                        UserID: id
                    });
                    res.end(response);
                });

            }
            else {
                errorJSON.error = "key does not coincide";
                response = JSON.stringify(errorJSON);
                res.end(response);
            }

        });
    } catch (err) {
        errorJSON.error = 'Input error or interaction with the database';
        response = JSON.stringify(errorJSON);
        res.end(response);
    }
});

eventRequest.on('login', function (req, ws) {
    try {
        pm.getKey(function (err, key) {
            if (key === req.key) {
                pm.getUser(req.UserID, function (err, user) {
                    if (err == null) {
                        if (user == null) {
                            errorJSON.error = "Incorrect parameter";
                            response = JSON.stringify(errorJSON);
                            ws.send(response);
                        }
                        else {
                            response = JSON.stringify(user);
                            // if (!users.has(req.UserID)) {
                            users.set(parseInt(req.UserID, 10), ws);
                            console.log("[" + Date(Date.now()).toString() + "] - " + "[Controller]: WebSocket for User " + req.UserID + " saved!");
                            //}
                            pm.saveUserActivity(req.UserID, 'Access', new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''), (err, result) => {
                                if (err) throw err;
                            });
                            ws.send(response);
                            notificationCheck(req.UserID, ws);
                        }
                    }
                    else {
                        errorJSON.error = 'Input error or interaction with the database';
                        response = JSON.stringify(errorJSON);
                        ws.send(response);
                    }

                });
            }
            else {
                errorJSON.error = 'Input error or interaction with the database';
                response = JSON.stringify(errorJSON);
                ws.send(response);
            }

        });

    } catch (err) {
        errorJSON.error = 'Input error or interaction with the database';
        response = JSON.stringify(errorJSON);
        ws.send(response);
    }
});

eventRequest.on('deleteUser', function (req, res) {

    try {
        pm.deleteUser(req.UserID, (err, result) => {
            if (err) throw err;
        });
        res.end(JSON.stringify(allRightJSON));
    } catch (err) {
        errorJSON.error = err.message;
        response = JSON.stringify(errorJSON);
        res.end(response);
    }
});

eventRequest.on('sendMessage', function (req, res) {
    try {
        var message = new messageClass.Message(req.Message.SenderUser_ID, req.Message.ReceiverUser_ID, req.Message.Text, req.Message.DateTime);
        pm.saveMessage(message, (err, result) => {
            if (err) throw err;
        });
        sendIfPossibleOrSaveNotification(req.Message.ReceiverUser_ID, JSON.stringify(message));
        res.end(JSON.stringify(allRightJSON));
    } catch (err) {
        errorJSON.error = 'Input error or interaction with the database';
        response = JSON.stringify(errorJSON);
        res.end(response);
    }
});

eventRequest.on('deleteMessage', function (req, res) {
    try {
        pm.deleteMessage(new messageClass.Message(req.Message.SenderUser_ID, req.Message.ReceiverUser_ID, req.Message.Text, req.Message.DateTime), (err, result) => {
            if (err) throw err;
        });
        res.end(JSON.stringify(allRightJSON));
    } catch (err) {
        errorJSON.error = 'Input error or interaction with the database';
        response = JSON.stringify(errorJSON);
        res.end(response);
    }
});

eventRequest.on('getMessages', function (req, res) {
    try {
        pm.getMessages(req.Message.SenderUser_ID, req.Message.ReceiverUser_ID, req.limit, function (err, messages) {
            if (err == null) {
                if (messages == null) {
                    errorJSON.error = "Incorrect username and/or password";
                    response = JSON.stringify(errorJSON);
                }
                else
                    response = JSON.stringify(messages);
            }
            else {
                errorJSON.error = 'Input error or interaction with the database';
                response = JSON.stringify(errorJSON);
            }
            res.end(response);
        });
    } catch (err) {
        errorJSON.error = 'Input error or interaction with the database';
        response = JSON.stringify(errorJSON);
        res.end(response);
    }
});

eventRequest.on('getChat', function (req, res) {
    try {
        pm.getAllMessages(req.UserID_1, req.UserID_2, req.limit, function (err, messages) {
            if (err == null) {
                if (messages == null) {
                    errorJSON.error = "Incorrect username and/or password";
                    response = JSON.stringify(errorJSON);
                }
                else
                    response = JSON.stringify(messages);
            }
            else {
                errorJSON.error = 'Input error or interaction with the database';
                response = JSON.stringify(errorJSON);
            }
            res.end(response);
        });
    } catch (err) {
        errorJSON.error = 'Input error or interaction with the database';
        response = JSON.stringify(errorJSON);
        res.end(response);
    }
});

eventRequest.on('saveTopic', function (req, res) {
    try {
        pm.saveTopic(new topicClass.Topic(req.Topic.TopicName), (err, result) => {
            if (err) throw err;
        });
        res.end(JSON.stringify(allRightJSON));
    } catch (err) {
        errorJSON.error = 'Input error or interaction with the database';
        response = JSON.stringify(errorJSON);
        res.end(response);
    }
});

eventRequest.on('deleteTopic', function (req, res) {
    try {
        pm.deleteTopic(new topicClass.Topic(req.TopicName), (err, result) => {
            if (err) throw err;
        });
        res.end(JSON.stringify(allRightJSON));
    } catch (err) {
        errorJSON.error = 'Input error or interaction with the database';
        response = JSON.stringify(errorJSON);
        res.end(response);
    }
});

eventRequest.on('getAllTopics', function (req, res) {
    try {
        pm.getAllTopics(function (err, topics) {
            if (topics != "")
                response = JSON.stringify(topics);
            else {
                errorJSON.error = "There aren't topics";
                response = JSON.stringify(errorJSON);
            }
            res.end(response);
        });
    } catch (err) {
        errorJSON.error = 'Input error or interaction with the database';
        response = JSON.stringify(errorJSON);
        res.end(response);
    }
});

eventRequest.on('saveChallengeQuestion', function (req, res) {
    try {
        pm.saveChallengeQuestion(new questionClass.ChallengeQuestion(req.Question.QuestionText, req.Question.Answer_A,
            req.Question.Answer_B, req.Question.Answer_C, req.Question.Answer_D, req.Question.XPValue,
            req.Question.Topics_ID, res.Question.Explanation), function (err, questionID) {
                if (err == null) {
                    pm.getTypeInformationsID(res.Question.Type, function (err, typeID) {
                        if (err == null) {
                            pm.addQuestionTypeInformations(questionID, typeID, (err, result) => {
                                if (err) throw err;
                            });
                            res.end(JSON.stringify(allRightJSON));
                        }
                        else {
                            errorJSON.error = 'Input error or interaction with the database';
                            response = JSON.stringify(errorJSON);
                            res.end(response);
                        }

                    });
                }
                else {
                    errorJSON.error = 'Input error or interaction with the database';
                    response = JSON.stringify(errorJSON);
                    res.end(response);
                }
            });
    } catch (err) {
        errorJSON.error = 'Input error or interaction with the database';
        response = JSON.stringify(errorJSON);
        res.end(response);
    }
});


eventRequest.on('getLeaderBoard', function (req, res) {
    try {
        pm.getLeaderBoard(function (err, leaderBoard) {
            if (leaderBoard != "")
                response = JSON.stringify(leaderBoard);
            else {
                errorJSON.error = "There aren't users, topics or accumulated points";
                response = JSON.stringify(errorJSON);
            }
            res.end(response);
        });
    } catch (err) {
        errorJSON.error = 'Input error or interaction with the database';
        response = JSON.stringify(errorJSON);
        res.end(response);
    }
});

/* eventRequest.on('chooseRandomOpponent', function (req, res) {
    try {
        pm.isThereASlot(req.UserID, function (err, result) {
            if (err == null) {
                if(result == null){
                    pm.saveChallenge(new challengeClass.Challenge(req.UserID, null, challengeClass.ChallengeStatus.WaitingforAcceptance),(err, resultID) => {
                        if(err) throw err;
                        else if(resultID !== null && resultID !== undefined){
                            var req_modified = {
                                UserID : req.UserID,
                                Topic : req.Topic,
                                challengeID : resultID
                            }
                            extractionQuestionsFactory.getRandomQuestionAlgorithm(req.TopicID).saveAndSendRandomQuestions(req_modified, res);
                        }
                        
                    });

                }
                else{
                    var challenge_tmp = new challengeClass.Challenge(result.SenderProposal_ID, req.UserID, challengeClass.ChallengeStatus.Playing);
                    challenge_tmp.setID = result.ID;
                    pm.updateChallenge(challenge_tmp, (err, result) => {
                        if (err) throw err;
                    });
                    pm.getQuestionsByChallengeID(result.ID,function (err, questions) {
                        if (err == null) {
                            if (questions == null) {
                                errorJSON.error = "There aren't questions in DB";
                                response = JSON.stringify(errorJSON);
                                res.end(response);
                            }
                            else {
                                var challenge = {
                                    notificationType: 'startChallenge',
                                    Questions: questions
                                }
                                challenge.Questions.forEach((question) => {
                                    pm.saveChallengeResult(new challengeResultClass.ChallengeResult(req.UserID, question.getID, result.ID, 0, 0, challengeResultClass.ChallengeResultStatus.NotAnswered), (err, result) => {
                                        if (err) throw err;
                                    });
                                });
                                sendIfPossibleOrSaveNotification(req.UserID, JSON.stringify(challenge));
                                res.end(JSON.stringify(allRightJSON));
                            }
                        }
                    });
                }
            }
            else
                throw err;
        });
    } catch (err) {
        errorJSON.error = 'Input error or interaction with the database';
        response = JSON.stringify(errorJSON);
        res.end(response);
    }
}); */


eventRequest.on('challengeSpecificUser', function (req, res) {
    try {
        pm.saveChallenge(new challengeClass.Challenge(req.SenderProposal_ID, req.ReceiverProposal_ID, challengeClass.ChallengeStatus.WaitingforAcceptance), function (err, id) {
            var notification = {
                notificationType: "challengeProposal",
                TopicID: req.TopicID,
                SenderProposal_ID: req.SenderProposal_ID,
                ReceiverProposal_ID: req.ReceiverProposal_ID,
                challengeID: id
            };
            sendIfPossibleOrSaveNotification(req.ReceiverProposal_ID, JSON.stringify(notification));
            res.end(JSON.stringify(notification));
        });

    } catch (err) {
        errorJSON.error = 'Input error or interaction with the database';
        response = JSON.stringify(errorJSON);
        res.end(response);
    }
});

eventRequest.on('challengeRejected', function (req, res) {
    try {
        pm.deleteChallenge(req.challengeID, (err, result) => {
            if (err) throw err;
        });
        var notification = {
            notificationType: "challengeRejected",
            ReceiverProposal_ID: req.ReceiverProposal_ID
        };
        sendIfPossibleOrSaveNotification(req.SenderProposal_ID, JSON.stringify(notification));
        res.end(JSON.stringify(allRightJSON));
    } catch (err) {
        errorJSON.error = 'Input error or interaction with the database';
        response = JSON.stringify(errorJSON);
        res.end(response);
    }
});

/**
 * This service will have to be changed in the future, 
 * it's necessary a refactoring applying design principles!
 */
eventRequest.on('challengeAccepted', function (req, res) {
    try {
        var challenge = new challengeClass.Challenge(req.SenderProposal_ID, req.ReceiverProposal_ID, challengeClass.ChallengeStatus.Playing);
        challenge.setID = req.challengeID;
        pm.updateChallenge(challenge, (err, result) => {
            if (err) throw err;
        });
        extractionQuestionsFactory.getRandomQuestionAlgorithm(req.TopicID).saveAndSendRandomQuestions(req, res);

    } catch (err) {
        errorJSON.error = 'Input error or interaction with the database';
        response = JSON.stringify(errorJSON);
        res.end(response);
    }
});

eventRequest.on('getUserByID', function (req, res) {
    try {
        pm.getUser(req.UserID, function (err, user) {
            if (err == null) {
                if (user == null) {
                    errorJSON.error = "Incorrect parameter";
                    response = JSON.stringify(errorJSON);
                }
                else
                    response = JSON.stringify(user);
            }
            else {
                errorJSON.error = 'Input error or interaction with the database';
                response = JSON.stringify(errorJSON);
            }
            res.end(response);
        });
    } catch (err) {
        errorJSON.error = 'Input error or interaction with the database';
        response = JSON.stringify(errorJSON);
        res.end(response);
    }
});

eventRequest.on('closeConnection', function (req, res) {
    try {
        var ID = parseInt(req.UserID, 10);
        if (users.has(ID)) {
            users.get(ID).close();
            users.delete(ID);
        }
        console.log("[" + Date(Date.now()).toString() + "] - " + "[Controller]: Connessione per utente " + req.UserID + " chiusa");
        res.end(JSON.stringify(allRightJSON));
        pm.saveUserActivity(req.UserID, 'Exit', new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''), (err, result) => {
            if (err) throw err;
        });
    } catch (err) {
        errorJSON.error = 'Input error or interaction with the database';
        response = JSON.stringify(errorJSON);
        res.end(response);
    }
});

eventRequest.on('getAllRivals', function (req, res) {
    try {
        pm.getRivals(req.UserID, function (err, rivals) {
            if (rivals != "")
                response = JSON.stringify(rivals);
            else {
                errorJSON.error = "There aren't users, topics or accumulated points";
                response = JSON.stringify(errorJSON);
            }
            res.end(response);
        });
    } catch (err) {
        errorJSON.error = 'Input error or interaction with the database';
        response = JSON.stringify(errorJSON);
        res.end(response);
    }
});

eventRequest.on('endChallenge', function (req, res) {

    try {
        var challenge = new challengeClass.Challenge(req.SenderProposal_ID, req.ReceiverProposal_ID, challengeClass.ChallengeStatus.Finished);
        challenge.setID = req.challengeID;
        pm.updateChallenge(challenge, (err, result) => {
            if (err) throw err;
        });
        res.end(JSON.stringify(allRightJSON));
    } catch (err) {
        errorJSON.error = 'Input error or interaction with the database';
        response = JSON.stringify(errorJSON);
        res.end(response);
    }
});

eventRequest.on('getResultByChallengeID', function (req, res) {

    try {
        pm.getChallengeResult(req.challengeID, function (err, result) {
            if (err == null) {
                if (result == null) {
                    errorJSON.error = "Incorrect parameter";
                    response = JSON.stringify(errorJSON);
                }
                else {
                    response = JSON.stringify(result);
                }
            }
            else {
                errorJSON.error = 'Input error or interaction with the database';
                response = JSON.stringify(errorJSON);
            }
            res.end(response);
        });
    } catch (err) {
        errorJSON.error = 'Input error or interaction with the database';
        response = JSON.stringify(errorJSON);
        res.end(response);
    }
});

eventRequest.on('answerToChallengeQuestion', function (req, res) {
    try {
        pm.updateChallengeResult(new challengeResultClass.ChallengeResult(req.UserID, req.QuestionID, req.ChallengeID, req.XP, req.TimeInSec, challengeResultClass.ChallengeResultStatus.Answered), (err, result) => {
            if (err) throw err;
        });
        var notification = {
            notificationType: "questionResponse",
            OpponentID: req.UserID,
            QuestionID: req.QuestionID,
            ChallengeID: req.ChallengeID,
            XP: req.XP,
            TopicID: req.TopicID,
            TimeInSec: req.TimeInSec,
            RoundNumber: req.RoundNumber
        };

        sendIfPossibleOrSaveNotification(req.OpponentID, JSON.stringify(notification));
        res.end(JSON.stringify(allRightJSON));
    } catch (err) {
        errorJSON.error = 'Input error or interaction with the database';
        response = JSON.stringify(errorJSON);
        res.end(response);
    }
});

eventRequest.on('getWaitingChallengeByID', function (req, res) {
    try {
        pm.getWaitingChallenge(req.UserID, (err, result)=>{
            if (err == null) {
                if (result == null) {
                    errorJSON.error = "There aren't questions in DB";
                    response = JSON.stringify(errorJSON);
                    res.end(response);
                }
                else {
                    response = JSON.stringify(result);
                    res.end(response);
                }
            }
        });
    } catch (err) {
        errorJSON.error = 'Input error or interaction with the database';
        response = JSON.stringify(errorJSON);
        res.end(response);
    }
});

eventRequest.on('getAllChallengesResults', function (req, res) {
    try {
        pm.getAllChallengesResults(req.UserID, (err, result)=>{
            if (err == null) {
                if (result == null) {
                    errorJSON.error = "There aren't questions in DB";
                    response = JSON.stringify(errorJSON);
                    res.end(response);
                }
                else {
                    response = JSON.stringify(result);
                    res.end(response);
                }
            }
        });
    } catch (err) {
        errorJSON.error = 'Input error or interaction with the database';
        response = JSON.stringify(errorJSON);
        res.end(response);
    }
});

exports.eventRequest = eventRequest;
exports.sendIfPossibleOrSaveNotification = sendIfPossibleOrSaveNotification;
