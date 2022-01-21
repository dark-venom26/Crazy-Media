import axios from 'axios';
import { useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './register.css'

function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const confirmPassword = useRef();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(confirmPassword.current.value !== password.current.value){
            password.current.setCustomValidity("Passwords don't match");
        }else{
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value
            }
            try{
                await axios.post("/auth/register", user);
                navigate('/login');
            }catch(err){

            }
        }
    }

    return (
        <div className="register">
            <img className="background" src="assets/background2.jpg" alt="" />
            <div className="registerWrapper">
                <div className="registerLeft">
                    <h3 className="registerLogo">Crazy Media</h3>
                    <span className="registerDesc">
                        Connect with us and show the world how much crazy you are.
                    </span>
                </div>
                <div className="registerRight">
                    <form onSubmit={handleSubmit} className="registerContainer">
                        <input type="text" ref={username} placeholder="Name" className="registerInput" required/>
                        <input type="email" ref={email} placeholder="Email" className="registerInput" required/>
                        <input type="password" ref={password} placeholder="Password" minLength="5" className="registerInput" required/>
                        <input type="password" ref={confirmPassword} placeholder="Confirm Password" minLength="5" className="registerInput" required/>
                        <button type="submit" className="loginButton">Signup</button>
                        <div className='registerButton'>
                            <Link to="/login">Login into account</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
