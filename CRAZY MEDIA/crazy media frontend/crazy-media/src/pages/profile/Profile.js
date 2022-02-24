import Topbar from "../../components/topbar/Topbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Feed from "../../components/feed/Feed"
import Rightbar from "../../components/rightbar/Rightbar"
import './profile.css'
import { useContext, useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { AuthContext } from "../../context/AuthContext"
import {io} from 'socket.io-client';

function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    const username = useParams().username;
    const {user:currentUser,dispatch} = useContext(AuthContext);
    const { socket } = useContext(AuthContext);
    const newsocket = useRef();
    
    if(!socket){
        newsocket.current = io("ws://localhost:8400");
        dispatch({type: "SOCKET", payload: socket});
    }
  
    useEffect(() => {
        var mount = true;
        const fetchUser = async ()=>{
            const res = await axios.get(`/user?username=${username}`);
            if(mount){
                setUser(res.data)
            }
        }
        fetchUser()
        return ()=>{
            mount = false;
        }
    }, [username])

    // Adding user in through socket io
    useEffect(() => {
        socket?.current?.emit("addUser", currentUser.user?._id);
    }, [socket, currentUser.user?._id])

    return (
        <>
            <Topbar socket={socket}/>
            <div className="profile">
                <Sidebar/>
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img className="profileCoverImage" src={user.coverPicture ? PF + user.coverPicture : "/assets/persons/noCover.jpg"} alt="" />
                            <img className="profileUserImage" src={user.profilePicture ? PF + user.profilePicture : user?.gender ===2 ? "/asssets/persons/woman.png" : "/assets/persons/man.png"} alt="" />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                            <span className="profileInfoDesc">{user.desc}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={username}/>
                        <Rightbar user={user}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
