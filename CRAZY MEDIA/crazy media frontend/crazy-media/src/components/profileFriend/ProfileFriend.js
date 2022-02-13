import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './profileFriend.css'

function ProfileFriend(props) {
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
        <div className="rightbarFollowing">
            <Link to={`/profile/${user.username}`} className="rightbarFollowingName">
                <img src={user.profilePicture ? PF + user.profilePicture : user?.gender ===2 ? "/asssets/persons/woman.png" : "/assets/persons/man.png"} alt="" className="rightbarFollowingImg" />
                <span >{user.username}</span>
            </Link>
        </div>
    );
}

export default ProfileFriend;
