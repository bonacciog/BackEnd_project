class Question {
    constructor(QuestionText, Answer_A, Answer_B, Answer_C, Answer_D, XPValue, Topic_ID){
        this.questionText = QuestionText;
        this.answer_A = Answer_A;
        this.answer_B = Answer_B;
        this.answer_C = Answer_C;
        this.answer_D = Answer_D;
        this.XPValue = XPValue;
        this.topic_ID = Topic_ID; 
    }

    get getQuestionText(){
        return this.questionText;
    }

    get getAnswer_A(){
        return this.answer_A;
    }
    get getAnswer_B(){
        return this.answer_B;
    }
    get getAnswer_C(){
        return this.answer_C;
    }
    get getAnswer_D(){
        return this.answer_D;
    }
    get getXPValue(){
        return this.XPValue;
    }
    get getTopic_ID(){
        return this.topic_ID;
    }

    /**
     * @param {any} questionText
     */
    set setQuestionText(questionText){
        this.questionText = questionText;
    }

    /**
     * @param {any} answer_A
     */
    set setAnswer_A(answer_A){
        this.answer_A = answer_A;
    }
    /**
     * @param {any} answer_B
     */
    set setAnswer_B(answer_B){
        this.answer_B = answer_B;
    }
    /**
     * @param {any} answer_C
     */
    set setAnswer_C(answer_C){
        this.answer_C = answer_C;
    }
    /**
     * @param {any} answer_D
     */
    set setAnswer_D(answer_D){
        this.answer_D = answer_D;
    }
    /**
     * @param {any} XPValue
     */
    set setXPValue(XPValue){
        this.XPValue=XPValue;
    }
    /**
     * @param {any} topic_ID
     */
    set setTopic_ID(topic_ID){
        this.topic_ID = topic_ID;
    }
    
}

exports.Question = Question;