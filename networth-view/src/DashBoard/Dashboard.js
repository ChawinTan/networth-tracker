import React, { Component } from 'react';
// import Highcharts from 'highcharts';
import HighchartsReact from 'react-highcharts';

import './Dashboard.css';

class Dashboard extends Component {

    componentWillMount() {
        console.log(this.getCategories(this.props.networth));
        console.log(this.buildChart());
    }

    getCategories(networth) {
        return networth.map(entry => {
            const date = new Date(entry.entry_date);
            const month = date.getMonth() + 1;
            const formattedDate = date.getFullYear() + '-' + month + '-' + date.getDate();
            return formattedDate;
        });
    }

    getTotal(networth) {
        return networth.map(entry => {
            return parseFloat(entry.total);
        });
    }

    buildChart() {
        return {
            title: {
                text: 'Networth Trend'
            },
            xAxis: {
                categories: this.getCategories(this.props.networth)
            },
            series: [{
                    data: this.getTotal(this.props.networth)
                }]
        };
    }

    render() {
        return (
            <div className="dashboard">
                <HighchartsReact
                config={this.buildChart()}
                 />
            </div>
        );
    }
}

export default Dashboard;