# AWS Rekognition - AWS Meetup Lightning Talk

Hello and Welcome to this repository that exposes capabilities of AWS Rekognition to parse and identify celebrities from images and validates the quote. 

1. About Me - [ Vinit Patankar ](https://www.linkedin.com/in/pvinit)
2. Thank you Sponsors - [ DynaTrace ](https://www.dynatrace.com/)
3. AWS Rekognition Service Overview
    1. AWS Rekognition Service [1]
    2. Demo on AWS Console [2] [3]
    3. Pricing [4]
4. Idea Phase
    1. *AWS CLI [5]
        1. aws rekognition detect-labels --image S3Object="{Bucket=rekognitionprojectpatvin80,Name=Shakespeare.png}"
        2. aws rekognition detect-text --image S3Object="{Bucket=rekognitionprojectpatvin80,Name=Shakespeare.png}"
    2. recognize-celebrities [6]
        1. aws rekognition recognize-celebrities --image S3Object="{Bucket=rekognitionprojectpatvin80,Name=Shakespeare.png}"
    3. Last Week Tonight Site [Definitely Real Quotes](ww.definitelyrealquotes.com)[7]
5. Solution Development
    1. React [8]  
    2. Serverless Framework [9]
    3. *Lambda Code
6. Demo 
    1. npm install
    2. npm start
    3. URL 1 - https://i.pinimg.com/736x/ce/56/dc/ce56dcc0e76f3d2c85cab13bfac2f17e--funny-celebrity-quotes-funny-celebrities.jpg
    4. URL 2 - https://static1.squarespace.com/static/519f76f7e4b0db707ac0650b/54fcbe74e4b0d3db82806758/54fcbf05e4b0a61cf90e48a4/1425850118938/10-b.jpg
7. Limitations
    1. Model Management - 
        Example - https://s.aolcdn.com/hss/storage/midas/337b43cf039e038e1932a0547597705e/204567772/trumppeople.nocrop.w710.h2147483647.jpg
    2. Availability

## Instructions to Setup Repository:

1. Install Serverless using npm install serverless -g
2. Clone the Repository - git clone https://github.com/patvin80/react-rekognition.git
3. Open rekognition-client/src/containers/Home.js and update the AWS Credentials.
4. Deploy the Backend - Lambda function
    1. Navigate to the rekognition-service folder.
    2. Backend comprises of DynamoDB (some persistence), Lambda function and Role
    3. aws configure - Necessary for the Serverless to deploy the necessary artifacts
    4. npm install
    4. sls deploy
5. Backend Testing
    1. Open the ./mocks/image-parse.json file which has body that contains the image URL
    2. npm install # does not hurt
    3. sls invoke -f RekognizeFaces --path ./mocks/image-parse.json
    4. Local Test sls invoke local -f -f RekognizeFaces --path ./mocks/image-parse.json
6. Power up the UI
    1. Navigate to rekognition-client
    2. npm install
    3. npm start

[1]: https://console.aws.amazon.com/rekognition/home?region=us-east-1#/
[2]: https://console.aws.amazon.com/rekognition/home?region=us-east-1#/label-detection
[3]: https://console.aws.amazon.com/rekognition/home?region=us-east-1#/face-detection
[4]: https://aws.amazon.com/rekognition/pricing/
[5]: https://docs.aws.amazon.com/cli/latest/reference/rekognition/index.html
[6]: https://docs.aws.amazon.com/cli/latest/reference/rekognition/recognize-celebrities.html
[7]: http://www.definitelyrealquotes.com/
[8]: https://reactjs.org/docs/add-react-to-a-new-app.html
[9]: https://serverless.com/framework/docs/providers/aws/guide/quick-start/