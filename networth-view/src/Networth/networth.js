import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

import './networth.css';

class Networth extends Component {
    constructor(props) {
        super(props);

        this.state = {
            networth: []
        }
    }

    componentWillMount() {
        this.getNetworth();
    }

    getNetworth() {
        const email = this.props.location.state.email;
  
        const url =  `http://localhost:8081/networth/get-networth/${email}`;

        fetch(url, {
            method: 'get',
            headers: { 
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(json => this.setState({ networth: json }))
    }

    render() {
        return (
            <div className='networth'>
                hello
            </div>
        );
    }
}

export default withRouter(Networth);