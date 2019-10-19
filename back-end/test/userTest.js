const userClass = require('../model/User');
const pm = require('../persistence/PersistenceManager');

var user = new userClass.User("Giovanni", "Bonaccio", "test1", "test@gmail.com", "test","test","test","test");


//pm.saveUser(user)
//pm.deleteUser(user);


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

}

