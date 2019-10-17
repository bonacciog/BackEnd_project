class User {
    constructor(firstName, lastName, username, email, password){
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.password = password;
    }

    get getFirtName(){
        return firstName;
    }

    get getLastName(){
        return firstName;
    }

    get getUsername(){
        return firstName;
    }
    get getEmail(){
        return firstName;
    }
    get getPassword(){
        return firstName;
    }
    
    set setFirstName(firstName){
        this.firstName = firstName;
    }

    set setLastName(firstName){
        this.lastName = lastName;
    }

    set setUsername(firstName){
        this.username = username;
    }

    set setEmail(firstName){
        this.email = email;
    }

    set setPassword(firstName){
        this.password = password;
    }
}

exports.User=User;