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
            networth: [],
            entryDate: '',
            user: '',
            cash: '',
            investments: '',
            otherAssets: '',
            total: ''
        };
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeUser = this.onChangeUser.bind(this);
        this.onChangeCash = this.onChangeCash.bind(this);
        this.onChangeInvestments = this.onChangeInvestments.bind(this);
        this.onChangeOtherAssets = this.onChangeOtherAssets.bind(this);
        this.onChangeTotal = this.onChangeTotal.bind(this);
    }

    componentWillMount() {
        this.getNetworth();
    }

    onChangeDate(event) {
        this.setState({ entryDate: event.target.value });
    }

    onChangeUser(event) {
        this.setState({ user: event.target.value });
    }

    onChangeCash(event) {
        this.setState({ cash: event.target.value });
    }

    onChangeInvestments(event) {
        this.setState({ investments: event.target.value });
    }

    onChangeOtherAssets(event) {
        this.setState({ otherAssets: event.target.value });
    }

    onChangeTotal(event) {
        this.setState({ total: event.target.value });
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
                                <div>Entry Date<input type="date" onChange={this.onChangeDate} /></div>
                                <div>User<input onChange={this.onChangeUser}/></div>
                                <div>Cash<input onChange={this.onChangeCash}/></div>
                                <div>Investments<input onChange={this.onChangeInvestments}/></div>
                                <div>Other Assets<input onChange={this.onChangeOtherAssets}/></div>
                                <div>Total<input onChange={this.onChangeTotal}/></div>
                                <div>Actions<input type='button' value="Add" className="add" /></div>
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