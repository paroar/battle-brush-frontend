import { useContext, useRef } from 'react'
import { WSContext } from '../../contexts/websocket'

const UserInfo = () => {

    const { userName, room } = useContext(WSContext)

    const roomClipboard = useRef<HTMLInputElement>(null)

    const copyClipboard = () => {
        roomClipboard.current?.select()
        document.execCommand('copy');
    }

    return (
        <div className="user-info">
            <span>{userName}</span>
            {room.roomtype === "Public"
                ?
                null
                :
                <>
                    <input type="text" ref={roomClipboard} value={`http://localhost:3000/${room.roomid}`} />
                    <button onClick={() => copyClipboard()}>Copy</button>
                </>
            }
        </div>
    )
}

export default UserInfo
