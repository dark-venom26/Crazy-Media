import './conversation.css'
import { AuthContext } from '../../context/AuthContext'
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

function Conversation(props) {
  const {conversation} = props;
  const {user:currentUser} = useContext(AuthContext);
  const [user, setUser] = useState(null)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(()=>{
    const friendId = conversation.members.find((id)=> id !== currentUser.user._id);
    var mount = true;
    const getUser = async () =>{
      try {
        
        const res = await axios.get("/user?userId="+friendId);
        if(mount){
          setUser(res.data)
        }
      } catch (err) {
        console.log(err);
      }
    }
    getUser()
    return()=>{
      mount = false
  }
  },[currentUser.user._id,conversation.members])

  return (
    <div className='conversation'>
      <img src={user?.profilePicture ? PF + user?.profilePicture : user?.gender ===2 ? "/asssets/persons/woman.png" : "/assets/persons/man.png"} alt="" className="conversationImg" />
      <span className="conversationName">{user?.username}</span>
    </div>
  )
}

export default Conversation