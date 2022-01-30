import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";


function App() {
  const {user} = useContext(AuthContext);
  const authToken = localStorage.getItem('auth-token');
  var login = false;
  if((authToken !== undefined && authToken !== null) || user?.success){
    login = true
  }

  return (
    <Router>
        <Routes>
          <Route path="/" element={login ? <Home /> : <Navigate to="/register"/>} />
          <Route exact path="/login" element={login ? <Navigate to="/" /> : <Login />} />
          <Route exact path="/register" element={login ? <Navigate to="/" /> : <Register />} />
          <Route exact path="/profile/:username" element={<Profile />} />
        </Routes>
    </Router>
  )
}

export default App;
