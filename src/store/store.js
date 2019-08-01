import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import firebase from '../config/firebase';

export default () => {
    
    const store = createStore(rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument({getFirebase})),
        reactReduxFirebase(firebase, {userProfile: 'users', enableLogging: false, attachAuthIsReady: true})
    ));

    return store;
}
  
