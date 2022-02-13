const AuthReducer = (state, action) => {
    switch (action.type){
        case "LOGIN_START":
            return {
                ...state
            };
        case "LOGIN_SUCCESS":
            return {
                authToken: action.payload,
                user: {success: false, user: null},
                isFetching: true,
                error: false
            };
        case "GET_USER":
            return {
                ...state,
                user: action.payload,
            };
        case "LOGIN_FAILURE":
            return {
                authToken: {success: false, authToken: null},
                user: {success: false, user: null},
                isFetching: false,
                error: action.payload
            };
        case "LOGOUT_SUCCESS":
            return {
                authToken: {success: false, authToken: null},
                user: {success: false, user: null},
                isFetching: false,
                error: false
            };
        case "FOLLOW":
            return {
                ...state,
                user: {
                    ...state.user,
                    user: {
                        ...state.user.user,
                        followings: [...state.user?.user?.followings, action.payload],
                    },
                },
            };
        case "UNFOLLOW":
            return {
                ...state,
                user: {
                    ...state.user,
                    user: {
                        ...state.user.user,
                        followings: state.user?.user?.followings?.filter(
                            (followings)=> followings !== action.payload
                        )
                    },
                },
            };
        default:
            return state;
    }
}

export default AuthReducer;