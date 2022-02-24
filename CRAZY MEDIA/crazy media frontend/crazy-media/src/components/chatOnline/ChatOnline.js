import axios from 'axios';
import { useEffect, useState } from 'react';
import './chatOnline.css'

function ChatOnline(props) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const {onlineUsers, currentUser, setCurrentChat} = props;
  const authToken = localStorage.getItem("auth-token");
  const authTokenData = JSON.parse(authToken);

  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  
  useEffect(() => {
    if(currentUser){
      const config = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "auth-token": authTokenData.authToken
        }
      }
      const getFriends = async () => {
        const res = await axios.get("/user/friends/", config);
        setFriends(res.data);
      }
      getFriends()
    }

  }, [currentUser,authTokenData.authToken])

  useEffect(() => {
    setOnlineFriends(friends.filter((friend)=> onlineUsers?.includes(friend._id)))
  }, [friends,onlineUsers]);
  
  const handleClick = async (user) =>{
    try {
      let res = await axios.get(`/conversation/find/${currentUser}/${user._id}`);
      const config = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "auth-token": authTokenData.authToken
        }
      }
      if(!res.data){
        const data = {
          'senderId': currentUser,
          'receiverId': user._id
        }
        res = await axios.post(`/conversation`,data,config);
      }
      setCurrentChat(res.data)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='chatOnline'>
      {onlineFriends.length === 0 ? "No one is Online" : onlineFriends.map((friends)=>(
        <div key={friends._id} className="chatOnlineFriend" onClick={()=>handleClick(friends)}>
            <div className="chatOnlineImgContainer">
                <img src={friends.profilePicture ? PF + friends.profilePicture : friends?.gender ===2 ? "/asssets/persons/woman.png" : "/assets/persons/man.png"} alt="" className='chatOnlineImg'/>
                <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineName">{friends.username}</span>
        </div>
      ))}
    </div>
  )
}

export default ChatOnline