import React, { useContext, useEffect, useRef, useState } from "react"
import Chat from "../Chat/Chat"
import { WSContext } from "../../contexts/websocket"
import "./lobby.css"
import { Canvas } from "../Canvas/Canvas"
import { GameState, MessageType } from "../../types/types"

const Lobby = () => {

    const {
        userName,
        room,
        players,
        chatMessages,
        roomState,
        webSocket,
        draw
    } = useContext(WSContext)

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

    const renderState = () => {
        if (roomState == "Voting") {
            return (
                <div className="container-img">
                    <img className="img" src={`${draw}`} />
                </div>
            )
        } else if (roomState == "Drawing" || roomState == "Recolecting") {
            return <Canvas />
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
