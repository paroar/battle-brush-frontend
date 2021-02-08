import React, { useContext } from "react"
import Chat from "../../components/Chat/chat"
import { WSContext } from "../../contexts/websocket"
import "./lobby.css"

const Lobby = () => {

    const { userID, roomRef } = useContext(WSContext)

    return (
        <div className="lobby">
            <div className="lobby-section">
                <div className="lobby-section-left">
                    <p>UserID: {userID}</p>
                    <p>RoomID: {roomRef.current}</p>
                </div>
                <div className="lobby-section-right">
                    <Chat />
                </div>
            </div>
        </div>
    )
}

export default Lobby
