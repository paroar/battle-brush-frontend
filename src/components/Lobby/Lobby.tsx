import React, { useContext, useRef } from "react"
import Chat from "../Chat/Chat"
import { WSContext } from "../../contexts/websocket"
import "./lobby.css"

const Lobby = () => {

    const { userName, room, players, chatMessages } = useContext(WSContext)
    const roomClipboard = useRef<HTMLInputElement>(null)

    const copyClipboard = () => {
        roomClipboard.current?.select()
        document.execCommand('copy');
    }

    return (
        <div className="lobby">
            <div className="lobby-section">
                <div className="lobby-section-left">
                    <p>UserName: {userName}</p>
                    <input type="text" ref={roomClipboard} value={room}/>
                    <button onClick={() => copyClipboard()}>Copy</button> 
                    <div>
                        {players?.map(p => (
                            <p>{p}</p>    
                        ))}
                    </div>
                </div>
                <div className="lobby-section-right">
                    <Chat chatMessages={chatMessages}/>
                </div>
            </div>
        </div>
    )
}

export default Lobby
