const financeAlgorithm = require('./RandomQuestionAlgorithmFinance');
const programmingToolsAlgorithm = require('./RandomQuestionAlgorithmProgrammingTools');
const questionsExtractionAlgorithm=[ financeAlgorithm, programmingToolsAlgorithm ];

function getRandomQuestionAlgorithm(topicID) {
    return questionsExtractionAlgorithm[topicID-1];
}

exports.getRandomQuestionAlgorithm = getRandomQuestionAlgorithm;
