import './share.css'
import { EmojiEmotions, Label, PermMedia, Room } from '@material-ui/icons'
import { useContext, useRef, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
require('dotenv').config()

function Share() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user} = useContext(AuthContext);
    const desc = useRef()
    const [file, setFile] = useState(null);
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
            window.location.reload()
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className="shareProfileImg" src={user?.success ? PF + user?.user?.profilePicture : user?.user?.gender ===2 ? PF + "persons/woman.png" : PF + "persons/man.png"} alt="" />
                    <input placeholder={"What's in your mind " + user?.user?.username + "?"} className="shareInput" ref={desc}/>
                </div>
                <hr className="shareHr" />
                <form onSubmit={submitHandler} className="shareBottom">
                    <div className="shareOptions">
                        <label htmlFor='file' className="shareOption">
                            <PermMedia htmlColor="tomato" className="shareIcon"/>
                            <div className="shareOptionText">Photo / Video</div>
                            <input type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e)=>setFile(e.target.files[0])}/>
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
                    </div>
                    <button type='submit' className="shareButton">Share</button>
                </form>
            </div>
        </div>
    )
}

export default Share
