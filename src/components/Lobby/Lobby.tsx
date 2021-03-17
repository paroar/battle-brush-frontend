import React from "react"
import { useState } from "react"
import Chat from "../Chat/Chat"
import Game from "../Game/Game"


const Lobby = () => {

    const [chatIsHidden, setChatIsHidden] = useState(false)

    const handleChat = () => {
        setChatIsHidden(!chatIsHidden)
    }

    return (
        <div className={`lobby ${chatIsHidden ? "span" : ""}`}>
            <Game/>
            <Chat chatIsHidden={chatIsHidden} handleChat={() => handleChat()} />
        </div>
    )
}

export default Lobby
