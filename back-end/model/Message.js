class Message {
    constructor(senderUserID, receiverUserID, text, dateTime){
        this.senderUserID = senderUserID;
        this.receiverUserID = receiverUserID;
        this.text = text;
        this.dateTime = dateTime;
    }

    get getSenderUserID(){
        return this.senderUserID
    }

    get getReceiverUserID(){
        return this.receiverUserID
    }

    get getText(){
        return this.text;
    }


    get getDateTime(){
        return this.dateTime;
    }

    /**
     * @param {any} dateTime
     */
    set setDateTime(dateTime){
        this.dateTime = dateTime;
    }

    /**
     * @param {any} senderUsername
     */
    set setSenderUsername(senderUsername){
        this.senderUsername = senderUsername;
    }

    /**
     * @param {any} receiverUsername
     */
    set setReceiverUsername(receiverUsername){
        this.receiverUsername = receiverUsername;
    }

    /**
     * @param {any} text
     */
    set setText(text){
        this.text = text;
    }

}

exports.Message = Message;