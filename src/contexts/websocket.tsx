import { Spin } from 'antd';
import React, { useState } from 'react';

let ws = new WebSocket(`ws://localhost:8085/ws`)

const WSContext = React.createContext({
    webSocket: {} as WebSocket
});

const WSContextProvider: React.FC = (props) => {

    const [isConnected, setIsConnected] = useState(false)

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
        console.log(JSON.parse(msg.data))
    }

    if (isConnected) {
        return (
            <WSContext.Provider
                value={{
                    webSocket: ws
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