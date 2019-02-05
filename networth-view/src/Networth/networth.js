import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

import './networth.css';

class Networth extends Component {
    constructor(props) {
        super(props);

        this.state = {
            manage: true,
            charts: false,
            networth: []
        };
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
        .then(json => { 
            this.props.saveUserNetworth(json)
            return json;
        })
        .then(json => this.setState({ networth: json }));
    }

    render() {
        return (
            <div>
                <div className='networth'>
                    <div className="buttons">
                        <button>Manage Entries</button>
                        <button>DashBoard</button>
                    </div>
                    {
                        this.state.manage ? 
                        <div>
                            {this.state.networth.map((entry, index) => {
                                return <div key={index}>{entry.user_email}</div>;
                            })}
                        </div>
                        :
                        <p>no</p>
                    }
                </div>
            </div>
        );
    }
}

export default withRouter(Networth);