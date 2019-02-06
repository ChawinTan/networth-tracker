import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

import './networth.css';
import Entry from './Entry/Entry';

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

    parseDate(entries) {
        return entries.map(entry => {
            let date = new Date(entry.entry_date);

            return { ...entry, entry_date: 
                date.getFullYear().toString() + '-' +
                date.getMonth().toString() + '-' +
                date.getDay().toString() };
        });
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
            this.props.saveUserNetworth(json);
            return json;
        })
        .then(json => {
            return this.parseDate(json);
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
                        <div className="display">
                            <div className="title">
                                <div>Entry Date</div>
                                <div>User</div>
                                <div>Cash</div>
                                <div>Investments</div>
                                <div>Other Assets</div>
                                <div>Total</div>
                            </div>
                            <hr />
                            {this.state.networth.map((entry, index) => {
                                return <Entry 
                                entryDate={entry.entry_date}
                                userEmail={entry.user_email}
                                cash={entry.cash}
                                investments={entry.investments}
                                otherAssets={entry.other_assets}
                                total={entry.total}
                                key={index}
                                />;
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