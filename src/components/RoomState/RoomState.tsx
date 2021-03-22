import React, { useContext, useEffect, useState } from "react"
import { WSContext } from "../../contexts/websocket"
import { GameState } from "../../types/types"
import PanelVote from "../PanelVote/PanelVote"
import Winner from "../Winner/Winner"
import Skeleton from "react-loading-skeleton"
import Curtain from "../Curtain/Curtain"
import CurtainMsg from "../Curtain/CurtainMsg"
import CanvasFrame from "../CanvasFrame/CanvasFrame"
import Timer from "../Timer/Timer"

const RoomState = () => {

    const {
        roomState,
        userID,
        room,
        draw,
        theme
    } = useContext(WSContext)

    const [imgCanvas, setImgCanvas] = useState("")
    const [vote, setVote] = useState(3.5)

    useEffect(() => {
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
            setVote(3.5)
        }
    }, [roomState])

    const handleImg = (img: string) => {
        setImgCanvas(img)
    }

    const handleVote = (vote: number) => {
        setVote(vote)
    }

    const renderStateVote = () => {
        return (
            <>
                <PanelVote handler={handleVote} />
                <Timer
                    seconds={10}
                    color="#e56"
                    alpha={0.9}
                    size={70}
                />
            </>
        )
    }

    const renderStateDrawing = () => {
        return (
            <>
                <CanvasFrame isDisabled={false} handlerImg={handleImg} />
                <Timer
                    seconds={60}
                    color="#e56"
                    alpha={0.9}
                    size={70}
                />
            </>
        )
    }
    const renderStateWinner = () => {
        return <Winner />
    }

    const renderStateLoading = () => {
        return <Skeleton width={864} height={540} />

    }

    const renderStateLoadingDrawing = () => {
        return (
            <>
                <Curtain className="curtain">
                    <CurtainMsg text="Draw" />
                    <CurtainMsg text={theme} />
                </Curtain>
                <Skeleton width={864} height={540} />
            </>
        )
    }

    const renderStateLoadingVoting = () => {
        return (
            <>
                <Curtain className="curtain">
                    <CurtainMsg text="Vote the drawings" />
                </Curtain>
                <Skeleton width={864} height={540} />
            </>
        )
    }

    const renderStateLoadingWinner = () => {
        return (
            <>
                <Curtain className="curtain">
                    <CurtainMsg text="And the winner is..." />
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
