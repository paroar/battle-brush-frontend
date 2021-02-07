import { Spin } from 'antd';
import React, { MutableRefObject, useRef, useState } from 'react';

let ws = new WebSocket(`ws://localhost:8085/ws`)

const WSContext = React.createContext({
    webSocket: {} as WebSocket,
    userID: "",
    roomRef: {} as MutableRefObject<string>
});

const WSContextProvider: React.FC = (props) => {

    const [isConnected, setIsConnected] = useState(false)
    const [userID, setUserID] = useState("")
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
            type: "login",
            content: "connected" 
        }))
        setIsConnected(true)
    }

    ws.onmessage = (msg) => {
        const data = JSON.parse(msg.data)
        if(data.type == "id"){
            setUserID(data.content)
        }
    }

    if (isConnected) {
        return (
            <WSContext.Provider
                value={{
                    webSocket: ws,
                    userID: userID,
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