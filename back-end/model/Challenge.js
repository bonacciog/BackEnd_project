const ChallengeStatus = {
    WaitingOtherPlayer: 'WaitingOtherPlayer',
    Playing: 'Playing',
    Finished: 'Finished'
};

class Challenge{
    constructor(SenderProposal_ID, ReceiverProposal_ID, Status){
        this.senderProposal_ID = SenderProposal_ID;
        this.receiverProposal_ID = ReceiverProposal_ID;
        this.status = Status;
    }

    get getSender(){
        return this.senderProposal_ID;
    }

    get getReceiver(){
        return this.receiverProposal_ID;
    }

    get getStatus(){
        return this.status;
    }

    get getID(){
        return this.ID;
    }

    get getDatetime(){
        return this.Datetime;
    }

    /**
     * @param {any} ID
     */
    set setDatetime(Datetime){
        this.Datetime = Datetime;
    }
    /**
     * @param {any} ID
     */
    set setID(ID){
        this.ID = ID;
    }

    /**
     * @param {any} SenderProposal_ID
     */
    set setSender(SenderProposal_ID){
        this.senderProposal_ID = SenderProposal_ID;
    }

    /**
     * @param {any} ReceiverProposal_ID
     */
    set setReceiver(ReceiverProposal_ID){
        this.receiverProposal_ID = ReceiverProposal_ID;
    }

    /**
     * @param {any} Status
     */
    set setStatus(Status){
        this.status=Status;
    }

}

exports.Challenge = Challenge;
exports.ChallengeStatus = ChallengeStatus;