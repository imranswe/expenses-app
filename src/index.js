
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter , { history } from './routes/AppRouter';
import configureStore from './store/store';
import {startSetExpenses} from './actions/expenses';
import { logout } from './actions/auth';
import LoadingPage from './components/pages/LoadingPage';

import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

store.firebase.auth().onAuthStateChanged((user) => {
    
    if (user) {
        //store.dispatch(login(user.uid));
        // const displayName = user.displayName;
        // const email = user.email;
        // const emailVerified = user.emailVerified;
        // const photoURL = user.photoURL;
        // const isAnonymous = user.isAnonymous;
        // const uid = user.uid;
        // const providerData = user.providerData;
        store.dispatch(startSetExpenses()).then(() => {
            renderApp();
            if (history.location.pathname === '/login') {
                history.push('/dashboard');
            }
        });
    } 
    else {
        store.dispatch(logout());
        renderApp();
        //history.push('/login');
    }
});
