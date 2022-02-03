const AuthReducer = (state, action) => {
    switch (action.type){
        case "LOGIN_START":
            return {
                authToken: {success: false, authToken: null},
                user: {success: false, user: null},
                isFetching: true,
                error: false
            };
        case "LOGIN_SUCCESS":
            return {
                authToken: action.payload,
                user: {success: false, user: null},
                isFetching: true,
                error: false
            };
        case "LOGIN_FAILURE":
            return {
                authToken: {success: false, authToken: null},
                user: {success: false, user: null},
                isFetching: false,
                error: action.payload
            };
        case "GET_USER":
            return {
                authToken: {success: false, authToken: null},
                user: action.payload,
                isFetching: false,
                error: false
            };
        case "LOGOUT_SUCCESS":
            return {
                authToken: {success: false, authToken: null},
                user: {success: false, user: null},
                isFetching: false,
                error: false
            };
        default:
            return state;
    }
}

export default AuthReducer;