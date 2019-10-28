class Message {
    constructor(senderUserID, receiverUserID, text, isRead, dateTime){
        this.senderUserID = senderUserID;
        this.receiverUserID = receiverUserID;
        this.text = text;
        this.isRead = isRead;
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

    get getIsRead(){
        return this.isRead;
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

    /**
     * @param {any} isRead
     */
    set setIsRead(isRead){
        this.isRead = isRead;
    }

}

exports.Message = Message;