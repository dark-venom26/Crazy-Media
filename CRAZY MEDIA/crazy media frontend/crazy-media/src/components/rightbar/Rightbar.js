import Online from '../online/Online'
import './rightbar.css'
import { Users } from '../../dummyData'

function Rightbar(props) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const HomeRightbar = () => {
        return (
            <>
                <div className="birthdayContainer">
                    <img className="birthdayImg" src={`${PF}birthday.png`} alt="" />
                    <span className="birthdayText">
                        <b>Jenny Fox</b> and <b>3 other friends</b> have a birthday today
                    </span>
                </div>
                <img src="assets/ads.jpg" alt="" className="rightbarAd" />
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                    {
                        Users.map((user) => {
                            return <Online key={user.id} user={user} />
                        })
                    }
                </ul>
            </>
        )
    }

    const ProfileRightbar = () => {
        return(
            <>
                <h4 className="rightbarTitle">User Information</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City:</span>
                        <span className="rightbarInfoValue">{props.user.city}</span>
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
                    <div className="rightbarFollowing">
                        <img src="assets/users/2.jpg" alt="" className="rightbarFollowingImg" />
                        <span className="rightbarFollowingName">Ragnar Lothbrok</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img src="assets/users/3.jpg" alt="" className="rightbarFollowingImg" />
                        <span className="rightbarFollowingName">Rose Dorcy</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img src="assets/users/4.jpg" alt="" className="rightbarFollowingImg" />
                        <span className="rightbarFollowingName">Olivia Resov</span>
                    </div>

                </div>
            </>
        )
    }

    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {props.user ? <ProfileRightbar/> : <HomeRightbar/>}
            </div>
        </div>
    )
}

export default Rightbar