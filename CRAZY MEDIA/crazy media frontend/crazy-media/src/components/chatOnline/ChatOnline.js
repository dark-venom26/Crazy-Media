import './chatOnline.css'

function ChatOnline() {
  return (
    <div className='chatOnline'>
        <div className="chatOnlineFriend">
            <div className="chatOnlineImgContainer">
                <img src="assets/dummy.jpg" alt="" className='chatOnlineImg'/>
                <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineName">Mrs. Sparrow</span>
        </div>
    </div>
  )
}

export default ChatOnline