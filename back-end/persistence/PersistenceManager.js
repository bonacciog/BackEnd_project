var mysql = require('db-mysql');

class PersistenceManager {
    constructor(user, host, password){
        this.connection = mysql.createConnection({
            host: host,
            user: user,
            password: password
          });
    }

    constructor(){
        this.connection = mysql.createConnection({
            host: "localhost",
            user: "yourusername",
            password: "yourpassword"
          });
    }

    saveUser(){
        connection.connect(function(err) {
            if (err) throw err;
            console.log("Connected to DB!");
          });

        
        connection.end();
    }

    deleteUser(){
        connection.connect(function(err) {
            if (err) throw err;
            console.log("Connected to DB!");
          });

        
        connection.end();
    }

    checkUser(){
        connection.connect(function(err) {
            if (err) throw err;
            console.log("Connected to DB!");
          });

        
        connection.end();
    }
    
    updateUser(){
        connection.connect(function(err) {
            if (err) throw err;
            console.log("Connected to DB!");
          });

        
        connection.end();
    }
}

