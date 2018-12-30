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
            validatePassword: true
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

        if (password !== checkPassword) {
            this.setState({ validatePassword: false });
        }

        else {
            
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
                    {!this.state.validatePassword ? <p>Passwords do not match!</p> : null}
                    <button onClick={this.onClickSignUp} className='signup-button'>Sign Me Up!</button>
                </div>
            </div>
        );
    }
}

export default SignUp;