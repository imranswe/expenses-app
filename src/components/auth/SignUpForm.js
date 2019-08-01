import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signUp } from '../../actions/auth';
import { Redirect } from 'react-router-dom';

class SignUpForm extends Component {
    
    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
    }
  
    onSubmit = (event) => {
        event.preventDefault();
        this.props.signUp(this.state);
    }
  
    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };
  
    render() {

        const { auth, authError } = this.props;
        if (auth.uid) return <Redirect to='/dashboard' />

        return (
            
            <form className="form" onSubmit={this.onSubmit}>
                
                {authError && <div className="center red-text">
                    <span>{authError}</span>
                </div>}
                <input
                    name="email"
                    id="email"
                    className="text-input"
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email"
                />
                <input
                    name="password"
                    id="password"
                    className="text-input"
                    onChange={this.onChange}
                    type="password"
                    placeholder="Password"
                />
                
                <input
                    name="firstName"
                    id="firstName"
                    className="text-input"
                    onChange={this.onChange}
                    type="text"
                    placeholder="First Name"
                />
                
                <input
                    name="lastName"
                    id="lastName"
                    className="text-input"
                    onChange={this.onChange}
                    type="text"
                    placeholder="Last Name"
                />
                
                <button className="button">Sign Up</button>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}
  
const mapDispatchToProps = (dispatch)=> {
    return {
        signUp: (creds) => dispatch(signUp(creds))
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);