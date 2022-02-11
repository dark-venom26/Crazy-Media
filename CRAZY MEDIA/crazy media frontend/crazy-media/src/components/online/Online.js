import './online.css'
import { Link } from 'react-router-dom';

function Online(props) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
            <Link to={`/profile/${props.user?.username}`}>
                <img src={props.user?.profilePicture ? PF + props.user?.profilePicture : props.user?.gender ===2 ? PF + "persons/woman.png" : PF + "persons/man.png"} alt="" className="rightbarProfileImg" />
                <span className="rightbarOnline"></span>
            </Link>

            </div>
            <span className="rightbarUsername">{props?.user?.username}</span>
        </li>
    )
}

export default Online
