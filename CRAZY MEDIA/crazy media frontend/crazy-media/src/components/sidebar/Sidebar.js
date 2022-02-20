import { Bookmark, Chat, Event, Group, HelpOutline, PlayCircleFilled, RssFeed, School, WorkOutline } from '@material-ui/icons'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import CloseFriend from '../closeFriend/CloseFriend'
import './sidebar.css'

function Sidebar() {
    const { user } = useContext(AuthContext);
    
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <Link to='/messenger' className="sidebarListItem">
                        <RssFeed className="sidebarIcon"/>
                        <span className="sidebarListItemText">Feed</span>
                    </Link>
                    <Link to='/messenger' className="sidebarListItem">
                        <Chat className="sidebarIcon" />
                        <span className="sidebarListItemText">Chats</span>
                    </Link>
                    <Link to='/messenger' className="sidebarListItem">
                        <PlayCircleFilled className="sidebarIcon" />
                        <span className="sidebarListItemText">Videos</span>
                    </Link>
                    <Link to='/messenger' className="sidebarListItem">
                        <Group className="sidebarIcon" />
                        <span className="sidebarListItemText">Groups</span>
                    </Link>
                    <Link to='/messenger' className="sidebarListItem">
                        <Bookmark className="sidebarIcon" />
                        <span className="sidebarListItemText">Bookmarks</span>
                    </Link>
                    <Link to='/messenger' className="sidebarListItem">
                        <HelpOutline className="sidebarIcon" />
                        <span className="sidebarListItemText">Questions</span>
                    </Link>
                    <Link to='/messenger' className="sidebarListItem">
                        <WorkOutline className="sidebarIcon" />
                        <span className="sidebarListItemText">Jobs</span>
                    </Link>
                    <Link to='/messenger' className="sidebarListItem">
                        <Event className="sidebarIcon" />
                        <span className="sidebarListItemText">Events</span>
                    </Link>
                    <Link to='/messenger' className="sidebarListItem">
                        <School className="sidebarIcon" />
                        <span className="sidebarListItemText">Courses</span>
                    </Link>
                </ul>
                <button className="sidebarButton">Show More</button>
                <hr className="sidebarHr" />
                <ul className="sidebarFriendList">
                    {
                        user.success && user.user?.followings?.map((user)=>{
                            return <CloseFriend key={user} user={user}/>
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default Sidebar
