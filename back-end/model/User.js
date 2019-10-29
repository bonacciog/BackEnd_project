/**
 * 
 *  @author Giovanni Bonaccio
 */


class User {
    constructor(firstName, lastName){
        this.firstName = firstName;
        this.lastName = lastName;
    }

    get getFirtName(){
        return this.firstName;
    }

    get getLastName(){
        return this.lastName;
    }

    get getID(){
        return this.ID;
    }

    /**
     * @param {number} XP
     */
    set setID(ID){
        this.ID=ID;
    }
    
    
    /**
     * @param {any} firstName
     */
    set setFirstName(firstName){
        this.firstName = firstName;
    }

    /**
     * @param {any} lastName
     */
    set setLastName(lastName){
        this.lastName = lastName;
    }

}


exports.User=User;