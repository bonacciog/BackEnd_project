const userClass = require('../model/User');
const pm = require('../persistence/PersistenceManager');


function switchRequestsAndServe(req, res) {
    var errorJSON = {
        error: ""
    };
    var request = JSON.parse(req);
    var response;
    res.writeHead(200, { 'Content-Type': 'application/json' });
    switch (request.request) {
        case "login":
            pm.getUser(request.user.Username, request.user.Password, function (err, user) {
                if (err == null) {
                    if(user==null){
                        errorJSON.error = "Incorrect username and/or password";
                        response = JSON.stringify(errorJSON);
                    }
                    else
                        response = JSON.stringify(user);
                }
                else{
                    errorJSON.error = "Error in DB interation";
                    response = JSON.stringify(errorJSON);
                }
                res.end(response);
            });
            break;
        case "saveMessage":
            try{
                pm.saveMessage(request.message);
            }catch(err){
                errorJSON.error = err.message;
                response = JSON.stringify(errorJSON);
                res.end(response);
            }
            break;
        case "deleteMessage":
            try{
                pm.deleteMessage(request.message);
            } catch(err){
                errorJSON.error = err.message;
                response = JSON.stringify(errorJSON);
                res.end(response);
            }
            break;
        default:
            errorJSON.error = "Request error";
            response = JSON.stringify(errorJSON);
            res.end(response);
    }
}

function checkToNotify(){}

exports.switchRequestsAndServe = switchRequestsAndServe;