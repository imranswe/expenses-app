import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { authenticate } from '../../actions/auth';

class SignIn extends Component {

    state = {
        email: '',
        password: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.authenticate(this.state);
    }

    render() {
        const { authError, auth } = this.props;
        const isInvalid = this.state.email === '' || this.state.password === '';
        if (auth.uid) return <Redirect to='/dashboard' />
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Sign In</h1>
                    </div>
                </div>
                <div className="content-container">
                    <form className="form" onSubmit={this.handleSubmit}> 
                        {authError && <div className="center red-text">
                            <span>{authError}</span>
                        </div>}
                        <input
                            name="email"
                            id="email"
                            onChange={this.handleChange}
                            type="text"
                            className="text-input"
                            placeholder="Email"
                        />
                        
                        <input
                            name="password"
                            id="password"
                            onChange={this.handleChange}
                            type="password"
                            className="text-input"
                            placeholder="Password"
                        />
                        <button disabled={isInvalid} className="button">Login</button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }    
};

const mapDispatchToProps = (dispatch) => {
    
    return {
        authenticate: (credentials) => dispatch(authenticate(credentials))  
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(SignIn);