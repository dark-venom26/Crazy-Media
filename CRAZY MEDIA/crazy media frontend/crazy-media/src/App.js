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


function App() {
  const authToken = localStorage.getItem('auth-token');
  return (
    <Router>
        <Routes>
          <Route path="/" element={authToken ? <Home /> : <Register/>} />
          <Route exact path="/login" element={authToken ? <Navigate to="/" /> : <Login />} />
          <Route exact path="/register" element={authToken ? <Navigate to="/" /> : <Register />} />
          <Route exact path="/profile/:username" element={<Profile />} />
        </Routes>
    </Router>
  )
}

export default App;
