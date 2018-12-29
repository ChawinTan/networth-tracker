import React, { Component } from 'react';

import './SignUp.css';

class SignUp extends Component {
    render() {
        return (
            <div className='signupform'>
                <div className='wrapper'>
                    <input type='email' placeholder='Enter your prefered email ...' />
                    <input type='password' placeholder='Enter your prefered password ...' />
                    <input type='password' placeholder='Confirm password ...' />
                    <button className='signup-button'>Sign Me Up!</button>
                </div>
            </div>
        );
    }
}

export default SignUp;