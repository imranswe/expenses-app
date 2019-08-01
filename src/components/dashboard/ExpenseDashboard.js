import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters';
import ExpensesSummary from './ExpensesSummary';

class ExpenseDashboard extends Component {
    
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
}

const mapStateToProps = (state) => {
    // console.log(state);
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(ExpenseDashboard);

