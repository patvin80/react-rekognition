var request = require('request-promise').defaults({ encoding: null });
var url = "https://i.pinimg.com/736x/ce/56/dc/ce56dcc0e76f3d2c85cab13bfac2f17e--funny-celebrity-quotes-funny-celebrities.jpg";

const generateImage = () => {
    request.get(url)
    .then((res) => {
        data = new Buffer(res).toString('base64');
        console.log(data);
    })
    .catch( (err) => {
        console.log("There was an error");
    });;
}

generateImage();