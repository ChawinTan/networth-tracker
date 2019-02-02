import React, { Component } from 'react';

import './networth.css';

class Networth extends Component {

    render() {
        return (
            <div className='networth'>
                {this.props.email}
            </div>
        );
    }
}

export default Networth;