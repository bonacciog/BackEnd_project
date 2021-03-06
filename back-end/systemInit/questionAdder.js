const { readFile, readFileSync } = require('fs')
const pm = require('../persistence/PersistenceManager');
const questionClass = require('../model/ChallengeQuestion');
var __filename = process.argv[2];

const { promisify } = require('util');

const getTopicIDPromise = promisify(pm.getTopicID);
const getTypeInformationsIDPromise = promisify(pm.getTypeInformationsID);
const saveChallengeQuestionPromise = promisify(pm.saveChallengeQuestion);
const addQuestionTypeInformationsPromise = promisify(pm.addQuestionTypeInformations);

async function saveQuestion(questionArray) {
    for (i = 0; i < questionArray.length; i++) {
        await getTopicIDPromise(questionArray[i].Topic).then((topicID) => {
            var question = new questionClass.ChallengeQuestion(questionArray[i].Text, questionArray[i].CorrectAnswer, questionArray[i].AnswerB, questionArray[i].AnswerC, questionArray[i].AnswerD, questionArray[i].XPValue, topicID, questionArray[i].Explanation);
            getTypeInformationsIDPromise(questionArray[i].Type.toUpperCase()).then((typeID) => {
                saveChallengeQuestionPromise(question).then((result) => {
                    addQuestionTypeInformationsPromise(result, typeID);
                })
            })
        });
    }
}

readFile(__filename, (errore, data) => {
    if (errore) {
        throw errore;
    }
    console.log('\n### Lettura file con readFile: ###\n');
    var fileJSON = JSON.parse(data.toString());
    saveQuestion(fileJSON.Questions);
})
