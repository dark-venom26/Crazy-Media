import Topbar from "../../components/topbar/Topbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Feed from "../../components/feed/Feed"
import Rightbar from "../../components/rightbar/Rightbar"
import './profile.css'
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    const username = useParams().username;

    useEffect(() => {
        const fetchUser = async ()=>{
            const res = await axios.get(`/user?username=${username}`);
            setUser(res.data)
        }
        fetchUser()
    }, [username])

    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar/>
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img className="profileCoverImage" src={user.coverPicture || PF + "persons/noCover.jpg"} alt="" />
                            <img className="profileUserImage" src={user.profilePicture ? PF + user.profilePicture : user?.gender ===2 ? PF + "persons/woman.png" : PF + "persons/man.png"} alt="" />
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
