import React, { Component } from 'react';

import './Entry.css';

class Entry extends Component {
    render() {
        return (
            <div className="entry">
                <h4>{this.props.entryDate}</h4>
                <h4>{this.props.userEmail}</h4>
                <h4>{this.props.cash}</h4>
                <h4>{this.props.investments}</h4>
                <h4>{this.props.otherAssets}</h4>
                <h4>{this.props.total}</h4>
            </div>
        );
    }
}

export default Entry;