import { combineReducers } from 'redux';
import expensesReducer from '../reducers/expenses';
import filterReducer from '../reducers/filters';
import authReducer from '../reducers/authReducer';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
    auth: authReducer,
    expenses: expensesReducer,
    filters: filterReducer,
    firebase: firebaseReducer
});

export default rootReducer;