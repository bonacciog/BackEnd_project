const ChallengeResultStatus = {
    NotAnswered: 'NotAnswered',
    Answered: 'Answered'
};

class ChallengeResult{
    constructor(PlayerID, QuestionID, ChallengeID, XP, TimeInSec, Status){
        this.playerID=PlayerID;
        this.questionID = QuestionID;
        this.challengeID = ChallengeID;
        this.XP = XP;
        this.timeInSec = TimeInSec;
        this.status = Status;
    }

    get getPlayerID(){
        return this.playerID;
    }

    get getQuestionID(){
        return this.questionID;
    }

    get getChallengeID(){
        return this.challengeID;
    }

    get getXP(){
        return this.XP;
    }

    get getTimeInSec(){
        return this.timeInSec;
    }

    get getStatus(){
        return this.status;
    }

    /**
     * @param {any} playerID
     */
    set setPlayerID(playerID){
        this.playerID=playerID;
    }

    /**
     * @param {any} QuestionID
     */
    set setQuestionID(QuestionID){
        this.questionID=QuestionID;
    }

    /**
     * @param {any} ChallengeID
     */
    set setChallengeID(ChallengeID){
        this.challengeID = ChallengeID;
    }

    /**
     * @param {any} XP
     */
    set setXP(XP){
        this.XP=XP;
    }

    /**
     * @param {any} timeInSec
     */
    set setTimeInSec(timeInSec){
        this.timeInSec=TimeInSec;
    }

    /**
     * @param {any} status
     */
    set setStatus(status){
        this.status = status;
    }

    get getID(){
        return this.ID;
    }

    /**
     * @param {any} ID
     */
    set setID(ID){
        this.ID = ID;
    }
}

exports.ChallengeResultStatus = ChallengeResultStatus;
exports.ChallengeResult = ChallengeResult;