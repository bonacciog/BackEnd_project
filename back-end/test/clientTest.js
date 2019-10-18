var request = require('request');


var data = JSON.stringify({ 
    request : "SaveUser",
    user: [
      { FirstName : "usergetFirtName", LastName : "usergetLastName" }
    ]
  });

console.log(data);

 request.post('http://127.0.0.1:1337/', data, (error, res, body) => {
  if (error) {
    console.error(error)
    return
  }
  console.log(`statusCode: ${res.statusCode}`)
  console.log(body)
})
