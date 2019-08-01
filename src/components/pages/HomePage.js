import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import ExpenseList from '../dashboard/ExpenseList';
import ExpenseListFilters from '../dashboard/ExpenseListFilters';
import ExpensesSummary from '../dashboard/ExpensesSummary';
class HomePage extends Component {
    render(){
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/login' /> 
        return (
            <div>
                <ExpensesSummary />
                <ExpenseListFilters />
                <ExpenseList />
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(HomePage);