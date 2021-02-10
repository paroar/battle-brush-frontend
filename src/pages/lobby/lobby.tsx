import React, { useContext, useRef, useState } from "react"
import Chat from "../../components/Chat/chat"
import { WSContext } from "../../contexts/websocket"
import "./lobby.css"

type Msg = {
    msg?: string
    username: string
    type: string
}

const Lobby = () => {

    const { userName, userID, roomRef, webSocket } = useContext(WSContext)
    const roomClipboard = useRef<HTMLInputElement>(null)
    const [players, setPlayers] = useState<string[]>()

    const [chatMessages, setChatMessages] = useState<Msg[]>([])

    const copyClipboard = () => {
        roomClipboard.current?.select()
        document.execCommand('copy');
    }

    webSocket.onmessage = (receivedMsg) => {
        const data = JSON.parse(receivedMsg.data)
        if (data.type == "Join"){
            const msg = data.content
            console.log("join",msg)
            const joinMsg: Msg = {
                msg: "has joined",
                username: msg.userName,
                type: "join"
            }
            setChatMessages([...chatMessages.slice(Math.max(chatMessages.length - 50, 0)), joinMsg])
        }else if(data.type == "Chat"){
            const msg = data.content
            console.log("chat",msg)
            const chatMsg: Msg = {
                msg: msg.msg,
                username: msg.username,
                type: "chat"
            }
            setChatMessages([...chatMessages.slice(Math.max(chatMessages.length - 50, 0)), chatMsg])
        }else if(data.type == "Leave"){
            const msg = data.content
            console.log("leave",msg)
            const leaveMsg: Msg = {
                msg: "has left",
                username: msg.userName,
                type: "leave"
            }
            setChatMessages([...chatMessages.slice(Math.max(chatMessages.length - 50, 0)), leaveMsg])
        }else if(data.type == "Players"){
            const msg = data.content
            setPlayers(msg.userNames)
        }
    }


    return (
        <div className="lobby">
            <div className="lobby-section">
                <div className="lobby-section-left">
                    <p>UserName: {userName}</p>
                    <input type="text" ref={roomClipboard} value={roomRef.current}/>
                    <button onClick={() => copyClipboard()}>Copy</button> 
                    <div>
                        {players?.map(p => (
                            <p>{p}</p>    
                        ))}
                    </div>
                </div>
                <div className="lobby-section-right">
                    <Chat chatMessages={chatMessages}/>
                </div>
            </div>
        </div>
    )
}

export default Lobby
