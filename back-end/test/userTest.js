const userClass = require('../model/User');
const pm = require('../persistence/PersistenceManager');

var user = new userClass.User('Giovanni', 'Bonaccio', 'test1', 'test@gmail.com', 'test');
//pm.saveUser(user);
var user1 = pm.getUser(user.username, user.password);

if(user1 === null) console.log('Incorrect username and/or password');
else console.log(user1);
//pm.deleteUser(user);