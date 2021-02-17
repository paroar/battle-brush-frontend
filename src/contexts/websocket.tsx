import { Spin } from 'antd';
import React, { useState } from 'react';
import { MsgChat, MessageType, Message, Login, Chat, State, Players, JoinLeave, ImageDrawing } from '../types/types';

let webSocket = new WebSocket(`ws://localhost:8085/ws`)

const WSContext = React.createContext({
    webSocket: {} as WebSocket,
    userID: "",
    userName: "",
    room: "",
    setRoom: (_: string) => { },
    roomState: "",
    setRoomState: (_: string) => { },
    players: [] as string[],
    chatMessages: [] as MsgChat[],
    draw: "",
    setDraw: (_: string) => {}
});

const WSContextProvider: React.FC = (props) => {

    const [userID, setUserID] = useState("")
    const [userName, setUserName] = useState("")
    const [room, setRoom] = useState("")
    const [chatMessages, setChatMessages] = useState<MsgChat[]>([])
    const [players, setPlayers] = useState<string[]>([])
    const [roomState, setRoomState] = useState("")
    const [draw, setDraw] = useState("")

    webSocket.onerror = (err) => {
        console.error(err)
    }

    webSocket.onmessage = (receivedMsg) => {
        const data: Message = JSON.parse(receivedMsg.data)
        const type = data.type
        const content = data.content
        switch (type) {
            case MessageType.Login: {
                const { userid, username } = content as Login
                setUserID(userid)
                setUserName(username)
                break
            }
            case MessageType.JoinLeave: {
                const { username, msg } = content as JoinLeave
                const joinLeaveMsg: MsgChat = {
                    msg: msg,
                    username: username,
                    type: MessageType.JoinLeave
                }
                setChatMessages([
                    ...chatMessages.slice(Math.max(chatMessages.length - 50, 0)),
                    joinLeaveMsg
                ])
                break
            }
            case MessageType.Chat: {
                const { username, msg } = content as Chat
                const chatMsg: MsgChat = {
                    msg: msg,
                    username: username,
                    type: MessageType.Chat
                }
                setChatMessages([
                    ...chatMessages.slice(Math.max(chatMessages.length - 50, 0)),
                    chatMsg
                ])
                break
            }
            case MessageType.Image: {
                const { img } = content as ImageDrawing
                setDraw(img)
                break
            }
            case MessageType.GameState: {
                const { gameState } = content as State
                setRoomState(gameState)
                break
            }
            case MessageType.Players: {
                const { usernames } = content as Players
                setPlayers(usernames)
                break
            }
            default:
                console.error("Couldn't parse type ", data.type)
        }
    }

    if (webSocket.readyState === 1) {
        return (
            <WSContext.Provider
                value={{
                    webSocket,
                    userID,
                    userName,
                    room,
                    setRoom,
                    roomState,
                    setRoomState,
                    players,
                    chatMessages,
                    draw,
                    setDraw,
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