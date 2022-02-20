import './login.css'
import {useContext, useEffect, useRef} from 'react'
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import {CircularProgress} from '@material-ui/core'
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const email = useRef();
    const password = useRef();
    const navigate = useNavigate();

    // eslint-disable-next-line
    const {authToken, user, isFetching, error, dispatch} = useContext(AuthContext);
    
    const handleClick = async (e) =>{
        e.preventDefault();
        loginCall({email: email.current.value, password: password.current.value}, dispatch);
    }
    
    useEffect(()=>{
        if(authToken?.success && user?.success){
            navigate('/');
        }
    })
    
    
    return (
        <div className="login">
            <div className="background"></div>
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Crazy Media</h3>
                    <span className="loginDesc">
                        Connect with us and show the world how much crazy you are.
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginContainer" onSubmit={handleClick}>
                        <input type="email" placeholder="Email" ref={email} className="loginInput" required/>
                        <input type="password" placeholder="Password" minLength="5" ref={password} className="loginInput" required/>
                        <button className="loginButton" type='submit' disabled={isFetching}>{isFetching ? <CircularProgress color="inherit" size="25px"/> : "Log In"}</button>
                        <span className="loginForget">Forget Password?</span>
                        <Link to="/register" className="registerButton">Create a New Account</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
