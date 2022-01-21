import { axios } from 'axios';
import { useState, useEffect } from 'react';
import Post from '../post/Post'
import Share from '../share/Share'
import './feed.css'

function Feed(props) {
    const [posts, setPosts] = useState([]);
    const authToken = localStorage.getItem("auth-token");
    
    useEffect(() => {
        const fetchPosts = async ()=>{
            const config = {
                headers: {
                    "auth-token": authToken
                }
            }
            // try{
                // props.username ? await axios.get("/post/profile/" + props.username) : 
                // await axios.get("http://localhost:5000/api/post/timeline/all", config).then((res)=>setPosts(res.data));
                
            // }catch(err){
            //     console.log(err);
            // }
        }
        fetchPosts()
    }, [props.username, authToken])
    return (
        <div className="feed">
            <div className="feedWrapper">
                <Share/>
                {<p className='noPost'>No posts available</p> || posts.map((post)=>{
                    return <Post key={post._id} post={post}/>
                })}
            </div>
        </div>
    )
}

export default Feed
