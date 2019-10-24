const userClass = require('../model/User');
const pm = require('../persistence/PersistenceManager');
const messageClass = require('../model/Message');

function switchRequestsAndServe(req, res) {
    var errorJSON = {
        error: ""
    };
    var request = JSON.parse(req);
    var response;
    res.writeHead(200, { 'Content-Type': 'application/json' });
    switch (request.request) {
        case "login":
            try {
                pm.getUser(request.user.Username, request.user.Password, function (err, user) {
                    if (err == null) {
                        if (user == null) {
                            errorJSON.error = "Incorrect username and/or password";
                            response = JSON.stringify(errorJSON);
                        }
                        else
                            response = JSON.stringify(user);
                    }
                    else {
                        errorJSON.error = "Error in DB interation: " +err;
                        response = JSON.stringify(errorJSON);
                    }
                    res.end(response);
                });
            } catch (err) {
                errorJSON.error = err.message;
                response = JSON.stringify(errorJSON);
                res.end(response);
            }
            break;
        case "saveMessage":
            try {
                pm.saveMessage(new messageClass.Message(request.message.SenderUsername, request.message.ReceiverUsername, request.message.Text, request.message.IsRead, request.message.DateTime));
            } catch (err) {
                errorJSON.error = err.message;
                response = JSON.stringify(errorJSON);
                res.end(response);
            }
            break;
        case "deleteMessage":
            try {
                pm.deleteMessage(new messageClass.Message(request.message.SenderUsername, request.message.ReceiverUsername, request.message.Text, request.message.IsRead, request.message.DateTime));
            } catch (err) {
                errorJSON.error = err.message;
                response = JSON.stringify(errorJSON);
                res.end(response);
            }
            break;
        case "getChat":
            try {
                pm.getMessages(request.message.SenderUsername, request.message.ReceiverUsername, request.limit, function (err, messages) {
                    if (err == null) {
                        if (messages == null) {
                            errorJSON.error = "Incorrect username and/or password";
                            response = JSON.stringify(errorJSON);
                        }
                        else
                            response = JSON.stringify(messages);
                    }
                    else {
                        errorJSON.error = "Error in DB interation: " +err;
                        response = JSON.stringify(errorJSON);
                    }
                    res.end(response);
                });
            } catch (err) {
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

function checkToNotify() { }

exports.switchRequestsAndServe = switchRequestsAndServe;