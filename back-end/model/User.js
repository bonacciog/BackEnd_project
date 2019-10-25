/**
 * 
 *  @author Giovanni Bonaccio
 */


class User {
    constructor(firstName, lastName, username, email, password, university, fieldStudy, degreeType){
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.password = password;
        this.university = university;
        this.fieldStudy = fieldStudy;
        this.degreeType = degreeType;
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

    get getID(){
        return this.ID;
    }
    get getUniversity(){
        return this.university;
    }
    get getFieldStudy(){
        return this.fieldStudy;
    }
    get getDegreeType(){
        return this.degreeType;
    }
    /**
     * @param {any} university
     */
    set setUniversity(university){
        this.university=university;
    }
    /**
     * @param {any} fieldStudy
     */
    set setFieldStudy(fieldStudy){
        this.fieldStudy=fieldStudy;
    }
    /**
     * @param {any} degreeType
     */
    set setDegreeType(degreeType){
        this.degreeType=degreeType;
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

    /**
     * @param {any} username
     */
    set setUsername(username){
        this.username = username;
    }

    /**
     * @param {any} email
     */
    set setEmail(email){
        this.email = email;
    }

    /**
     * @param {any} password
     */
    set setPassword(password){
        this.password = password;
    }
}


exports.User=User;