import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

import './networth.css';
import Entry from './Entry/Entry';
import DashBoard from '../DashBoard/Dashboard';

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
        this.addNewEntry = this.addNewEntry.bind(this);
        this.deleteNetworth = this.deleteNetworth.bind(this);
        this.toggleManage = this.toggleManage.bind(this);
        this.toggleDashboard = this.toggleDashboard.bind(this);
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

    toggleManage() {
        this.setState({ manage: true });
    }

    toggleDashboard() {
        this.setState({ manage: false });
    }

    sortEntryByDate(entries) {
        return entries.sort((a, b) => {
            return new Date(a.entry_date) - new Date(b.entry_date);
        });
    }

    addNewEntry(e) {
        e.preventDefault();
        const entry = {
            entry_date: this.state.entryDate,
            user_email: this.state.user,
            cash: this.state.cash,
            investments: this.state.investments,
            other_assets: this.state.otherAssets,
            total: this.state.total
        };
        const url =  `http://localhost:8081/networth/update-networth`;
        if(this.state.user === this.props.location.state.email) {
            fetch(url, {
                method: 'post',
                headers: { 
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(entry)
            }).then(response => response.json())
            .then(json => {
                if(json === 'Cannot update') {
                    alert('Cannot have entries on the same date!');
                } else {
                    const updatedNetworth = [...this.state.networth, entry]
                    this.setState({ 
                        networth: this.sortEntryByDate(updatedNetworth),
                        user: '',
                        cash: '',
                        investments: '',
                        otherAssets: '',
                        total: ''
                    });
                }
            });
        } else {
            alert('You have entered the wrong user name');
        }
    }

    parseDate(entries) {
        return entries.map(entry => {
            let date = new Date(entry.entry_date);

            return { ...entry, entry_date: 
                date.getFullYear().toString() + '-' +
                (date.getMonth() + 1).toString() + '-' +
                date.getDate().toString() };
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
        .then(json => {
            const sortedNetworth = this.sortEntryByDate(json);
            this.setState({ networth: sortedNetworth });
        });
    }

    deleteNetworth(key) {
        const entryToDelete = this.state.networth[key];
        const parameters = { entry_date: entryToDelete.entry_date, user_email: entryToDelete.user_email };

        const url = 'http://localhost:8081/networth/delete-networth';

        fetch(url, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(parameters)
        }).then(response => response.json())
        .then(json => {
            if (json === 'User email does not exist') {
                alert('Something is wrong with your data!');
            } else if (json === 'Delete successful') {
                 this.state.networth.splice(key, 1);
                 this.props.saveUserNetworth(this.state.networth);
            }
        })
    }

    render() {
        return (
            <div>
                <div className='networth'>
                    <div className="buttons">
                        <button onClick={this.toggleManage}>Manage Entries</button>
                        <button onClick={this.toggleDashboard}>DashBoard</button>
                    </div>
                    {
                        this.state.manage ? 
                        <div className="display">
                            <div className="title">
                                <div>Entry Date<input type="date" onChange={this.onChangeDate}/></div>
                                <div>User<input onChange={this.onChangeUser} value={this.state.user}/></div>
                                <div>Cash<input onChange={this.onChangeCash} value={this.state.cash}/></div>
                                <div>Investments<input onChange={this.onChangeInvestments} value={this.state.investments}/></div>
                                <div>Other Assets<input onChange={this.onChangeOtherAssets} value={this.state.otherAssets}/></div>
                                <div>Total<input onChange={this.onChangeTotal} value={this.state.total}/></div>
                                <div>Actions<input type='button' value="Add" className="add" onClick={this.addNewEntry} /></div>
                            </div>
                            <hr />
                            {this.state.networth.map((entry, index) => {
                                return <div key={index} className="entries">
                                        <Entry 
                                    entryDate={entry.entry_date}
                                    userEmail={entry.user_email}
                                    cash={entry.cash}
                                    investments={entry.investments}
                                    otherAssets={entry.other_assets}
                                    total={entry.total}
                                    />
                                    <div className="delete-button">
                                        <button value={index} onClick={() => this.deleteNetworth(index)}>Delete Entry</button>
                                    </div>
                                </div>
                            })}
                        </div>
                        :
                        <DashBoard networth={this.state.networth} />
                    }
                </div>
            </div>
        );
    }
}

export default withRouter(Networth);