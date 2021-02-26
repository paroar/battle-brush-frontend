import { Spin } from 'antd';
import React, { useState } from 'react';
import { MsgChat, MessageType, Message, Login, Chat, State, Players, JoinLeave, ImageDrawing, Theme, GameState, Connection, RoomCommand, RoomCommands } from '../types/types';

const path = window.location.pathname
let webSocket = new WebSocket(`ws://localhost:8085/ws${path !== "/" ? path : ""}`)

const WSContext = React.createContext({
    webSocket: {} as WebSocket,
    userID: "",
    userName: "",
    room: { roomid: "", roomtype: "" },
    setRoom: ({}: {roomid: string, roomtype: string} ) => {},
    roomState: "",
    setRoomState: (_: string) => { },
    players: [] as string[],
    chatMessages: [] as MsgChat[],
    draw: {} as ImageDrawing,
    theme: "",
    winner: { img: "", username: "" }
});

const WSContextProvider: React.FC = (props) => {

    const [userID, setUserID] = useState("")
    const [userName, setUserName] = useState("")
    const [room, setRoom] = useState({
        roomid: "",
        roomtype: ""
    })
    const [chatMessages, setChatMessages] = useState<MsgChat[]>([])
    const [players, setPlayers] = useState<string[]>([])
    const [roomState, setRoomState] = useState("")
    const [draw, setDraw] = useState<ImageDrawing>({
        img: "",
        userid: "",
        username: ""
    })
    const [theme, setTheme] = useState("")
    const [winner, setWinner] = useState({ img: "", username: "" })

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
                const { img, username, userid } = content as ImageDrawing
                setDraw({ img: img, username: username, userid: userid })
                break
            }
            case MessageType.GameState: {
                const { gameState } = content as State
                if (gameState === GameState.Waiting) {
                    reset()
                }
                setRoomState(gameState)
                break
            }
            case MessageType.Players: {
                const { usernames } = content as Players
                setPlayers(usernames)
                break
            }
            case MessageType.Theme: {
                const { theme } = content as Theme
                setTheme(theme)
                break
            }
            case MessageType.Winner: {
                const { img, username } = content as ImageDrawing
                setWinner({ img, username })
                break
            }
            case MessageType.Connection: {
                const { status, roomid, roomtype } = content as Connection
                if (status === "ok") {
                    setRoom({ roomid: roomid, roomtype: roomtype })
                }
                break
            }
            default:
                console.error("Couldn't parse type ", data.type)
        }
    }

    const reset = () => {
        setDraw({
            img: "",
            userid: "",
            username: ""
        })
        setWinner({
            img: "",
            username: ""
        })
        setTheme("")
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
                    theme,
                    winner
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