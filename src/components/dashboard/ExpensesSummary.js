import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import getExpenseTotal from '../../selectors/expenses-total';
import selectExpenses from '../../selectors/expenses';

export const ExpensesSummary = ({expenseCount,expenseTotal}) => {
    const expenseWord = expenseCount === 1 ? 'expense' : 'expenses';
    const formattedExpensesTotal = numeral(expenseTotal).format('$0,0.00');
    return (
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">Viewing <span>{expenseCount}</span> {expenseWord} totalling <span>{formattedExpensesTotal}</span></h1>
                <div className="page-header__actions">
                    <Link className="button" to="/create">Add Expense</Link>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    const expenses = selectExpenses(state.expenses, state.filters);
    const expenseCount = expenses.length;
    const expenseTotal = getExpenseTotal(expenses);
    return {
        expenseCount: expenseCount,
        expenseTotal: expenseTotal
    };
};
export default connect(mapStateToProps)(ExpensesSummary);