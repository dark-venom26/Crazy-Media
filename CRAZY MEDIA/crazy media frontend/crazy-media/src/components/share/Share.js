import './share.css'
import { Cancel, EmojiEmotions, Label, PermMedia, Room } from '@material-ui/icons'
import { useContext, useRef, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import { CircularProgress } from '@material-ui/core'
import { useParams } from 'react-router-dom'
require('dotenv').config()

function Share() {
    const username = useParams().username;

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user, dispatch} = useContext(AuthContext);
    const desc = useRef()
    const [file, setFile] = useState(null);
    const [shareDisable, setShareDisable] = useState(false)

    const authToken = localStorage.getItem("auth-token");
    const authTokenData = JSON.parse(authToken);
    const config = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "auth-token": authTokenData.authToken
        }
    }
    
    
    const submitHandler = async (e) => {
        e.preventDefault()
        setShareDisable(true)
        const newPost = {
            userId: user?.user?._id,
            desc: desc.current.value
        }
        if(file){
            let data = new FormData();
            const fileName = Date.now() + file.name;
            data.append('name',fileName)
            data.append('file',file)
            newPost.img = fileName
            try{
                await axios.post("/upload",data);
            }catch(err){
                console.log(err);
            }
        }
        
        try {
            await axios.post('/post',newPost, config)
            desc.current.value = ""
            setFile(null)
            setShareDisable(false)

            const posts = username ? await axios.get("/post/profile/" + username) : await axios.get('/post/timeline/all',config)
            dispatch({type: "POST", payload: posts.data});

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="share">
            <div className="shareWrapper">
                <form onSubmit={submitHandler} className="shareBottom">
                <div className="shareTop">
                    <img className="shareProfileImg" src={user.user?.profilePicture ? PF + user?.user?.profilePicture : user?.user?.gender ===2 ? "/asssets/persons/woman.png" : "/assets/persons/man.png"} alt="" />
                    <input name='desc' minLength="2" placeholder={"What's in your mind " + user?.user?.username + "?"} className="shareInput" ref={desc} required/>
                </div>
                <hr className="shareHr" />
                {file && (
                    <div className="shareImgContainer">
                        <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
                        <Cancel className='shareCancelImg' onClick={()=>setFile(null)}/>
                    </div>
                )}
                    <div className="shareOptions">
                        <label htmlFor='file' className="shareOption">
                            <PermMedia htmlColor="tomato" className="shareIcon"/>
                            <div className="shareOptionText">Photo / Video</div>
                            <input name='file' type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e)=>setFile(e.target.files[0])}/>
                        </label>
                        <div className="shareOption">
                            <Label htmlColor="blue" className="shareIcon"/>
                            <div className="shareOptionText">Tag</div>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor="green" className="shareIcon"/>
                            <div className="shareOptionText">Location</div>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                            <div className="shareOptionText">Feelings</div>
                        </div>
                        <button type='submit' className="shareButton" disabled={shareDisable}>{shareDisable? <CircularProgress color="inherit" size="15px"/> :"Share"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Share
