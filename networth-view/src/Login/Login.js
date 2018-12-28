import React, { Component } from 'react';

import './Login.css';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            validateLogin: true
        };

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    onChangePassword(event) {
        this.setState({ password: event.target.password });
    }

    userLogin() {
        
    }

    render() {
        return (
            <div className='loginform'>
                <div className='wrapper'>
                    <input onChange={this.onChangeEmail} type='email' placeholder='Enter your Email ...'/>
                    <input onChange={this.onChangePassword} type='password' placeholder='Enter your Password ...'/>
                    <button className='login-button'>Login</button>
                    { !this.state.validateLogin ?
                        <p>Please enter the correct email or password.</p> : null
                    }
                </div>
            </div>
        );
    }
}

export default Login;