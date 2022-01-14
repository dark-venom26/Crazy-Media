import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'


function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/profile/:username" element={<Profile />} />
        </Routes>
    </Router>
  )
}

export default App;
