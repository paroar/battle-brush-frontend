import React, { useContext } from "react"
import Chat from "../Chat/Chat"
import RoomState from "../RoomState/RoomState"
import Players from "../Players/Players"
import UserInfo from "../UserInfo/UserInfo"
import { WSContext } from "../../contexts/websocket"
import { GameState } from "../../types/types"
import Btn from "../Btn/Btn"


const Lobby = () => {

    const { roomState, room } = useContext(WSContext)

    const handleStart = async () => {
        fetch(`http://localhost:8085/startgame/${room.roomid}`)
    }

    return (
        <div className="lobby">
            <div className="lobby-left">
                <UserInfo />
                <Players />
                {roomState === GameState.Waiting ?
                    <>
                        <Btn text="Start Game" handler={() => handleStart()} />
                    </>
                    :
                    <RoomState />
                }
            </div>
            <div className="lobby-right">
                <Chat />
            </div>
        </div>
    )
}

export default Lobby
