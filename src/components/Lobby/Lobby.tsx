import React, { useContext, useRef } from "react"
import Chat from "../Chat/Chat"
import RoomState from "../RoomState/RoomState"
import Players from "../Players/Players"
import UserInfo from "../UserInfo/UserInfo"
import { WSContext } from "../../contexts/websocket"
import { GameState } from "../../types/types"
import Btn from "../Btn/Btn"
import CanvasDraw from "react-canvas-draw"


const Lobby = () => {

    const { roomState, room } = useContext(WSContext)

    const canvasRef = useRef<CanvasDraw>(null)

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
                        <CanvasDraw
                            ref={canvasRef}
                            brushRadius={5}
                            canvasWidth={864}
                            canvasHeight={540}
                        />
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
