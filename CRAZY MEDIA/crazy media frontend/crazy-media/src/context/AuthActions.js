export const LoginStart = (userCredentials) => ({
    type: "LOGIN_START",
});

export const LoginSuccess = (authToken) => ({
    type: "LOGIN_SUCCESS",
    payload: authToken
});

export const LogoutSuccess = () => ({
    type: "LOGOUT_SUCCESS",
});

export const LoginFailure = (error) => ({
    type: "LOGIN_FAILURE",
    payload: error
});

export const GetUser = (user) => ({
    type: "GET_USER",
    payload: user
})

export const Follow = (userId) => ({
    type: "FOLLOW",
    payload:userId
})

export const UnFollow = (userId) => ({
    type: "UNFOLLOW",
    payload:userId
})
