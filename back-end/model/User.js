/**
 * 
 *  @author Giovanni Bonaccio
 */


class User {
    constructor(firstName, lastName, university){
        this.firstName = firstName;
        this.lastName = lastName;
        this.university = university;
    }

    get getFirtname(){
        return this.firstName;
    }

    get getLastname(){
        return this.lastName;
    }

    get getUniversity(){
        return this.university;
    }

    get getID(){
        return this.ID;
    }
    
    /**
     * @param {any} ID
     */
    set setID(ID){
        this.ID=ID;
    }

    /**
     * @param {any} university
     */
    set setUniversity(university){
        this.university = university;
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