import './closeFriend.css'

function CloseFriend(props) {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <li className="sidebarFriend">
            <img src={PUBLIC_FOLDER + props.user.profilePicture} alt="" className="sidebarFriendImg" />
            <span className="sidebarFriendName">{props.user.username}</span>
        </li>
    )
}

export default CloseFriend
