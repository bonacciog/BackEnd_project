const us = require('../model/User');

var user = new User("Giovanni", "Bonaccio", "test", "test@gmail.com", "test");
console.log(user);
console.log("Nome: " + user.getFirtName + "\nCognome:" + user.getLastName);