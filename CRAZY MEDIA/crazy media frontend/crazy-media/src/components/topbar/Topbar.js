import './topbar.css'
import { Search, Person, Chat, Notifications } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { logoutCall } from '../../apiCalls';

function Topbar() {
    const {dispatch} = useContext(AuthContext);
    const logout = () => {
        localStorage.removeItem("auth-token");
        logoutCall(dispatch);
    }
    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to="/" className="logo">Crazy Media</Link>
                <Link to="/login" onClick={logout} className="topbarLink logout">Logout</Link>
            </div>
            <div className="topbarCenter">
                <div className="searchBar">
                    <Search className="searchIcon" />
                    <input type="text" placeholder="Search for friend, post or video" className="searchInput" />
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLink">Home</span>
                    <span className="topbarLink">Timeline</span>
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
                <img src="/assets/users/1.jpg" alt="" className="topbarImg" />
            </div>
        </div>
    )
}

export default Topbar
