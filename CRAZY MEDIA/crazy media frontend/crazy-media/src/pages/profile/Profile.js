import Topbar from "../../components/topbar/Topbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Feed from "../../components/feed/Feed"
import Rightbar from "../../components/rightbar/Rightbar"
import './profile.css'
import { useEffect, useState } from "react"
import axios from "axios"

function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({})

    useEffect(() => {
        const fetchUser = async ()=>{
            const res = await axios.get(`/user?username=Ragnar Lothbrok`)
            setUser(res.data)
        }
        fetchUser()
    }, [])

    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar/>
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img className="profileCoverImage" src={user.coverPicture || PF + "person/noCover"} alt="" />
                            <img className="profileUserImage" src={user.profilePicture || PF + "person/avtar"} alt="" />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                            <span className="profileInfoDesc">{user.desc}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={user.username}/>
                        <Rightbar user={user}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
