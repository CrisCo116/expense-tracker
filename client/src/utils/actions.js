export const loginSuccess = (user) => {
    return {
        type: 'LOGIN_SUCCESS',
        user
    };
};

export const loginError = (error) => {
    return {
        type: 'LOGIN_ERROR',
        error  
    };
};

export const addExpense = (expense) => {
    return {
        type: 'ADD_EXPENSE',
        expense
    };
};