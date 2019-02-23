import React, { Component } from 'react';
import HighchartsReact from 'react-highcharts';

import './Dashboard.css';

class Dashboard extends Component {

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

    getCash(networth) {
        return networth.map(entry => {
            return parseFloat(entry.cash);
        });
    }

    getInvestments(networth) {
        return networth.map(entry => {
            return parseFloat(entry.investments);
        });
    }

    getOtherAssets(networth) {
        return networth.map(entry => {
            return parseFloat(entry.other_assets);
        });
    }

    buildTrendChart() {
        return {
            chart: {
                type: 'line',
                zoomType: 'x'
            },
            title: {
                text: 'Networth Trend'
            },
            xAxis: {
                title: {
                    text: 'Date'
                },
                categories: this.getCategories(this.props.networth)
            },
            yAxis: {
                title: {
                    text: 'Networth'
                }
            },
            series: [{
                    name: 'Networth Trend Line',
                    data: this.getTotal(this.props.networth)
                }]
        };
    }

    buildBreakdownChart() {
        return {
            chart: {
                type: 'column',
                zoomType: 'x'
            },
            title: {
                text: 'Networth Breakdown'
            },
            xAxis: {
                title: {
                    text: 'Date'
                },
                categories: this.getCategories(this.props.networth)
            },
            yAxis: {
                title: {
                    text: 'Networth Breakdown'
                }
            },
            plotOptions: {
                column: {
                    stacking: 'normal'
                }
            },
            series:[
                {
                    name: 'Cash',
                    data: this.getCash(this.props.networth)
                },
                {
                    name: 'Investments',
                    data: this.getInvestments(this.props.networth)
                },
                {
                    name: 'Other Assets',
                    data: this.getOtherAssets(this.props.networth)
                }
            ]
        }
    }

    render() {
        return (
            <div>
                {this.props.networth.length > 0 ?
                <div className="dashboard">
                    <div>
                        <HighchartsReact
                        config={this.buildTrendChart()}
                        />
                    </div>
                    <div>
                        <HighchartsReact
                        config={this.buildBreakdownChart()}
                        />
                    </div>
                </div> :
                <div className="noChart">No chart to display yet</div>
                }
            </div>
        );
    }
}

export default Dashboard;