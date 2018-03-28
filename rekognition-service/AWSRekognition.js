var save = require('./libs/dynamodb-lib');
var Promise = require('bluebird')
var uuid = require("uuid");
var request = require('request-promise').defaults({ encoding: null });
// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
var celebrityName = "";

let rekognition = new AWS.Rekognition();
const dynamoDb = new AWS.DynamoDB.DocumentClient();
AWS.config.update({ region: "us-east-1" });

var rekog = Promise.promisifyAll(rekognition);

module.exports.RekognizeFace = (event, context, callback) => {
    // Read the Image Passed in the URL
    request.get(event.body)
    .then((res) => {
        var params = {
            Image: { 
                Bytes: res
            }
        };
        //console.log(params);
        rekog.recognizeCelebritiesAsync(params)
        .then((data) => {
            celebrityName = celebrityNameResult(data);
            return celebrityNameResult(data);
        })
        .then((data) => {
            rekog.detectTextAsync(params)
            .then((data) => {
                let celebrityQuote = celebrityQuoteText(data);
                let response = { CelebrityName :  celebrityName , CelebrityQuote : celebrityQuote };
                // Async call to the Dynamo DB to save the result so that we can ensure that values are searchable for future.
                saveToDynamo(celebrityName, celebrityQuote);
                callback(null, response);
            })
            .catch(err => {
                console.log("Error : Trouble Parsing the Text from the Image" + err);
                response = { CelebrityName :  celebrityName , CelebrityQuote : "Quote Not Detected" };
                callback(null, response);
            });
        })
        .catch( (err) => {
            console.log("Error : Trouble Processing the URL Provided" + err);
            callback(new Error("Error : Trouble Processing the URL Provided" + err));
        });
    });
}

const detectText = (params, rekognition) => {
    return new Promise( (resolve, reject) =>  {
        let celebrityQuote = '';
        rekognition.detectText(params, function(err, data) {
            if (err) {
                console.log(err, err.stack); 
                reject("Error Processing the Text");
            }// an error occurred
            else {
                data.TextDetections.map( txt => {
                    if (txt.Type === "WORD")
                        celebrityQuote = celebrityQuote + " " + txt.DetectedText;
                });
                resolve(celebrityQuote)
            }
        });
    });
} 

const celebrityNameResult = (data) => {
    let celebrityQuote = ""; 
    let celebrityName = "";
    if (data.CelebrityFaces.length >= 1)
    {
        data.CelebrityFaces.map(celeb => {
            celebrityName = celebrityName + celeb.Name         // successful response
        })
    }   
    else {
        celebrityName = "NO CELEBRITY DETECTED!!!";
    }
    return celebrityName;
}

const celebrityQuoteText = (data) => {
    let celebrityQuote = '';
    data.TextDetections.map( txt => {
        if (txt.Type === "WORD")
            celebrityQuote = celebrityQuote + " " + txt.DetectedText;
    });
    return (celebrityQuote)
}

const saveToDynamo = (celebrityName, celebrityQuote) => {
    const params = {
        TableName: "celebrity-quotes",
        Item: {
            quote_id: uuid.v1(),
            celebrity_name : celebrityName,
            celebrity_quote: celebrityQuote,
            createdAt: new Date().getTime()
        }
    };
    save(params);

}