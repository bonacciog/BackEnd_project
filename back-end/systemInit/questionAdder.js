const { readFile, readFileSync } = require('fs')
const pm = require('../persistence/PersistenceManager');
const questionClass = require('../model/Question');
var __filename = "questionFormat.json"

readFile(__filename, (errore, data) => {
    if (errore) {
        throw errore;
    }
    console.log('\n### Lettura file con readFile: ###\n');
    //var prova = JSON.stringify(data.toString());
    var fileJSON = JSON.parse(data.toString());
    Object.keys(fileJSON.Questions).forEach(function (key) {
        var row = fileJSON.Questions[key];
        pm.getTopicID(row.Topic, function(err, topicID){
            question = new questionClass.Question(row.Text, row.CorrectAnswer, row.AnswerB, row.AnswerC, row.AnswerD, row.XPValue, topicID, row.Explanation);
            pm.getTypeInformationsID(row.Type, function(err, typeID){
                pm.saveChallengeQuestion(question, (err, result) => {
                    pm.addQuestionTypeInformations(result, typeID);
                });
            })
            
        })
        

    })
})
