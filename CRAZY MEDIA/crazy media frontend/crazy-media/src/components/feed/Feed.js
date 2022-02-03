import axios from 'axios';
import { useState, useEffect } from 'react';
import Post from '../post/Post'
import Share from '../share/Share'
import './feed.css'

function Feed(props) {
    const [posts, setPosts] = useState([]);
    const authToken = localStorage.getItem("auth-token");
    const authTokenData = JSON.parse(authToken);
    
    useEffect(() => {
        const fetchPosts = async ()=>{
            const config = {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "auth-token": authTokenData.authToken
                }
            }
            try{
                const res = props.username ? await axios.get("/post/profile/" + props.username) : await axios.get("/post/timeline/all", config);
                setPosts(res.data);
            }catch(err){
                console.log(err);
            }
        }
        fetchPosts()
    }, [props.username, authTokenData.authToken])
    return (
        <div className="feed">
            <div className="feedWrapper">
                <Share/>
                {posts.length === 0 ? <p className='noPost'>No posts available</p> : posts.map((post)=>{
                    return <Post key={post._id} post={post}/>
                })}
            </div>
        </div>
    )
}

export default Feed
