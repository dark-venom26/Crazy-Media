import './message.css'
import {format} from 'timeago.js'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function Message(props) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [sender, setSender] = useState(null)


  useEffect(()=>{
    if(props.own){
      setSender(props.currentUser);
    }else{
      setSender(props.reciever);
    }
  },[props.currentUser,props.reciever,props.own])

  
  return (
    <div className={props.own ? 'message own' : 'message'}>
        <div className="messageTop">
        <Link to={`/profile/${sender?.username}`}>
          <img className='messageImg' src={sender?.profilePicture ? PF + sender?.profilePicture : sender?.gender ===2 ? "/asssets/persons/woman.png" : "/assets/persons/man.png"} alt="" />
        </Link>
            <p className='messageText'>{props.message.text}</p>
        </div>
        <div className="messageBottom">{format(props.message.createdAt)}</div>
    </div>
  )
}

export default Message