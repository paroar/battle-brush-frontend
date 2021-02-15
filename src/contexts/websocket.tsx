import { Spin } from 'antd';
import React, { useState } from 'react';
import { Msg } from '../types/types';

let ws = new WebSocket(`ws://localhost:8085/ws`)

const WSContext = React.createContext({
    webSocket: {} as WebSocket,
    userID: "",
    userName: "",
    room: "",
    setRoom: (_: string) => {},
    roomState: "",
    setRoomState: (_: string) => {},
    players: [] as string[],
    chatMessages: [] as Msg[],
});

const WSContextProvider: React.FC = (props) => {

    const [userID, setUserID] = useState("")
    const [userName, setUserName] = useState("")
    const [room, setRoom] = useState("")
    const [chatMessages, setChatMessages] = useState<Msg[]>([])
    const [players, setPlayers] = useState<string[]>([])
    const [roomState, setRoomState] = useState("")

    ws.onerror = (err) => {
        console.error(err)
    }

    ws.onopen = () => {
        ws.send(JSON.stringify({
            type: "Login",
            content: {
                userid: "connected"
            }
        }))
    }

    ws.onmessage = (receivedMsg) => {
        const data = JSON.parse(receivedMsg.data)
        if (data.type == "Login") {
            setUserID(data.content.userid)
            setUserName(data.content.userName)
        }
        else if (data.type == "Join"){
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
        }else if(data.type == "GameState"){
            const msg = data.content
            setRoomState(msg.gameState)
        }
    }

    if (ws.readyState == 1) {
        return (
            <WSContext.Provider
                value={{
                    webSocket: ws,
                    userID: userID,
                    userName: userName,
                    room: room,
                    setRoom: setRoom,
                    roomState: roomState,
                    setRoomState: setRoomState,
                    players: players,
                    chatMessages: chatMessages,
                }}
            >
                {props.children}
            </WSContext.Provider>
        )
    } else {
        return (
            <Spin size="large" />
        )
    }
}

const WSContextConsumer = WSContext.Consumer;

export { WSContext, WSContextProvider, WSContextConsumer }