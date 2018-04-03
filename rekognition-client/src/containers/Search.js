import React, {Component} from 'react';
import AWS from 'aws-sdk';
import axios from 'axios';
AWS.config.update({region: 'us-east-1', credentials: {"accessKeyId": "XXXXXX", "secretAccessKey": "XXXXXX"}});

class Search extends Component {

    state = {
        url : '',
        results: null
    }

    componentDidMount() {
        console.log("url is " + this.state.url)
        var config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
        }
        if (this.props.url !== null && this.props.url !== '')
        {
            console.log("here");
            axios.get(this.props.url)
            .then((response) => {
                console.log(response);
                this.setState({results : response})
            });
        }
    }

    render () {
        return (
        <div>
            Search Results { this.state.results === null ? null : this.state.results.data }
        </div>
        );
    }
}

export default Search
