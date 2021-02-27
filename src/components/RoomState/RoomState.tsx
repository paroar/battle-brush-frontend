import React, { useContext } from "react"
import { WSContext } from "../../contexts/websocket"
import "../Lobby/lobby.css"
import { Canvas } from "../Canvas/Canvas"
import { GameState, MessageType } from "../../types/types"

import PanelVote from "../PanelVote/PanelVote"
import Winner from "../Winner/Winner"
import Theme from "../Theme/Theme"

const RoomState = () => {

    const {
        players,
        roomState,
        room
    } = useContext(WSContext)


    const handleStart = async () => {
        fetch(`http://localhost:8085/startgame/${room.roomid}`)
    }

    const renderState = () => {

        switch (roomState) {
            case GameState.Voting:
            case GameState.RecolectingVotes:
                return <PanelVote />
            case GameState.Drawing:
            case GameState.Recolecting:
                return <Canvas />
            case GameState.Loading:
                return <p>Loading</p>
            case GameState.Winner:
                return <Winner />
            default:
                return <button disabled={players.length < 2} onClick={() => handleStart()}>Start Game</button>
        }
    }

    return (
        <>
            <Theme />
            {renderState()}
        </>
    )
}

export default RoomState
