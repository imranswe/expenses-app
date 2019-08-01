import React from 'react';
import SignUpForm from './SignUpForm';

const SignUpPage = () => (
  <div>
    <div className="page-header">
        <div className="content-container">
            <h1 className="page-header__title">Sign Up</h1>
        </div>
    </div>
    <div className="content-container">
      <SignUpForm />
    </div>
  </div>
);

export default SignUpPage;