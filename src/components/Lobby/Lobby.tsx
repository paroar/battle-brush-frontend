import React, { useContext } from "react"
import Chat from "../Chat/Chat"
import RoomState from "../RoomState/RoomState"
import Players from "../Players/Players"
import UserInfo from "../UserInfo/UserInfo"
import { WSContext } from "../../contexts/websocket"
import { GameState } from "../../types/types"
import CanvasFrame from "../CanvasFrame/CanvasFrame"


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
                        <CanvasFrame isDisabled={false} handlerImg={() => { }} />
                        <div className="btn-back" onClick={() => handleStart()}>
                            <span>Start</span>
                        </div>
                    </>
                    :
                    <RoomState />
                }
            </div>

            <Chat />

        </div>
    )
}

export default Lobby
