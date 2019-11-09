const pm = require('../persistence/PersistenceManager');
const userClass = require('../model/User');
const messageClass = require('../model/Message');
const topicClass = require('../model/Topic');
const questionClass = require('../model/Question');
const EventEmitter = require('events').EventEmitter;

const limitQuestions = 10;
const numberQuestionTypeDefinitions = 3;
const numberQuestionTypeHandson = 5;
const numberQuestionTypeCases = 2;

const users = new Map();

var eventRequest = new EventEmitter();
var errorJSON = {
    error: ""
};
var response;


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
                    console.log("There aren't notifications for user " + UserID);
            }
        })
    } catch (err) {
        errorJSON.error = err.message;
        response = JSON.stringify(errorJSON);
        ws.send(response);
    }
}

eventRequest.on('saveUser', function (req, ws) {
    try {
        pm.getKey(function (err, key) {
            if (key === req.key) {
                pm.saveUser(new userClass.User(req.User.Firstname, req.User.Lastname, req.User.University), function (err, id) {
                    response = JSON.stringify({
                        UserID: id
                    });
                    pm.getAllTopics(function (err, topics) {
                        if (topics != "") {
                            topics.forEach(element => {
                                pm.saveAccumulatedPoints(id, element.getID, 0, (err, result) => {
                                    if (err) throw err;
                                });
                            });
                        }
                        else
                            console.log("There aren't topics for user initialization");

                    });

                    if (!users.has(id)) {
                        users.set(id, ws);
                        console.log("WebSocket for User " + id + " saved!");
                    }
                    ws.send(response);
                });
            }
            else {
                errorJSON.error = "key does not coincide";
                response = JSON.stringify(errorJSON);
                ws.send(response);
            }

        });
    } catch (err) {
        errorJSON.error = err.message;
        response = JSON.stringify(errorJSON);
        ws.send(response);
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
                            if (!users.has(req.UserID)) {
                                users.set(req.UserID, ws);
                                console.log("WebSocket for User " + req.UserID + " saved!");
                            }
                            ws.send(response);
                            notificationCheck(req.UserID, ws);


                        }
                    }
                    else {
                        errorJSON.error = "Error in DB interation: " + err;
                        response = JSON.stringify(errorJSON);
                        ws.send(response);
                    }

                });
            }
            else {
                errorJSON.error = "key does not coincide";
                response = JSON.stringify(errorJSON);
                ws.send(response);
            }

        });

    } catch (err) {
        errorJSON.error = err.message;
        response = JSON.stringify(errorJSON);
        ws.send(response);
    }
});

eventRequest.on('deleteUser', function (req, res) {

    try {
        pm.deleteUser(req.UserID, (err, result) => {
            if (err) throw err;
        });
        res.end();
    } catch (err) {
        errorJSON.error = err.message;
        response = JSON.stringify(errorJSON);
        res.end(response);
    }
});

eventRequest.on('saveMessage', function (req, res) {
    try {
        pm.saveMessage(new messageClass.Message(req.Message.SenderUser_ID, req.Message.ReceiverUser_ID, req.Message.Text, req.Message.IsRead, req.Message.DateTime), (err, result) => {
            if (err) throw err;
        });
        res.end();
    } catch (err) {
        errorJSON.error = err.message;
        response = JSON.stringify(errorJSON);
        res.end(response);
    }
});

eventRequest.on('deleteMessage', function (req, res) {
    try {
        pm.deleteMessage(new messageClass.Message(req.Message.SenderUser_ID, req.Message.ReceiverUser_ID, req.Message.Text, req.Message.IsRead, req.Message.DateTime), (err, result) => {
            if (err) throw err;
        });
        res.end();
    } catch (err) {
        errorJSON.error = err.message;
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
                errorJSON.error = "Error in DB interation: " + err;
                response = JSON.stringify(errorJSON);
            }
            res.end(response);
        });
    } catch (err) {
        errorJSON.error = err.message;
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
                errorJSON.error = "Error in DB interation: " + err;
                response = JSON.stringify(errorJSON);
            }
            res.end(response);
        });
    } catch (err) {
        errorJSON.error = err.message;
        response = JSON.stringify(errorJSON);
        res.end(response);
    }
});

eventRequest.on('saveTopic', function (req, res) {
    try {
        pm.saveTopic(new topicClass.Topic(req.Topic.TopicName), (err, result) => {
            if (err) throw err;
        });
        res.end();
    } catch (err) {
        errorJSON.error = err.message;
        response = JSON.stringify(errorJSON);
        res.end(response);
    }
});

eventRequest.on('deleteTopic', function (req, res) {
    try {
        pm.deleteTopic(new topicClass.Topic(req.TopicName), (err, result) => {
            if (err) throw err;
        });
        res.end();
    } catch (err) {
        errorJSON.error = err.message;
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
        errorJSON.error = err.message;
        response = JSON.stringify(errorJSON);
        res.end(response);
    }
});

eventRequest.on('saveChallengeQuestion', function (req, res) {
    try {
        pm.saveChallengeQuestion(new questionClass.Question(req.Question.QuestionText, req.Question.Answer_A,
            req.Question.Answer_B, req.Question.Answer_C, req.Question.Answer_D, req.Question.XPValue,
            req.Question.Topics_ID, res.Question.Explanation), function (err, questionID) {
                if (err == null) {
                    pm.getTypeInformationsID(res.Question.Type, function (err, typeID) {
                        if (err == null) {
                            pm.addQuestionTypeInformations(questionID, typeID, (err, result) => {
                                if (err) throw err;
                            });
                            res.end();
                        }
                        else {
                            errorJSON.error = "Error in DB interation: " + err;
                            response = JSON.stringify(errorJSON);
                            res.end(response);
                        }

                    });
                }
                else {
                    errorJSON.error = "Error in DB interation: " + err;
                    response = JSON.stringify(errorJSON);
                    res.end(response);
                }
            });
    } catch (err) {
        errorJSON.error = err.message;
        response = JSON.stringify(errorJSON);
        res.end(response);
    }
});

eventRequest.on('deleteChallengeQuestion', function (req, res) {
    try {
        pm.deleteChallengeQuestion(req.QuestionID, (err, result) => {
            if (err) throw err;
        });
        res.end();
    } catch (err) {
        errorJSON.error = err.message;
        response = JSON.stringify(errorJSON);
        res.end(response);
    }
});

eventRequest.on('savePoints', function (req, res) {
    try {
        pm.saveAccumulatedPoints(req.UserID, req.TopicID, req.XP, (err, result) => {
            if (err) throw err;
        });;
        res.end();
    } catch (err) {
        errorJSON.error = err.message;
        response = JSON.stringify(errorJSON);
        res.end(response);
    }
});

eventRequest.on('deletePoints', function (req, res) {
    try {
        pm.deleteAccumulatedPoints(req.UserID, req.TopicID, (err, result) => {
            if (err) throw err;
        });
        res.end();
    } catch (err) {
        errorJSON.error = err.message;
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
        errorJSON.error = err.message;
        response = JSON.stringify(errorJSON);
        res.end(response);
    }
});

eventRequest.on('chooseRandomOpponent', function (req, res) {
    try {
        pm.getRandomPlayer(req.UserID, function (err, ReceiverProposal_ID) {
            if (err == null) {
                if (ReceiverProposal_ID == null) {
                    errorJSON.error = "Incorrect parameter";
                    response = JSON.stringify(errorJSON);
                    res.end(response);
                }
                else {
                    pm.saveChallenge(req.UserID, ReceiverProposal_ID, function (err, id) {
                        var notification = {
                            notificationType: "challengeProposal",
                            TopicID: req.TopicID,
                            SenderProposal_ID: req.UserID,
                            challangeID: id
                        };
                        if (users.has(ReceiverProposal_ID))
                            users.get(ReceiverProposal_ID).send(JSON.stringify(notification));
                        else
                            pm.savePendingNotification(ReceiverProposal_ID, JSON.stringify(notification), (err, result) => {
                                if (err) throw err;
                            });
                        res.end();
                    });
                }
            }
            else {
                errorJSON.error = "Error in DB interation: " + err;
                response = JSON.stringify(errorJSON);
                res.end(response);
            }
        });
    } catch (err) {
        errorJSON.error = err.message;
        response = JSON.stringify(errorJSON);
        res.end(response);
    }
});


eventRequest.on('challengeSpecificUser', function (req, res) {
    try {
        pm.isPlaying(req.SenderProposal_ID, function (err, result) {
            if (err == null) {
                if (result == null) {
                    pm.saveChallenge(req.SenderProposal_ID, req.ReceiverProposal_ID, function (err, id) {
                        var notification = {
                            notificationType: "challengeProposal",
                            TopicID: req.TopicID,
                            SenderProposal_ID: req.SenderProposal_ID,
                            challangeID: id
                        };
                        if (users.has(req.ReceiverProposal_ID))
                            users.get(req.ReceiverProposal_ID).send(JSON.stringify(notification));
                        else
                            pm.savePendingNotification(req.ReceiverProposal_ID, JSON.stringify(notification), (err, result) => {
                                if (err) throw err;
                            });
                        res.end();
                    });

                }
                else {
                    errorJSON.error = "Opponent is playing another challenge";
                    response = JSON.stringify(errorJSON);
                    res.end(response);
                }
            }
            else {
                errorJSON.error = "Error in DB interation: " + err;
                response = JSON.stringify(errorJSON);
                res.end(response);
            }
        });
    } catch (err) {
        errorJSON.error = err.message;
        response = JSON.stringify(errorJSON);
        res.end(response);
    }
});

eventRequest.on('challengeRejected', function (req, res) {
    try {
        pm.deleteChallenge(req.challangeID, (err, result) => {
            if (err) throw err;
        });
        var notification = {
            notificationType: "challengeRejected",
            ReceiverProposal_ID: req.ReceiverProposal_ID
        };
        if (users.has(req.SenderProposal_ID))
            users.get(req.SenderProposal_ID).send(JSON.stringify(notification));
        else
            pm.savePendingNotification(req.SenderProposal_ID, JSON.stringify(notification), (err, result) => {
                if (err) throw err;
            });
        res.end();
    } catch (err) {
        errorJSON.error = err.message;
        response = JSON.stringify(errorJSON);
        res.end(response);
    }
});

/**
 * This service will have to be changed in the future, 
 * it's necessary a refactoring for design principles!
 */
eventRequest.on('challengeAccepted', function (req, res) {
    try {
        pm.getRandomQuestions(req.TopicID, 'Definitions', numberQuestionTypeDefinitions, function (err, resultDefinitions) {
            if (err == null) {
                if (resultDefinitions == null) {
                    errorJSON.error = "There aren't questions in DB";
                    response = JSON.stringify(errorJSON);
                    res.end(response);
                }
                else {
                    var challange = {
                        request: req.request,
                        Questions: resultDefinitions
                    }
                    pm.getRandomQuestions(req.TopicID, 'HandsOn', numberQuestionTypeHandson, function (err, resultHandsOn) {
                        if (err == null) {
                            if (resultHandsOn == null) {
                                errorJSON.error = "There aren't questions in DB";
                                response = JSON.stringify(errorJSON);
                                res.end(response);
                            }
                            else {
                                challange.Questions = challange.Questions.concat(resultHandsOn);
                                pm.getRandomQuestions(req.TopicID, 'Cases', numberQuestionTypeCases, function (err, resultCases) {
                                    if (err == null) {
                                        if (resultCases == null) {
                                            errorJSON.error = "There aren't questions in DB";
                                            response = JSON.stringify(errorJSON);
                                            res.end(response);
                                        }
                                        else {
                                            challange.Questions = challange.Questions.concat(resultCases);
                                            users.get(req.SenderProposal_ID).send(JSON.stringify(challange));
                                            users.get(req.ReceiverProposal_ID).send(JSON.stringify(challange));
                                            res.end();
                                        }
                                    }
                                    else {
                                        errorJSON.error = "Error in DB interation: " + err;
                                        response = JSON.stringify(errorJSON);
                                        res.end(response);
                                    }
                                });
                            }
                        }
                        else {
                            errorJSON.error = "Error in DB interation: " + err;
                            response = JSON.stringify(errorJSON);
                            res.end(response);
                        }
                    });
                }
            }
            else {
                errorJSON.error = "Error in DB interation: " + err;
                response = JSON.stringify(errorJSON);
                res.end(response);
            }
        });

    } catch (err) {
        errorJSON.error = err.message;
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
                errorJSON.error = "Error in DB interation: " + err;
                response = JSON.stringify(errorJSON);
            }
            res.end(response);
        });
    } catch (err) {
        errorJSON.error = err.message;
        response = JSON.stringify(errorJSON);
        res.end(response);
    }
});

eventRequest.on('closeConnection', function (req, res) {
    users.get(req.UserID).close();
    if (users.has(req.UserID))
        users.delete(req.UserID);
    res.end();
    console.log("A connection closed!");
});

eventRequest.on('getAllRivals', function (req, res) {
    try {
        pm.getRivals(req.UserID,function (err, rivals) {
            if (rivals != "")
                response = JSON.stringify(rivals);
            else {
                errorJSON.error = "There aren't users, topics or accumulated points";
                response = JSON.stringify(errorJSON);
            }
            res.end(response);
        });
    } catch (err) {
        errorJSON.error = err.message;
        response = JSON.stringify(errorJSON);
        res.end(response);
    }
});

exports.eventRequest = eventRequest;