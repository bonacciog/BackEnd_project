const pm = require('../persistence/PersistenceManager');
const c = require('./Controller');
const challengeResultClass = require('../model/ChallengeResult');

const TopicID = 1;
const types = [
    {
        typeName: 'THEORY',
        questionsNumber: 3
    },
    {
        typeName: 'HANDS ON',
        questionsNumber: 5
    },
    {
        typeName: 'CASES',
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

async function saveChallengeResultsAndSendSync(req,challenge){
    const { promisify } = require('util');

    const saveChallengeResultPromise = promisify(pm.saveChallengeResult);
    
    for(i=0; i<challenge.Questions.length; i++){
        await saveChallengeResultPromise(new challengeResultClass.ChallengeResult(req.UserID, challenge.Questions[i].getID, req.challengeID, 0, 0, challengeResultClass.ChallengeResultStatus.NotAnswered)).then((err)=>{
             if (err) throw err;
        });
    }
    c.sendIfPossibleOrSaveNotification(req.UserID, JSON.stringify(challenge));
}

const getSaveAndSendFinanceRandomQuestions = async function (req, res) {
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
                                        // This if because the first is for random event, specific user for the second
                                        if (req.UserID === undefined) {
                                            challenge.Questions.forEach((question) => {
                                                pm.saveChallengeResult(new challengeResultClass.ChallengeResult(req.SenderProposal_ID, question.getID, req.challengeID, 0, 0, challengeResultClass.ChallengeResultStatus.NotAnswered), (err, result) => {
                                                    if (err) throw err;
                                                });
                                                pm.saveChallengeResult(new challengeResultClass.ChallengeResult(req.ReceiverProposal_ID, question.getID, req.challengeID, 0, 0, challengeResultClass.ChallengeResultStatus.NotAnswered), (err, result) => {
                                                    if (err) throw err;
                                                });
                                            })
                                            c.sendIfPossibleOrSaveNotification(req.SenderProposal_ID, JSON.stringify(challenge));
                                            c.sendIfPossibleOrSaveNotification(req.ReceiverProposal_ID, JSON.stringify(challenge));
                                        }
                                        else{
                                            saveChallengeResultsAndSendSync(req,challenge);                                           
                                        }                                        
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

exports.saveAndSendRandomQuestions = getSaveAndSendFinanceRandomQuestions;
