/**
 * 
 *  @author Giovanni Bonaccio
 */


class User {
    constructor(firstName, lastName, username, email, password){
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.password = password;
        this.XP = 0;
    }

    get getFirtName(){
        return this.firstName;
    }

    get getLastName(){
        return this.lastName;
    }

    get getUsername(){
        return this.username;
    }
    get getEmail(){
        return this.email;
    }
    get getPassword(){
        return this.password;
    }

    get getXP(){
        return this.XP;
    }

    /**
     * @param {number} XP
     */
    set setXP(XP){
        this.XP=XP;
    }
    
    /**
     * @param {any} firstName
     */
    set setFirstName(firstName){
        this.firstName = firstName;
    }

    /**
     * @param {any} firstName
     */
    set setLastName(firstName){
        this.lastName = lastName;
    }

    /**
     * @param {any} firstName
     */
    set setUsername(firstName){
        this.username = username;
    }

    /**
     * @param {any} firstName
     */
    set setEmail(firstName){
        this.email = email;
    }

    /**
     * @param {any} firstName
     */
    set setPassword(firstName){
        this.password = password;
    }
}

exports.User=User;