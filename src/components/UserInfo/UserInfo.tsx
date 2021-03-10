import { useContext, useRef } from 'react'
import { WSContext } from '../../contexts/websocket'

const UserInfo = () => {

    const { room } = useContext(WSContext)

    const roomClipboard = useRef<HTMLInputElement>(null)

    const copyClipboard = () => {
        roomClipboard.current?.select()
        document.execCommand('copy');
    }

    if (room.roomtype == "Private") {
        return (
            <div className="user-info">
                <input type="text" ref={roomClipboard} value={`http://localhost:3000/${room.roomid}`} />
                <button onClick={() => copyClipboard()}>Copy</button>
            </div>
        )
    }else {
        return null
    }
}

export default UserInfo
