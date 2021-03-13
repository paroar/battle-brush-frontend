import React, { useContext, useEffect, useLayoutEffect, useState } from "react"
import { WSContext } from "../../contexts/websocket"
import Canvas from "../Canvas/Canvas"
import { GameState } from "../../types/types"

import PanelVote from "../PanelVote/PanelVote"
import Winner from "../Winner/Winner"
import Theme from "../Theme/Theme"
import Skeleton from "react-loading-skeleton"
import Curtain from "../Curtain/Curtain"
import CurtainMsg from "../Curtain/CurtainMsg"

const RoomState = () => {

    const {
        roomState,
        userID,
        room,
        draw
    } = useContext(WSContext)

    const [imgCanvas, setImgCanvas] = useState("")
    const [vote, setVote] = useState(3.5)

    useLayoutEffect(() => {
        if (roomState == GameState.Recolecting) {
            fetch("http://localhost:8085/img", {
                method: "POST",
                body: JSON.stringify({
                    playerid: userID,
                    roomid: room.roomid,
                    img: imgCanvas,
                })
            })
        }
    }, [roomState])

    useEffect(() => {
        if (roomState === GameState.RecolectingVotes) {
            fetch("http://localhost:8085/vote", {
                method: "POST",
                body: JSON.stringify({
                    playerid: draw.userid,
                    vote: vote,
                })
            })
        }
    }, [roomState])

    const handleImg = (img: string) => {
        setImgCanvas(img)
    }

    const handleVote = (vote: number) => {
        setVote(vote)
    }

    const renderStateVote = () => {
        return <PanelVote handler={handleVote} width={864} height={540} />
    }

    const renderStateDrawing = () => {
        return <Canvas handler={handleImg} width={864} height={540} />
    }
    const renderStateWinner = () => {
        return <Winner width={864} height={540} />
    }

    const renderStateLoading = () => {
        return <Skeleton width={864} height={540} />

    }

    const renderStateLoadingDrawing = () => {
        return (
            <>
                <Curtain><CurtainMsg text="Draw: " /><Theme /></Curtain>
                <Skeleton width={864} height={540} />
            </>
        )
    }

    const renderStateLoadingVoting = () => {
        return (
            <>
                <Curtain><CurtainMsg text="Vote the drawings" /></Curtain>
                <Skeleton width={864} height={540} />
            </>
        )
    }

    const renderStateLoadingWinner = () => {
        return (
            <>
                <Curtain>
                    <CurtainMsg text="And the winner with the less uglier art is..." />
                </Curtain>
                <Skeleton width={864} height={540} />
            </>
        )
    }

    const renderState = () => {
        switch (roomState) {
            case GameState.Voting:
            case GameState.RecolectingVotes:
                return renderStateVote()
            case GameState.Drawing:
            case GameState.Recolecting:
                return renderStateDrawing()
            case GameState.Loading:
                return renderStateLoading()
            case GameState.LoadingDrawing:
                return renderStateLoadingDrawing()
            case GameState.LoadingVoting:
                return renderStateLoadingVoting()
            case GameState.LoadingWinner:
                return renderStateLoadingWinner()
            case GameState.Winner:
                return renderStateWinner()
            default:
                return <p>State not recognized</p>
        }
    }

    return renderState()
}

export default RoomState
