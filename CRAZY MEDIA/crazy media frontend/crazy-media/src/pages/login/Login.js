import './login.css'

function Login() {
    return (
        <div className="login">
            <img className="background" src="assets/background2.jpg" alt="" />
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Crazy Media</h3>
                    <span className="loginDesc">
                        Connect with us and show the world how much crazy you are.
                    </span>
                </div>
                <div className="loginRight">
                    <div className="loginContainer">
                        <input type="text" placeholder="Email" className="loginInput" />
                        <input type="password" placeholder="Password" className="loginInput" />
                        <button className="loginButton">Log in</button>
                        <span className="loginForget">Forget Password?</span>
                        <button className="registerButton">Create a New Account</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
