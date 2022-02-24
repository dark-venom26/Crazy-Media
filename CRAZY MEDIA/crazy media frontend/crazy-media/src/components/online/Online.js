import './online.css'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Online(props) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { onlineUsers, currentUser } = props;

    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);


    useEffect(() => {
        var mount = true;
        if (currentUser) {

            const authToken = localStorage.getItem("auth-token");
            const authTokenData = JSON.parse(authToken);
            const config = {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "auth-token": authTokenData.authToken
                }
            }
            const getFriends = async () => {
                const res = await axios.get("/user/friends/", config);
                if(mount){
                    setFriends(res.data);
                }
            }
            getFriends()
        }
        return ()=>{
            mount = false;
        }

    }, [currentUser])


    useEffect(() => {
        var mount = true;
        if(mount){
            setOnlineFriends(friends.filter((friend) => onlineUsers?.includes(friend._id)))
        }
        return ()=>{
            mount = false;
        }

    }, [friends, onlineUsers]);
    

    return (
        <>
            {onlineFriends.length === 0 ? "No one is Online" : onlineFriends.map((friends) => (
                <li key={friends._id} className="rightbarFriend">
                    <div className="rightbarProfileImgContainer">
                        <Link to={`/profile/${friends.username}`}>
                            <img src={friends.profilePicture ? PF + friends.profilePicture : friends.gender === 2 ? "/asssets/persons/woman.png" : "/assets/persons/man.png"} alt="" className="rightbarProfileImg" />
                            <span className="rightbarOnline"></span>
                        </Link>

                    </div>
                    <span className="rightbarUsername">{friends.username}</span>
                </li>
            ))}
        </>
    )
}

export default Online
