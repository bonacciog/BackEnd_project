const pm = require('../persistence/PersistenceManager');
const userClass = require('../model/User');
const messageClass = require('../model/Message');
const topicClass = require('../model/Topic');
const questionClass = require('../model/Question');
/*
var user = new userClass.User("Test", "Test", "Test");
pm.saveUser(user, function (err, result){
    console.log(result);
    pm.getUser(result, function (err, user) {
       console.log(user);
    });
   // pm.deleteUser(result);
});
var user = new userClass.User("Giovanni", "Bonaccio", "Unibo");
pm.saveUser(user, function (err, result){
    console.log(result);
});*/

/* pm.saveTopic(new topicClass.Topic('Informatica', 'SQL')); */
/* var question = new questionClass.Question("?", "A", "B", "C", "D", 10, 1, undefined);
pm.saveChallengeQuestion(question, function(err,id){
    console.log(id)
}); */

/* pm.saveTypeInformations('Definitions', 30);
pm.saveTypeInformations('HandsOn', 40);
pm.saveTypeInformations('Cases', 60); */

/* pm.addQuestionTypeInformations(1,1); */

pm.getRandomQuestions(1, 'HandsOn', 1, function(err, result){
    console.log(err);
    console.log(result);
})