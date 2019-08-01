import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { startSignOut } from '../../actions/auth';

const SignedInLinks = (props) => {
  return (
    <div>
      
        <NavLink to="/dashboard" className="button button--link" activeClassName="active" exact={true}>Dashboard</NavLink>
        <NavLink to="/create" className="button button--link" activeClassName="active">Create</NavLink>
        <button className="button button--link" onClick={props.startSignOut}>Logout</button>
      
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    startSignOut: () => dispatch(startSignOut())
  }
}

export default connect(null, mapDispatchToProps)(SignedInLinks);