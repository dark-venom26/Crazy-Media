import './messenger.css'
import Topbar from '../../components/topbar/Topbar'
import Conversation from '../../components/conversations/Conversation'
import Message from '../../components/message/Message'
import { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import ChatOnline from '../../components/chatOnline/ChatOnline'
import axios from 'axios'

function Messenger() {
    const { user, socket } = useContext(AuthContext);
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [reciever, setReciever] = useState([]);
    const scrollRef = useRef();
    const authToken = localStorage.getItem("auth-token");
    const authTokenData = JSON.parse(authToken);

    useEffect(() => {
        var mount = true;
        const getConversations = async () => {
            try {
                const config = {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "auth-token": authTokenData.authToken
                    }
                }

                const res = await axios.get("/conversation/", config)
                if(mount){
                    setConversations(res.data)
                }
            } catch (err) {
                console.log(err);
            }
        }
        getConversations()
        return ()=>{
            mount = false;
        }
    }, [authTokenData.authToken])

    useEffect(() => {
        var mount = true;
        const getMessages = async () => {
            try {
                if (currentChat) {
                    const res = await axios.get('/message/' + currentChat?._id);
                    const recieverRes = await axios.get("/user?userId=" + currentChat?.members?.filter(member => { return member !== user.user._id }));
                    if(mount){
                        setMessages(res.data);
                        setReciever(recieverRes.data)
                    }
                }
            } catch (err) {
                console.log(err);
            }
        }
        getMessages()
        return ()=>{
            mount = false;
        }
    }, [currentChat, user])

    // Adding user in through socket io
    useEffect(() => {
        var mount = true;
        socket?.current?.emit("addUser", user.user?._id);
        socket?.current?.on("getUsers", users => {
            if(mount){
                setOnlineUsers(
                    user?.user?.followings?.filter((friend) => users.some((u) => u.userId === friend))
                )
            }
        });
        return ()=>{
            mount = false;
        }
    }, [user,socket])

    // Getting Messages using socket io
    useEffect(() => {
        var mount = true;
        socket?.current?.on("getMessage", data => {
            if(mount){
                setArrivalMessage({
                    _id: data.id,
                    sender: data.senderId,
                    text: data.text,
                    createdAt: data.createdAt,
                })
            }
        })
        return ()=>{
            mount = false;
        }
    }, [socket])


    useEffect(() => {
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) && setMessages((prevMsg) => [...prevMsg, arrivalMessage])
    }, [arrivalMessage, currentChat])

    const handleMsgSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: user.user._id,
            text: newMessage,
            conversationId: currentChat._id
        };

        try {
            const res = await axios.post('./message', message);
            setMessages([...messages, res.data]);

            socket.current.emit("sendMessage", {
                id: res.data._id,
                senderId: res.data.sender,
                receiverId: reciever._id,
                text: res.data.text,
                createdAt: res.data.createdAt,
            });

            setNewMessage("");
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ block: 'nearest', behavior: "smooth" })
    }, [messages]);


    return (
        <>
            <Topbar socket={socket} />
            <div className='messenger'>
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input type="text" placeholder='Search for friends' className='chatMenuInput' />
                        {conversations.map((conv) => (
                            <div key={conv._id} onClick={() => setCurrentChat(conv)}>
                                <Conversation conversation={conv} />
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
                                        {messages.map(message => (
                                            <div key={message._id} ref={scrollRef}>
                                                <Message message={message} reciever={reciever} currentUser={user.user} own={message.sender === user.user._id} />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="chatBoxBottom">
                                        <textarea name="chatMessageInput" onChange={(e) => setNewMessage(e.target.value)} value={newMessage} className='chatMessageInput' placeholder='Write something....' id=""></textarea>
                                        <button className='chatSubmitButton' onClick={handleMsgSubmit}>Send</button>
                                    </div>
                                </>) : (<span className='openConversation'>Open a conversation to start a chat</span>)}
                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline onlineUsers={onlineUsers} currentUser={user.user?._id} setCurrentChat={setCurrentChat} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Messenger