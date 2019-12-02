const { readFile, readFileSync } = require('fs')
var __filename = "./questionFormat.json";



readFile(__filename, (errore, data) => {
    if (errore) {
        throw errore;
    }
    console.log('\n### Lettura file con readFile: ###\n');
    var fileJSON = JSON.parse(data.toString());
    console.log(fileJSON.Questions[0].Text);
})
