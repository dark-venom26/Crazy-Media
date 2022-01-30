import axios from "axios"

export const loginCall = async (userCredential, dispatch) => {
    dispatch({type: "LOGIN_START"});
    try{
        const credentials = await axios.post("auth/login", userCredential);
        dispatch({type: "LOGIN_SUCCESS", payload: credentials.data});
        
        if(credentials.data.success){
            const config = {
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "auth-token": credentials.data.authToken
                }
            };
            const userDetails = await axios.get("auth/getuser", config);
            dispatch({type: "GET_USER", payload: userDetails.data});
            localStorage.setItem("auth-token", credentials.data.authToken);
        }
    }catch(err){
        dispatch({type: "LOGIN_FAILURE", payload: err});
    }
}

export const logoutCall = async (dispatch) => {
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
        const res = await axios.get("auth/getuser", config);
        dispatch({type: "GET_USER", payload: res.data});
    }catch(err){
        dispatch({type: "LOGIN_FAILURE", payload: err});
    }
}