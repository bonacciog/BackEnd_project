class Notification{
    constructor(Type){
        this.type=Type;
    }

    get getNotification(){
        return notification = {
            notificationType: this.type
        }
    }
}