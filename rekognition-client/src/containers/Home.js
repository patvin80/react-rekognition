import React, {Component} from 'react';
import AWS from 'aws-sdk';
import Result from './Result';
AWS.config.update({region: 'us-east-1', credentials: {"accessKeyId": "XXXXX", "secretAccessKey": "XXXXXXX"}});

class Home extends Component {

    state = {
        url : '',
        result: null
    }

    changeUrl = (event) => {
        this.setState({url : event.target.value});
        if (event.target.value === '')
            this.setState({ result: null })
      }

    invokeLambda = () => {        
        var params = {
            FunctionName: 'rekognition-service-dev-RekognizeFaces', // the lambda function we are going to invoke
            InvocationType: 'RequestResponse',
            Payload: '{ "body" : "' + this.state.url + '"}'
        };    
        let lambda = new AWS.Lambda()
        lambda.invoke(params, (err, data) => {
            if (err) 
            {
                console.log(JSON.stringify(err));
                this.setState({result: err})
            }
            else {
                console.log(JSON.stringify(data));
                this.setState({result: JSON.parse(data.Payload)})
            }
        })
    } 

    render () {
        return (
            <div >
                <form>
                    <div className="form-group">
                        <label htmlFor="example-url-input"> URL </label>
                        <input className="form-control" type="url" onChange={(event) => { this.changeUrl(event);}} value={this.state.url} id="example-url-input"></input>
                    </div>
                    <div className="form-group">
                        <button type="button" onClick={this.invokeLambda} className="btn btn-primary" > Rekognize </button>
                    </div>
                </form>
                <div>
                    { this.state.result === null ? null : <Result url={this.state.url} result={this.state.result}/> } 
                </div>
            </div>
        );
    }
}

export default Home;