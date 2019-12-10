const pm = require('../persistence/PersistenceManager');
const questionClass = require('../model/ChallengeQuestion');
const c = require('../controller/Controller');
const extractionQuestionsFactory = require('../controller/RandomQuestionAlgorithmFactory');

var errorJSON = {
    error: ""
};
var allRightJSON = {
    response: "It's all right!"
}
var response;

function sendIfPossibleOrSaveNotification(ID, notification) {
    var UserID = parseInt(ID, 10);
    if (c.users.has(UserID))
        c.users.get(UserID).send(notification);
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

function sortQuestions(questions) {
    var questionsResult = new Array();
    if (!questions instanceof Array || !questions[0] instanceof questionClass.ChallengeQuestion)
        throw new ParamError('Incorrect Parameter!');
    const compare = function (question1, question2) {
        if (!question1 instanceof questionClass.ChallengeQuestion || !question2 instanceof questionClass.ChallengeQuestion)
            throw new ParamError('Incorrect Parameter!');

        if (question1.getID < question2.getID)
            return -1;
        else if (question1.getID > question2.getID)
            return 1;
        else
            return 0;
    };
    extractionQuestionsFactory.getRandomQuestionAlgorithm(questions[0].getTopic_ID).types.forEach((type)=>{
        var questionsTmp = extractQuestionsByType(questions, type);
        questionsResult = questionsResult.concat(questionsTmp.sort(compare));
        
    })
    return questionsResult;
}

function extractQuestionsByType(questions, type) {
    if (!questions instanceof Array || !questions[0] instanceof questionClass.ChallengeQuestion)
        throw new ParamError('Incorrect Parameter!');
    var questionsResult = new Array();
    var questionResultDim = 0;
    questions.forEach((question) => {
        if (question.getType === type.typeName) {
            questionsResult[questionResultDim] = question;
            questionResultDim++;
        }
    });
    return questionsResult;
}

exports.sortQuestions = sortQuestions;
exports.notificationCheck = notificationCheck;
exports.sendIfPossibleOrSaveNotification = sendIfPossibleOrSaveNotification;