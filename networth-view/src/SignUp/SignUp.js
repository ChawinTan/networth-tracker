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
    }

    onChangeEmail(event) {
        this.setState({ userEmail: event.target.value });
        console.log(this.state.userEmail)
    }

    onChangePassword(event) {
        this.setState({ userPassword: event.target.value });
        console.log(this.state.userPassword)
    }

    onChangeConfirmPassword(event) {
        this.setState({ confirmPassword: event.target.value });
        console.log(this.state.confirmPassword)
    }

    render() {
        return (
            <div className='signupform'>
                <div className='wrapper'>
                    <input onChange={this.onChangeEmail} type='email' placeholder='Enter your prefered email ...' />
                    <input onChange={this.onChangePassword} type='password' placeholder='Enter your prefered password ...' />
                    <input onChange={this.onChangeConfirmPassword} type='password' placeholder='Confirm password ...' />
                    <button className='signup-button'>Sign Me Up!</button>
                </div>
            </div>
        );
    }
}

export default SignUp;