import React from "react"
import Chat from "../Chat/Chat"
import Game from "../Game/Game"


const Lobby = () => {
    return (
        <div className="lobby">
            <Game />
            <Chat />
        </div>
    )
}

export default Lobby
