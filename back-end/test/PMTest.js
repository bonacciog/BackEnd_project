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

for(i = 2; i < 40; i++){
var question = new questionClass.Question("?" + i, "A", "B", "C", "D", 10, 1, "Teoria", 10);

pm.saveChallengeQuestion(question);
}