export const authenticate = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then((response) => {
            
            dispatch(authenticationSuccess({response}));
        }).catch((error) => {
            dispatch(authenticationFailure({error}))
        });
    };
};

export const authenticationSuccess = ({response}) => ({

    type: 'LOGIN_SUCCESS',
    response
});

export const authenticationFailure = ({error}) => ({

    type: 'LOGIN_ERROR',
    error
});

export const logout = () => ({
    type: 'SIGNOUT_SUCCESS'
});
  
export const startSignOut = () => {
    return (dispatch,getState,{getFirebase}) => {
        const firebase = getFirebase();
        firebase.auth().signOut().then(() => {
            dispatch(logout());
        });
    };
};

//signup action
export const signUp = (userInfo) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        firebase.auth().createUserWithEmailAndPassword(
        userInfo.email, 
        userInfo.password
      ).then((userCredentials) => {
          
            return userCredentials.user.updateProfile({
                displayName: userInfo.firstName + ' ' + userInfo.lastName
            }).then(() => {
                
                dispatch(signUpSuccess());
            });
            
        }).catch((error) => {
            dispatch(signUpError(error));
        });
    }
};

export const signUpSuccess = () => {
    return { type: 'SIGNUP_SUCCESS' };
};

export const signUpError = (error) => {
    return { type: 'SIGNUP_ERROR',error: error };
};