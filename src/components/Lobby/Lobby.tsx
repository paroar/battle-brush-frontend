import React from "react"
import Chat from "../Chat/Chat"
import "./lobby.css"
import RoomState from "../RoomState/RoomState"
import Players from "../Players/Players"
import UserInfo from "../UserInfo/UserInfo"


const Lobby = () => {

    return (
        <div className="lobby">
            <div className="lobby-section">
                <div className="lobby-section-left">
                    <UserInfo/>
                    <Players />
                    <RoomState />
                </div>
                <div className="lobby-section-right">
                    <Chat />
                </div>
            </div>
        </div>
    )
}

export default Lobby
