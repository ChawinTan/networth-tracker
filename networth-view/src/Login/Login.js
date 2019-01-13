import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';

import './Login.css';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userEmail: '',
            userPassword: '',
            validateLogin: true,
            redirect: false
        };

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.userLogin = this.userLogin.bind(this);
    }

    onChangeEmail(event) {
        this.setState({ userEmail: event.target.value });
    }

    onChangePassword(event) {
        this.setState({ userPassword: event.target.value });
    }

    userLogin() {
        const email = this.state.userEmail;
        const password = this.state.userPassword;

        if ( !email || !password ) {
            this.setState({ validateLogin: false });
        } else {
            const url = 'http://localhost:8081/users/signin';
            fetch(url, {
                method: 'post',
                headers: { 
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: this.state.userEmail,
                    user_password: this.state.userPassword
                })
            }).then(res => res.json())
            .then(json => {
                if (json === 'Wrong credentials') {
                    this.setState({ validateLogin: false });
                } else if (json === 'Sign in success') {
                    this.setState({ 
                        validateLogin: true,
                        redirect: true
                    });
                    this.props.saveUserDetail(email);
                }
            })
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/networth' />;
        }
        return (
            <div className='loginform'>
                <div className='wrapper'>
                    <input id='email' onChange={this.onChangeEmail} type='email' placeholder='Enter your Email ...'/>
                    <input id='password' onChange={this.onChangePassword} type='password' placeholder='Enter your Password ...'/>
                    <button onClick={this.userLogin} className='login-button'>Login</button>
                    { !this.state.validateLogin ?
                        <p>Please enter the correct email or password.</p> : null
                    }
                    <div className='sign-up-link'>
                        <p>New user? Sign up <NavLink to={'/signup'}>here</NavLink></p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;