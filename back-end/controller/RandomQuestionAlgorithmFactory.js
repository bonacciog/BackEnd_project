const financeAlgorithm = require('./RandomQuestionAlgorithmFinance');
const AccountingAlgorithmJava = require('./RandomQuestionAlgorithmAccounting');
const JavaAlgorithmJava = require('./RandomQuestionAlgorithmJAVA');
const SQLAlgorithmJava = require('./RandomQuestionAlgorithmSQL');
const VBAAlgorithmJava = require('./RandomQuestionAlgorithmVBA');

const questionsExtractionAlgorithm=[ financeAlgorithm,AccountingAlgorithmJava, JavaAlgorithmJava,SQLAlgorithmJava, VBAAlgorithmJava];

function getRandomQuestionAlgorithm(topicID) {
    return questionsExtractionAlgorithm[topicID-1];
}

exports.getRandomQuestionAlgorithm = getRandomQuestionAlgorithm;
