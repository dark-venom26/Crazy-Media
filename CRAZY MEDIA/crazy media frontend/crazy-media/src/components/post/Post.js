import './post.css'
import { MoreVert } from '@material-ui/icons'
import { useState, useEffect, useContext } from 'react'
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
require('dotenv').config()

function Post(props) {
    
    const [user, setUser] = useState({})
    const {user:currentUser} = useContext(AuthContext)
    const authToken = localStorage.getItem("auth-token");
    const authTokenData = JSON.parse(authToken);
    const config = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "auth-token": authTokenData.authToken
        }
    }

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const likeHeart = {
        'like' : props.post.likes.length,
        'heart': props.post.hearts.length,
    }

    const isLikedHeart = {
        'like' : props.post.likes.includes(currentUser.user._id),
        'heart': props.post.hearts.includes(currentUser.user._id)
    }

    const [like, setLike] = useState(likeHeart)
    const [isLiked, setIsLiked] =  useState(isLikedHeart)

    const likeHeartHandler = async (newLikeHeart, isNewLikedHeart) =>{
        setLike(newLikeHeart)
        setIsLiked(isNewLikedHeart)
    }

    const likeHandler = () =>{
        let newLikeHeart = {
            'like' : isLiked.like ? like.like-1 : like.like+1,
            'heart': isLiked.heart? like.heart-1 : like.heart
        }

        let isNewLikedHeart = {
            'like': isLiked.like ? false : true,
            'heart': false
        }
        axios.put('/post/'+props.post._id+'/like', {}, config)
        if(isLiked.heart){
            axios.put('/post/'+props.post._id+'/heart', {}, config)
        }

        likeHeartHandler(newLikeHeart, isNewLikedHeart)
    }

    const heartHandler = () =>{    
        let newLikeHeart = {
            'like' : isLiked.like ? like.like-1 : like.like ,
            'heart': isLiked.heart ? like.heart-1 : like.heart+1
        }

        let isNewLikedHeart = {
            'like': false,
            'heart': isLiked.heart ? false : true
        }
        axios.put('/post/'+props.post._id+'/heart', {}, config)
        if(isLiked.like){
            axios.put('/post/'+props.post._id+'/like', {}, config)
        }

        likeHeartHandler(newLikeHeart, isNewLikedHeart)
    }
    
    useEffect(() => {
        const fetchUser = async ()=>{
            const res = await axios.get(`/user?userId=${props.post.userId}`)
            setUser(res.data)
        }
        fetchUser()
    }, [props.post.userId])

    return (
        <div className= "post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`/profile/${user.username}`}>
                        <img className="postProfileImg" src={user.profilePicture ? PF + user.profilePicture : user?.gender ===2 ? PF + "persons/woman.png" : PF + "persons/man.png"} alt="" />
                        </Link>
                        <span className="postUsername">{user.username}</span>
                        <span className="postDate">{format(props.post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert/>
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{props.post.desc}</span>
                    <img className="postImg" src={PF + props.post?.img} alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className="likeIcon" src={`${PF}like.png`} alt="" onClick={likeHandler} />
                        <span className="postLikeCounter">{like.like}</span>
                        <img className="likeIcon" src={`${PF}heart.png`} alt="" onClick={heartHandler} />
                        <span className="postLikeCounter">{like.heart}</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{props.post.comment} comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post
