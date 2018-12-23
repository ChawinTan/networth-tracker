import React, { Component } from 'react';

import './Login.css';

class Login extends Component {
    render() {
        return (
            <div className='loginform'>
                <div className='wrapper'>
                    <input type='email' placeholder='Enter your Email ...'/>
                    <input type='password' placeholder='Enter your Password ...'/>
                    <button className='login-button'>Login</button>
                </div>
            </div>
        );
    }
}

export default Login;