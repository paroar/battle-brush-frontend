import { useContext, useState } from "react"
import { WSContext } from "../../contexts/websocket"
import "./chat.css"
const Chat = () => {

    const { webSocket } = useContext(WSContext)

    const [chatMessages, setChatMessages] = useState<string[]>([])
    const [msg, setMsg] = useState("")

    webSocket.onmessage = (receivedMsg) => {
        const msg: string = JSON.parse(receivedMsg.data).content
        setChatMessages([...chatMessages, msg])
    }

    const handleMessages = () => {
        webSocket.send(JSON.stringify({ 
            type: "Chat",
            content: msg 
        }))
    }

    return (
        <div className="chat">
            <div className="chat-messages">
                {chatMessages.map(t => (
                    <p>{t}</p>
                ))}
            </div>
            <div>
                <input type="text" onChange={(e) => setMsg(e.target.value)} />
                <button onClick={() => handleMessages()}>send</button>
            </div>
        </div>
    )
}

export default Chat
