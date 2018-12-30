import React, { Component } from 'react';

import './SignUp.css';

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userEmail: '',
            userPassword: '',
            confirmPassword: '',
            validateEmail: true,
            validatePassword: true,
            existEmail: true
        }
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
        this.onClickSignUp = this.onClickSignUp.bind(this);
    }

    onChangeEmail(event) {
        this.setState({ userEmail: event.target.value });
    }

    onChangePassword(event) {
        this.setState({ userPassword: event.target.value });
    }

    onChangeConfirmPassword(event) {
        this.setState({ confirmPassword: event.target.value });
    }

    onClickSignUp() {
        const email = this.state.userEmail;
        const password = this.state.userPassword;
        const checkPassword = this.state.confirmPassword;

        if (!email) {
            this.setState({ validateEmail: false });
        }

        if ((password !== checkPassword) || !password) {
            this.setState({ validatePassword: false });
        }

        else if (email && (password === checkPassword)) {
            const url = 'http://localhost:8081/users/signup';
            fetch(url,{
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
                if (json === 'Email already exist') {
                    this.setState({ existEmail: false });
                } else if (json === 'User successfully signed up') {
                    this.setState({ 
                        validateEmail: true,
                        validatePassword: true, 
                        existEmail: true
                    });
                    console.log('Signup success!');
                }
            });
        }
    }

    render() {
        return (
            <div className='signupform'>
                <div className='wrapper'>
                    <input onChange={this.onChangeEmail} type='email' placeholder='Enter your prefered email ...' />
                    {!this.state.validateEmail ? <p>Email cannot be empty!</p> : null}
                    <input onChange={this.onChangePassword} type='password' placeholder='Enter your prefered password ...' />
                    <input onChange={this.onChangeConfirmPassword} type='password' placeholder='Confirm password ...' />
                    {!this.state.validatePassword ? <p>Passwords do not match and cannot be empty!</p> : null}
                    <button onClick={this.onClickSignUp} className='signup-button'>Sign Me Up!</button>
                    {!this.state.existEmail ? <p>Email already exist</p> : null}
                </div>
            </div>
        );
    }
}

export default SignUp;