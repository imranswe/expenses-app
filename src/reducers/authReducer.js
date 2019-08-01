const initialState = {
    authError: null
};

const authReducer = (state = initialState, action) => {
    
    switch(action.type){
        
        case 'SIGNUP_SUCCESS':
            return {
                ...state,
                authError: null
            }
        break;
        case 'SIGNUP_ERROR':
            return {
                ...state,
                authError: action.error.message
            }
        break;
        case 'LOGIN_SUCCESS': 
            return {
                ...state,
                authError: null
            }
        break;
        case 'LOGIN_ERROR':
            return {
                ...state,
                authError: action.error.message
            }
        break;
        case 'SIGNOUT_SUCCESS':
            state = {};
            return state;
        break;
        default:
            return state;
        break;
    }
}

export default authReducer;