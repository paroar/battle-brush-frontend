import { useContext, useRef } from 'react'
import { WSContext } from '../../contexts/websocket'
import { FaCopy } from 'react-icons/fa'

const UserInfo = () => {

    const { room } = useContext(WSContext)

    const roomClipboard = useRef<HTMLInputElement>(null)

    const copyClipboard = () => {
        roomClipboard.current?.select()
        document.execCommand('copy');
    }

    if (room.roomtype === "Private") {
        return (
            <div className="share">
                <input className="share__input" type="text" ref={roomClipboard} value={`${process.env.REACT_APP_API_URI}/${room.roomid}`} readOnly/>
                <div className="share__btn" onClick={() => copyClipboard()}>
                    <FaCopy size={20} />
                </div>
            </div>
        )
    } else {
        return null
    }
}

export default UserInfo
