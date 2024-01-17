export const loginReducer = (state = {}, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...state,
                user: action.user,
                error: null,
            };
        case "LOGIN_ERROR":
            return {
                ...state,
                user: null,
                error: action.error,
            };
        default:
        return state;
    }
};

export const signupReducer = (state = {}, action) => {
    switch (action.type) {
        case "SIGNUP_SUCCESS":
            return {
                ...state,
                user: action.user,
                error: null,
            };
        case "SIGNUP_ERROR":
            return {
                ...state,
                user: null,
                error: action.error,
            };
        default:
        return state;
    }
};

export const expensesReducer = (state = [], action) => {
    switch(action.type) {
        case 'ADD_EXPENSE': 
            return [...state, action.expense];
            // other cases
        default:
        return state;
    }
};
