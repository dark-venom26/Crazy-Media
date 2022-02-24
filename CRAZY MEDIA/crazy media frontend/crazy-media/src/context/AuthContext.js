import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
    authToken: {"success": false, "authToken": null},
    user: {"success": false, "user": null},
    isFetching: false,
    error: false,
    post: null,
    socket: {}
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    return (
        <AuthContext.Provider value={{ authToken: state.authToken, user: state.user, isFetching: state.isFetching, error: state.error, post: state.post, socket: state.socket, dispatch}}>
            {children}
        </AuthContext.Provider>
    )

}