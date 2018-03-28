var AWS = require("aws-sdk");

var docClient = new AWS.DynamoDB.DocumentClient()

module.exports.GetCelebrityQuotes = (event, context, callback) => {

    var table = "celebrity-quotes";
    
    var params = {
        TableName: table,
        Key:{
            "celebrityName": event.celebrityName
        }
    };
    
    docClient.get(params, function(err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            callback(null,data);
        }
    });
}