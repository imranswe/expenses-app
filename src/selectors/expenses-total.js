
export default (expenses = []) => {
    
    const total =  expenses.reduce((accumulator, expense) => accumulator + parseInt(expense.amount),0);

    return total;
};