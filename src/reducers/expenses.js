//expenses reducer
const defaultExpenses = [];
export default (state = defaultExpenses,action) => {
    
    switch(action.type){

        case 'SET_EXPENSES':
            return action.expenses;
        break;
        case 'ADD_EXPENSE':
            return state.concat(action.expense);
        break;
        case 'EDIT_EXPENSE':
            return state.map((expense) =>{
                if(expense.id === action.id){
                    return {
                        ...expense,
                        ...action.updates
                    }
                }
                else {
                    return expense;
                }
            });
        break;
        case 'REMOVE_EXPENSE':
            return state.filter(({id})=> id !== action.id);
        break;
        default:
            return state;
    }
};