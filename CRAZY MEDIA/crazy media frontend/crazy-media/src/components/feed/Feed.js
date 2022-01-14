import { axios } from 'axios';
import { useState, useEffect } from 'react';
import Post from '../post/Post'
import Share from '../share/Share'
import './feed.css'

function Feed(props) {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchPosts = async ()=>{
            try{
                let res = props.username 
                ? await axios.get("post/profile" + props.username) 
                : await axios.get("post/timeline/all");
                setPosts(res)
            }catch{
            }
        }
        fetchPosts()
    }, [props.username])
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
