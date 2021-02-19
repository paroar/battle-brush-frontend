import { useContext, useRef } from 'react'
import { WSContext } from '../../contexts/websocket'

const UserInfo = () => {

    const { userName, room } = useContext(WSContext)

    const roomClipboard = useRef<HTMLInputElement>(null)

    const copyClipboard = () => {
        roomClipboard.current?.select()
        document.execCommand('copy');
    }

    console.log(room.roomtype)

    return (
        <>
            <p>UserName: {userName}</p>
            {room.roomtype === "Public"
                ?
                null
                :
                <>
                    <input type="text" ref={roomClipboard} value={`http://localhost:3000/${room.roomid}`} />
                    <button onClick={() => copyClipboard()}>Copy</button>
                </>
            }
        </>
    )
}

export default UserInfo
