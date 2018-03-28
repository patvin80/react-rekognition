var AWS = require("aws-sdk");

function save(params, callback) { 
  console.log("Save called");
  // AWS.config.update({ region: "us-west-1" });
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  // Callback Approach
  // dynamoDb.put(params, (err, data) => {
  //   if (err) {
  //     console.log(err);
  //     callback(err);
  //   }
  //   else 
  //     callback("Success");
  // })
  // Promisified approach
  return dynamoDb.put(params).promise();
}

module.exports = save