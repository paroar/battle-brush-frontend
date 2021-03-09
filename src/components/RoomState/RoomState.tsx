import React, { useContext } from "react"
import { WSContext } from "../../contexts/websocket"
import Canvas from "../Canvas/Canvas"
import { GameState } from "../../types/types"

import PanelVote from "../PanelVote/PanelVote"
import Winner from "../Winner/Winner"
import Theme from "../Theme/Theme"

const RoomState = () => {

    const {
        roomState,
    } = useContext(WSContext)

    const renderState = () => {

        switch (roomState) {
            case GameState.Voting:
            case GameState.RecolectingVotes:
                return <PanelVote />
            case GameState.Drawing:
            case GameState.Recolecting:
                return <Canvas width={864} height={540} />
            case GameState.Loading:
                return <p>Loading</p>
            case GameState.Winner:
                return <Winner />
            default:
                return <p>State not recognized</p>
        }
    }

    return (
        <>
            {renderState()}
            <Theme />
        </>
    )
}

export default RoomState
