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
        <>
            <p>UserName: {userName}</p>
            <input type="text" ref={roomClipboard} value={room} />
            <button onClick={() => copyClipboard()}>Copy</button>
        </>
    )
}

export default UserInfo
