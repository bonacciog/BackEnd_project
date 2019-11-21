const financeAlgorithm = require('./RandomQuestionAlgorithmFinance');

const questionsExtractionAlgorithm=[ financeAlgorithm];

function getRandomQuestionAlgorithm(topicID) {
    return questionsExtractionAlgorithm[topicID-1];
}

exports.getRandomQuestionAlgorithm = getRandomQuestionAlgorithm;
