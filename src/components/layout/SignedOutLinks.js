import React from 'react'
import { NavLink } from 'react-router-dom'

const SignedOutLinks = () => {
  return (
    <div>
        <NavLink className="button button--link" to='/signup'>Signup</NavLink>
        <NavLink className="button button--link" to='/login'>Login</NavLink>
    </div>
  );
}

export default SignedOutLinks;