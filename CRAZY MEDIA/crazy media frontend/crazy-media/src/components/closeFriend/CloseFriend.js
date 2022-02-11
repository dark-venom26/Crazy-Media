import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './closeFriend.css'

function CloseFriend(props) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
     const [user, setUser] = useState({});
    useEffect(() => {
        const fetchData = async () =>{
            const res = await axios.get(`/user?userId=${props.user}`)
            setUser(res.data)
        }
        fetchData()
    }, [props.user]);
    
    return (
        <li className="sidebarFriend">
            <Link to={`/profile/${user.username}`}>
                <img src={user.profilePicture ? PF + user.profilePicture : user?.gender ===2 ? PF + "persons/woman.png" : PF + "persons/man.png"} alt="" className="sidebarFriendImg" />
            </Link>
            <span className="sidebarFriendName">{user.username}</span>
        </li>
    )
}

export default CloseFriend
