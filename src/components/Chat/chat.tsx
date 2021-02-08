import { useContext, useState, useRef, useEffect } from "react"
import { WSContext } from "../../contexts/websocket"
import "./chat.css"

const Chat = () => {

    const { webSocket } = useContext(WSContext)

    const [chatMessages, setChatMessages] = useState<string[]>([])
    const [msg, setMsg] = useState("")

    webSocket.onmessage = (receivedMsg) => {
        const data = JSON.parse(receivedMsg.data)
        if (data.type == "Join"){
            const msg = data.content.userid
            setChatMessages([...chatMessages.slice(Math.max(chatMessages.length - 50, 0)), msg])
        }else if(data.type == "Chat"){
            const msg = data.content.msg
            setChatMessages([...chatMessages.slice(Math.max(chatMessages.length - 50, 0)), msg])
        }else if(data.type == "Leave"){
            const msg = data.content.userid
            setChatMessages([...chatMessages.slice(Math.max(chatMessages.length - 50, 0)), msg])
        }
    }

    const handleMessages = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const msgInput = msg.trim()
        if (e.key == "Enter" && msgInput.length > 0) {
            webSocket.send(JSON.stringify({
                type: "Chat",
                content: {
                    msg: msg
                }
            }))
            setMsg("")
        }

    }

    const messagesEndRef = useRef<HTMLInputElement>(null)

    const scrollToBottom = () => {
        console.log("Scrolling")
        messagesEndRef.current?.scroll({ top: messagesEndRef.current.scrollHeight, behavior: "auto" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [chatMessages]);

    return (
        <div className="chat">
            <div className="chat-messages" ref={messagesEndRef}>
                {chatMessages.map(t => (
                    <p className="chat-messages-text">{t}</p>
                ))}
            </div>
            <div className="chat-input">
                <input type="text" onChange={(e) => setMsg(e.target.value)} onKeyPress={(e) => handleMessages(e)} value={msg} />
            </div>
        </div>
    )
}

export default Chat
