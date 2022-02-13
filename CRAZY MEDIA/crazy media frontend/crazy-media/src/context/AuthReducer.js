const AuthReducer = (state, action) => {
    switch (action.type){
        case "LOGIN_START":
            return {
                ...state
            };
        case "LOGIN_SUCCESS":
            return {
                ...state,
                authToken: action.payload,
                isFetching: true,
            };
        case "GET_USER":
            return {
                ...state,
                user: action.payload,
            };
        case "LOGIN_FAILURE":
            return {
                ...state,
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
        case "POST":
            return {
                ...state,
                post: action.payload
            };
        default:
            return state;
    }
}

export default AuthReducer;