import Topbar from "../../components/topbar/Topbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Feed from "../../components/feed/Feed"
import Rightbar from "../../components/rightbar/Rightbar"
import './home.css'
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthContext";

function Home() {
    const {user, socket} = useContext(AuthContext);
    const [onlineUsers, setOnlineUsers] = useState([]);

    // Adding user in through socket io
    useEffect(() => {
        var mount = true;
        socket?.current?.emit("addUser",user.user?._id);
        socket?.current?.on("getUsers", users=>{
            if(mount){
                setOnlineUsers(
                    user?.user?.followings?.filter((friend)=>users.some((u)=>u.userId === friend))
                    )
                }
            });
        return ()=>{
            mount = false;
        }
    }, [user,socket])

    return (
        <>
            <Topbar socket={socket}/>
            <div className="homeContainer">
                <Sidebar />
                <Feed username={false} />
                <Rightbar user={false} onlineUsers={onlineUsers}/>
            </div>
        </>
    )
}

export default Home
