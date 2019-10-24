const userClass = require('../model/User');
const pm = require('../persistence/PersistenceManager');
const c = require('../controller/Controller');

var user = new userClass.User("Simone", "Bartoli", "simo", "test@gmail.com", "bartoli","test","test","test");

var postData = JSON.stringify({ 
    request : "login",
    user: 
      { Username : "simo", Password : "bartoli" }
    
  });


console.log(postData.error);
  //pm.saveUser(user)
//pm.deleteUser(user);

/*
pm.getUser(user.username, user.password, function (err, user) {
    if (err == null) {
        send(user);
    }
    else
        console.log('Error in DB interation');
});

//pm.deleteUser(user);

function send(user) {
    if (user == null) {
        console.log('Incorrect username and/or password');
    }
    else
        console.log(user);

}*/

