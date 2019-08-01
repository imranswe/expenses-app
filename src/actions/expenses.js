export const addExpense = (expense) => (
    {
        type: 'ADD_EXPENSE',
        expense
    }
);

export const startAddExpense = (expenseData = {}) => {
    return (dispatch,getState, {getFirebase}) => {
        const {
            description = '',
            note = '',
            amount = 0,
            createdAt = 0
        } = expenseData;

        
        const firebase = getFirebase();
        //const profile = getState().firebase.profile;
        const userId = getState().firebase.auth.uid;
        const database = firebase.database();
        const expense = {description, amount, note, createdAt};
        return database.ref(`users/${userId}/expenses`).push(expense).then((ref) =>{
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }));
        });
    };
};

export const startEditExpense = (id,expense) => {

    return (dispatch,getState, {getFirebase}) => {
        const firebase = getFirebase();
        const database = firebase.database();
        const userId = getState().firebase.auth.uid;
        return database.ref(`users/${userId}/expenses/${id}`).update(expense).then(() => {
            dispatch(editExpense(id,expense));
        });
    };
};

export const editExpense = (id,updates) => (
    {
        type: 'EDIT_EXPENSE',
        id,
        updates
    }
);

export const startRemoveExpense = ({id} = {}) => {

    return (dispatch,getState, {getFirebase}) => {
        const firebase = getFirebase();
        const database = firebase.database();
        const userId = getState().firebase.auth.uid;
        return database.ref(`users/${userId}/expenses/${id}`).remove().then(() => {
            dispatch(removeExpense({id}));
        }).catch((e) => {
            console.log('Error removing data',e);
        });     
    }
};

export const removeExpense = ({id} = {}) => (
    {
        type: 'REMOVE_EXPENSE',
        id: id
    }
);


export const setExpenses = (expensesList) => ({
    type: 'SET_EXPENSES',
    expenses: expensesList
});

export const startSetExpenses = () => {

    return (dispatch,getState, {getFirebase}) => {
        const firebase = getFirebase();
        const database = firebase.database();
        const userId = getState().firebase.auth.uid;
        return database.ref(`users/${userId}/expenses`).once('value')
        .then((snapshot) => {
            const expenses = [];
            snapshot.forEach((childSnapshot) => {
                expenses.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            dispatch(setExpenses(expenses));
        });
    }
}