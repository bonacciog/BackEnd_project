class Topic {
    constructor(topicsName){
        this.topicsName = topicsName;
    }

    /**
     * Not useful now
     */
    get getFatherCategory(){
        return this.fatherCategory;
    }

    get getTopicsName(){
        return this.topicsName;
    }

    get getID() {
        return this.ID;
    }

    /**
     * @param {number} XP
     */
    set setID(ID){
        this.ID=ID;
    }

    /**
     * Not useful now
     * @param {any} fatherCategory
     */
    set setFatherCategory(fatherCategory){
        this.fatherCategory = fatherCategory;
    }

    /**
     * @param {any} topicsName
     */
    set setTopicsName(topicsName){
        this.topicsName = topicsName;
    }
    




}

exports.Topic = Topic;