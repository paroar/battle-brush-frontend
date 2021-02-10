import { Spin } from 'antd';
import React, { MutableRefObject, useRef, useState } from 'react';

let ws = new WebSocket(`ws://localhost:8085/ws`)

const WSContext = React.createContext({
    webSocket: {} as WebSocket,
    userID: "",
    userName: "",
    roomRef: {} as MutableRefObject<string>
});

const WSContextProvider: React.FC = (props) => {

    const [isConnected, setIsConnected] = useState(false)
    const [userID, setUserID] = useState("")
    const [userName, setUserName] = useState("")
    const roomRef = useRef("")

    ws.onclose = () => {
        console.log("ws closed");
        setIsConnected(false)
    }

    ws.onerror = (err) => {
        console.error(err)
    }

    ws.onopen = () => {
        console.log("ws opened")
        ws.send(JSON.stringify({
            type: "Login",
            content: {
                userid: "connected"
            }
        }))
        setIsConnected(true)
    }

    ws.onmessage = (msg) => {
        const data = JSON.parse(msg.data)
        if (data.type == "Login") {
            setUserID(data.content.userid)
            setUserName(data.content.userName)
        }
    }

    if (isConnected) {
        return (
            <WSContext.Provider
                value={{
                    webSocket: ws,
                    userID: userID,
                    userName: userName,
                    roomRef: roomRef
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