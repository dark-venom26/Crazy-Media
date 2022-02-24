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
import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "./context/AuthContext";
import { getUserCall } from "./apiCalls";
import Messenger from "./pages/messenger/Messenger";
import {io} from 'socket.io-client';


function App() {
  const {user, dispatch} = useContext(AuthContext);
  const authToken = localStorage.getItem('auth-token');
  const authTokenData = JSON.parse(authToken);
  const socket = useRef();

  // Socket
  useEffect(() => {
    socket.current = io("ws://localhost:8400");
    dispatch({type: "SOCKET", payload: socket});
  }, [socket, dispatch])


  var login = false;
  
  if(authTokenData?.success || user?.success){
    login = true
  }
  if(authTokenData?.success && user?.success === false){
    getUserCall(authTokenData.authToken, dispatch)
  }

  return (
    <Router>
        <Routes>
          <Route path="/" element={login ? <Home /> : <Navigate to="/register"/>} />
          <Route exact path="/login" element={login ? <Navigate to="/" /> : <Login />} />
          <Route exact path="/register" element={login ? <Navigate to="/" /> : <Register />} />
          <Route exact path="/profile/:username" element={<Profile />} />
          <Route exact path="/messenger" element={login ? <Messenger /> : <Navigate to="/"/> } />
        </Routes>
    </Router>
  )
}

export default App;
