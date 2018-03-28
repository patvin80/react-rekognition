//Backup code is dropped here for future reference

/*
                    rekognition.detectText(params, function(err, data) {
                        if (err) console.log(err, err.stack); // an error occurred
                        else 
                        {
                            data.TextDetections.map( txt => {
                                if (txt.Type === "WORD")
                                    celebrityQuote = celebrityQuote + " " + txt.DetectedText;
                            });

                            const params = {
                                TableName: "celebrity-quotes",
                                Item: {
                                  quote_id: uuid.v1(),
                                  celebrity_name : celebrityName,
                                  celebrity_quote: celebrityQuote,
                                  createdAt: new Date().getTime()
                                }
                            };
                            dynamoDb.put(params, (err, data) => {
                                if (err)
                                    console.log(err, err.stack)
                                else
                                    callback(null, celebrityName + " found " + celebrityQuote);          // successful response
                            });

                        }
                    }); */