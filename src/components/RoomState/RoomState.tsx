import React, { useContext } from "react"
import { WSContext } from "../../contexts/websocket"
import Canvas from "../Canvas/Canvas"
import { GameState } from "../../types/types"

import PanelVote from "../PanelVote/PanelVote"
import Winner from "../Winner/Winner"
import Theme from "../Theme/Theme"
import Skeleton from "react-loading-skeleton"

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
                return (
                    <>
                        <Canvas width={864} height={540} />
                        <span>Draw a <Theme /></span>
                    </>
                )
            case GameState.Loading:
                return <Skeleton className="canvas-container" width={864} height={540} />
            case GameState.Winner:
                return <Winner />
            default:
                return <p>State not recognized</p>
        }
    }

    return (
        <>
            {renderState()}
        </>
    )
}

export default RoomState
