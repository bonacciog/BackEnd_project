class Topic {
    constructor(fatherCategory, topicsName){
        this.fatherCategory = fatherCategory;
        this.topicsName = topicsName;
    }

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