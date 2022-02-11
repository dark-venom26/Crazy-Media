import axios from "axios"

export const loginCall = async (userCredential, dispatch) => {
    dispatch({type: "LOGIN_START"});
    try{
        const credentials = await axios.post("auth/login", userCredential);
        dispatch({type: "LOGIN_SUCCESS", payload: credentials.data});
        
        if(credentials.data.success){
            const config = {
                headers: {
                  "auth-token": credentials.data.authToken
                }
            };
            const userDetails = await axios.get("/auth/getuser", config);
            const authTokenData = JSON.stringify(credentials.data)
            localStorage.setItem("auth-token", authTokenData);
            dispatch({type: "GET_USER", payload: userDetails.data});
        }
    }catch(err){
        dispatch({type: "LOGIN_FAILURE", payload: err});
    }
}

export const logoutCall = async (dispatch) => {
    localStorage.removeItem("auth-token");
    dispatch({type: "LOGOUT_SUCCESS"});
}

export const getUserCall = async (authToken, dispatch) => {
    const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "auth-token": authToken
        }
      }
    try{
        const res = await axios.get("/auth/getuser", config);
        dispatch({type: "GET_USER", payload: res.data});
    }catch(err){
        dispatch({type: "LOGIN_FAILURE", payload: err});
    }
}