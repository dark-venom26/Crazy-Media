import { useContext, useEffect, useState } from 'react';
import Online from '../online/Online'
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext'
import './rightbar.css'
import ProfileFriend from '../profileFriend/ProfileFriend';
import { Add, Remove } from '@material-ui/icons';

function Rightbar(props) {
    const authToken = localStorage.getItem("auth-token");
    const authTokenData = JSON.parse(authToken);

    const {user, dispatch} = useContext(AuthContext);
    const config = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "auth-token": authTokenData.authToken
        }
    }
    
    const HomeRightbar = () => {
        const [onlineUser, setOnlineUser] = useState([])

        useEffect(()=>{
            var mount = true
            const callback = async(id) =>{
                await axios.get(`/user?userId=${id}`).then(response=>{
                    if(mount){
                        setOnlineUser(olduser=>[...olduser,response.data])
                    }
                })
            }
            
            user?.user?.followings?.forEach(id => {
                callback(id);
            });
            return()=>{
                mount = false
            }
        },[])
        
        return (
            <>
                <div className="birthdayContainer">
                    <img className="birthdayImg" src="assets/birthday.png" alt="" />
                    <span className="birthdayText">
                        <b>Jenny Fox</b> and <b>3 other friends</b> have a birthday today
                    </span>
                </div>
                <img src="assets/ads.jpg" alt="" className="rightbarAd" />
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                    {
                        onlineUser?.length ===0 ? "No one is online" : onlineUser?.map((user) => {
                            return <Online key={user._id} user={user} />
                        })
                    }
                </ul>
            </>
        )
    }

    const ProfileRightbar = () => {
        const followed = user?.user?.followings?.includes(props.user?._id)
        
        const handleFollowEvent = async ()=>{
            try {
                if(followed){
                    await axios.put('/user/unfollow/'+props.user?._id,[], config)
                    dispatch({type: 'UNFOLLOW', payload: props.user?._id});
                }else{
                    await axios.put('/user/follow/'+props.user?._id,[], config)
                    dispatch({type: 'FOLLOW', payload: props.user?._id});
                }
            } catch (err) {
                console.log(err);
            }
        };

        return(
            <>
                {props.user?.username !== user?.user?.username && (
                    <button className='rightbarFollowButton' onClick={handleFollowEvent}>
                        {followed ? "Unfollow" : "Follow"}
                        {followed ? <Remove/> : <Add/>}
                    </button>
                )}
                <h4 className="rightbarTitle">User Information</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Email:</span>
                        <span className="rightbarInfoValue">{props.user.email}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Gender:</span>
                        <span className="rightbarInfoValue">{props.user.gender===1 ? "Male" : props.user.gender===2 ? "Female" : "Other"}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From:</span>
                        <span className="rightbarInfoValue">{props.user.from}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relationship:</span>
                        <span className="rightbarInfoValue">{props.user.relationship===1 ? "Single" : props.user.relationship===2 ? "Married" : "-"}</span>
                    </div>
                </div>
                <h4 className="rightbarTitle">User friends</h4>
                <div className="rightbarFollowings">
                    {
                        props.user?.followings?.length !==0 ? props.user?.followings?.map((user)=>{
                            return <ProfileFriend key={user} user={user}/>
                        }) : "This user have no friends"
                    }
                </div>
            </>
        )
    };

    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {props.user? <ProfileRightbar /> : <HomeRightbar/>}
            </div>
        </div>
    )
}

export default Rightbar