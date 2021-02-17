import React, { useContext, useEffect, useRef, useState } from "react"
import Chat from "../Chat/Chat"
import { WSContext } from "../../contexts/websocket"
import "./lobby.css"
import { Canvas } from "../Canvas/Canvas"
import { GameState, MessageType } from "../../types/types"
import poo from "../../assets/poo.png"
import paper from "../../assets/paper.png"
import sad from "../../assets/sad.png"
import great from "../../assets/great.png"
import love from "../../assets/love.png"
import unicorn from "../../assets/unicorn.png"


const Lobby = () => {

    const {
        userName,
        room,
        players,
        chatMessages,
        roomState,
        webSocket,
        draw,
        setDraw
    } = useContext(WSContext)

    const [vote, setVote] = useState(3.5)

    const roomClipboard = useRef<HTMLInputElement>(null)

    const copyClipboard = () => {
        roomClipboard.current?.select()
        document.execCommand('copy');
    }

    const handleStart = () => {
        webSocket.send(JSON.stringify({
            type: MessageType.GameState,
            content: {
                command: GameState.Start
            }
        }))
    }

    const handleVote = (vote: number) => {
        webSocket.send(JSON.stringify({
            type: MessageType.Vote,
            content: {
                vote: vote,
            }
        }))
    }

    useEffect(() => {
        setVote(3.5)
    }, [roomState])

    const renderState = () => {
        if (roomState === GameState.Voting) {
            return (
                <>
                    <div className={`container-img`}>
                        <img alt="user drawing" className="img" src={`${draw}`} />
                    </div>
                    <div className="voting">
                        <div onClick={() => setVote(1)}>
                            <img className="voting-img" src={poo} />
                        </div>
                        <div onClick={() => setVote(2)}>
                            <img className="voting-img" src={paper} />
                        </div>
                        <div onClick={() => setVote(3)}>
                            <img className="voting-img" src={sad} />
                        </div>
                        <div onClick={() => setVote(4)}>
                            <img className="voting-img" src={great} />
                        </div>
                        <div onClick={() => setVote(5)}>
                            <img className="voting-img" src={love} />
                        </div>
                        <div onClick={() => setVote(6)}>
                            <img className="voting-img" src={unicorn} />
                        </div>
                    </div>
                </>
            )
        } else if (roomState === GameState.Drawing || roomState === GameState.Recolecting) {
            return <Canvas />
        } else if (roomState === GameState.Loading) {
            return <p>Loading</p>
        } else {
            return <button disabled={players.length < 2} onClick={() => handleStart()}>Start Game</button>
        }
    }

    return (
        <div className="lobby">
            <div className="lobby-section">
                <div className="lobby-section-left">
                    <p>UserName: {userName}</p>
                    <input type="text" ref={roomClipboard} value={room} />
                    <button onClick={() => copyClipboard()}>Copy</button>
                    <div className="players">
                        {players?.map(p => (
                            <p>{p}</p>
                        ))}
                    </div>
                    <p>{vote}</p>
                    {renderState()}
                </div>
                <div className="lobby-section-right">
                    <Chat chatMessages={chatMessages} />
                </div>
            </div>
        </div>
    )
}

export default Lobby
