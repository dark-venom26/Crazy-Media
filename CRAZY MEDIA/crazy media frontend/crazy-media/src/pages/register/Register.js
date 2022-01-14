import './register.css'

function Register() {
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
                    <div className="registerContainer">
                        <input type="text" placeholder="Name" className="registerInput" />
                        <input type="text" placeholder="Email" className="registerInput" />
                        <input type="password" placeholder="Password" className="registerInput" />
                        <input type="password" placeholder="Confirm Password" className="registerInput" />
                        <button className="loginButton">Signup</button>
                        <button className="registerButton">Login into account</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
