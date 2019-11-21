const pm = require('../persistence/PersistenceManager');
const c = require('./Controller');

const TopicID = 1;
const types = [ 
    {
        typeName:'Definitions',
        questionsNumber: 3
    },
    {
        typeName:'HandsOn',
        questionsNumber: 5
    },
    {
        typeName:'Cases',
        questionsNumber: 2
    }
];
var errorJSON = {
    error: ""
};
var allRightJSON = {
    response: "It's all right!"
}
var response;

const getFinanceRandomQuestionsAndSend = function(req, res) {
    
    console.log("getFinanceRandomQuestions")
    var typesIndex = 0;
    pm.getRandomQuestions(TopicID, types[typesIndex].typeName, types[typesIndex].questionsNumber, function (err, result1) {
        typesIndex++;
        if (err == null) {
            if (result1 == null) {
                errorJSON.error = "There aren't questions in DB";
                response = JSON.stringify(errorJSON);
                res.end(response);
            }
            else {
                var challenge = {
                    notificationType: 'startChallenge',
                    Questions: result1
                }
                pm.getRandomQuestions(TopicID, types[typesIndex].typeName, types[typesIndex].questionsNumber, function (err, result2) {
                    typesIndex++;
                    if (err == null) {
                        if (result2 == null) {
                            errorJSON.error = "There aren't questions in DB";
                            response = JSON.stringify(errorJSON);
                            res.end(response);
                        }
                        else {
                            challenge.Questions = challenge.Questions.concat(result2);
                            pm.getRandomQuestions(TopicID, types[typesIndex].typeName, types[typesIndex].questionsNumber, function (err, result3) {
                                if (err == null) {
                                    if (result3 == null) {
                                        errorJSON.error = "There aren't questions in DB";
                                        response = JSON.stringify(errorJSON);
                                        res.end(response);
                                    }
                                    else {
                                        challenge.Questions = challenge.Questions.concat(result3);
                                        c.sendIfPossibleOrSaveNotification(req.SenderProposal_ID, JSON.stringify(challenge));
                                        c.sendIfPossibleOrSaveNotification(req.ReceiverProposal_ID, JSON.stringify(challenge));
                                        res.end(JSON.stringify(allRightJSON));
                                    }
                                }
                                else {
                                    errorJSON.error = 'Input error or interaction with the database';
                                    response = JSON.stringify(errorJSON);
                                    res.end(response);
                                }
                            });
                        }
                    }
                    else {
                        errorJSON.error = 'Input error or interaction with the database';
                        response = JSON.stringify(errorJSON);
                        res.end(response);
                    }
                });
            }
        }
        else {
            errorJSON.error = 'Input error or interaction with the database';
            response = JSON.stringify(errorJSON);
            res.end(response);
        }
    });
};

exports.sendRandomQuestions = getFinanceRandomQuestionsAndSend;