import React, { useContext, useEffect, useRef } from "react"
import Chat from "../../components/Chat/chat"
import { WSContext } from "../../contexts/websocket"

const Lobby = () => {

    const {userID, roomRef} = useContext(WSContext)

    return (
        <div>
            <h2>Lobby</h2>
            <p>UserID: {userID}</p>
            <p>RoomID: {roomRef.current}</p>
            <Chat/>
        </div>
    )
}

export default Lobby
