import './topbar.css'
import { Search, Person, Chat, Notifications } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { logoutCall } from '../../apiCalls';
require('dotenv').config()

function Topbar() {
    const {user, dispatch} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const logout = () => {
        logoutCall(dispatch);
    }
    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to="/" className="logo">Crazy Media</Link>
                <Link to="/login" onClick={logout} className="topbarLink navigationLink">Logout</Link>
            </div>
            <div className="topbarCenter">
                <div className="searchBar">
                    <Search className="searchIcon" />
                    <input type="text" placeholder="Search for friend, post or video" className="searchInput" />
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <Link to={`/profile/${user.user?.username}`} className="topbarLink navigationLink">Home</Link>
                    <Link to="/" className="topbarLink navigationLink">Timeline</Link>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person />
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Chat />
                        <span className="topbarIconBadge">2</span>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications />
                        <span className="topbarIconBadge">4</span>
                    </div>
                </div>
                <Link to={`/profile/${user.user?.username}`}>
                    <img src={user.user?.profilePicture ? PF + user.user?.profilePicture : user.user?.gender ===2 ? "/asssets/persons/woman.png" : "/assets/persons/man.png"} alt="" className="topbarImg" />
                </Link>
            </div>
        </div>
    )
}

export default Topbar
