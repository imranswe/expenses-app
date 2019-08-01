import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Header from '../components/layout/Header';
import HomePage from '../components/pages/HomePage';
import SignIn from '../components/auth/SignIn';
import SignUpPage from '../components/auth/SignUpPage';
import ExpenseDashboard from '../components/dashboard/ExpenseDashboard';
import AddExpensePage from '../components/dashboard/AddExpensePage';
import EditExpensePage from '../components/dashboard/EditExpensePage';
import HelpPage from '../components/pages/HelpPage';
import NotFoundPage from '../components/pages/NotFoundPage';

export const history = createBrowserHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Header />
            <Switch>
                <Route path="/" component={HomePage} exact={true}/>
                <Route path="/login" component={SignIn} />
                <Route path="/signup" component={SignUpPage} />
                <Route path="/dashboard" component={ExpenseDashboard} />
                <Route path="/create" component={AddExpensePage} />
                <Route path="/edit/:id" component={EditExpensePage} />
                <Route path="/help" component={HelpPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;