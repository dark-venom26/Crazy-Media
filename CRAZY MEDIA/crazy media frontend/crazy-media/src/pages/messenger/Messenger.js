import './messenger.css'
import Topbar from '../../components/topbar/Topbar'
import Conversation from '../../components/conversations/Conversation'
import Message from '../../components/message/Message'
import { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import ChatOnline from '../../components/chatOnline/ChatOnline'
import axios from 'axios'

function Messenger() {
    const {user} = useContext(AuthContext);
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [reciever, setReciever] = useState([]);
    const scrollRef = useRef();
    const authToken = localStorage.getItem("auth-token");
    const authTokenData = JSON.parse(authToken);
    
    useEffect(() => {
      const getConversations = async()=>{
        try {
            const config = {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "auth-token": authTokenData.authToken
                }
            }
        
            const res = await axios.get("/conversation/", config)
            setConversations(res.data)
        } catch (err) {
            console.log(err);
        }
    }
      getConversations()
    }, [authTokenData.authToken])

    useEffect(() => {
      const getMessages = async () =>{
          try {
            if(currentChat){
                const res = await axios.get('/message/'+ currentChat?._id);
                setMessages(res.data);
                const recieverRes = await axios.get("/user?userId="+currentChat?.members?.filter(member=>{return member!==user.user._id}));
                setReciever(recieverRes.data)
            }
          } catch (err) {
            console.log(err);
          }
      }
      getMessages()
    }, [currentChat,user])

    const handleMsgSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: user.user._id,
            text: newMessage,
            conversationId : currentChat._id
        };

        try {
            const res = await axios.post('./message', message);
            setMessages([...messages, res.data])
            setNewMessage("")
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({block: 'nearest', behavior: "smooth"})
    },[messages]);
        

    return (
        <>
            <Topbar />
            <div className='messenger'>
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input type="text" placeholder='Search for friends' className='chatMenuInput'/>
                        {conversations.map((conv)=>(
                            <div key={conv._id} onClick={()=>setCurrentChat(conv)}>
                                <Conversation conversation={conv}/>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        { 
                        currentChat ?
                        (<>
                        <div className="chatBoxTop">
                            {messages.map(message=>(
                                <div key={message._id} ref={scrollRef}>
                                    <Message message={message} reciever={reciever} currentUser={user.user} own={message.sender === user.user._id}/>
                                </div>
                            ))}
                        </div>
                        <div className="chatBoxBottom">
                            <textarea name="chatMessageInput" onChange={(e)=>setNewMessage(e.target.value)} value={newMessage} className='chatMessageInput' placeholder='Write something....' id=""></textarea>
                            <button className='chatSubmitButton' onClick={handleMsgSubmit}>Send</button>
                        </div>
                        </>) : (<span className='openConversation'>Open a conversation to start a chat</span>)}
                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                    <ChatOnline/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Messenger