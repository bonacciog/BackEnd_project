const { readFile, readFileSync } = require('fs')
const pm = require('../persistence/PersistenceManager');
const questionClass = require('../model/ChallengeQuestion');
var __filename = process.argv[2];

const { promisify } = require('util');

const saveIndustryPromise = promisify(pm.saveIndustry);

async function saveQuestion(array) {
    for (i = 0; i < array.length; i++) {
        await saveIndustryPromise(array[i].name);
    }
}

readFile(__filename, (errore, data) => {
    if (errore) {
        throw errore;
    }
    console.log('\n### Lettura file con readFile: ###\n');
    var fileJSON = JSON.parse(data.toString());
    saveQuestion(fileJSON.Industries);
})
