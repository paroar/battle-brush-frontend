import React, { useContext, useEffect, useRef, useState } from "react"
import Chat from "../Chat/Chat"
import { WSContext } from "../../contexts/websocket"
import "./lobby.css"
import { Canvas } from "../Canvas/Canvas"

const Lobby = () => {

    const { userName, room, players, chatMessages, roomState, setRoomState, webSocket } = useContext(WSContext)
    const roomClipboard = useRef<HTMLInputElement>(null)

    const copyClipboard = () => {
        roomClipboard.current?.select()
        document.execCommand('copy');
    }

    const handleStart = () => {
        webSocket.send(JSON.stringify({
            type: "StartGame",
            content: {}
        }))
    }

    return (
        <div className="lobby">
            <div className="lobby-section">
                <div className="lobby-section-left">
                    <p>UserName: {userName}</p>
                    <input type="text" ref={roomClipboard} value={room} />
                    <button onClick={() => copyClipboard()}>Copy</button>
                    <div>
                        {players?.map(p => (
                            <p>{p}</p>
                        ))}
                    </div>
                    {roomState == "Running" ?
                        <>
                            <Canvas />
                        </>
                        :
                        <button disabled={players.length < 2} onClick={() => handleStart()}>Start Game</button>
                    }
                </div>
                <div className="lobby-section-right">
                    <Chat chatMessages={chatMessages} />
                </div>
            </div>
        </div>
    )
}

export default Lobby
