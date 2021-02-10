import { useContext, useState, useRef, useEffect } from "react"
import { WSContext } from "../../contexts/websocket"
import "./chat.css"

type Msg = {
    msg?: string
    username: string
}

type Props = {
    chatMessages: Msg[]
}


const Chat = (props:Props) => {

    const {chatMessages} = props

    const { userName, webSocket } = useContext(WSContext)

    const [msg, setMsg] = useState("")

    const handleMessages = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const msgInput = msg.trim()
        if (e.key == "Enter" && msgInput.length > 0) {
            webSocket.send(JSON.stringify({
                type: "Chat",
                content: {
                    username: userName,
                    msg: msg
                }
            }))
            setMsg("")
        }

    }

    const messagesEndRef = useRef<HTMLInputElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scroll({ top: messagesEndRef.current.scrollHeight, behavior: "auto" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [chatMessages]);

    return (
        <div className="chat">
            <div className="chat-messages" ref={messagesEndRef}>
                {chatMessages.map(t => (
                    <div className="chat-messages-text">
                        <p className={`chat-messages-text-username test ${t.username == userName ? 'chat-messages-text-username-same' : null}`}>{t.username}</p>
                        <p>{t.msg}</p>
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input type="text" onChange={(e) => setMsg(e.target.value)} onKeyPress={(e) => handleMessages(e)} value={msg} placeholder="Write your message here"/>
            </div>
        </div>
    )
}

export default Chat
