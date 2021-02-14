import { useContext, useState, useRef, useEffect } from "react"
import { WSContext } from "../../contexts/websocket"
import { Msg } from "../../types/types"
import "./chat.css"

type Props = {
    chatMessages: Msg[]
}


const Chat = (props: Props) => {

    const { chatMessages } = props

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
        messagesEndRef.current?.scroll({ top: messagesEndRef.current.scrollHeight, behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [chatMessages]);

    return (
        <div className="chat">
            <div className="chat-messages" ref={messagesEndRef}>
                {chatMessages.map(t => (
                    t.type != "chat"
                        ?
                        <div className="chat-messages-misc">
                            <span>{t.username} {t.msg}</span>
                        </div>
                        :
                        <div className={`chat-messages-wrapper ${t.username == userName ? 'message-out' : 'message-in'}`}>
                            <div className={`message-box`}>
                                <span className={`message-title ${t.username == userName ? 'message-title-hide' : 'message-in'}`}>{t.username}</span>
                                <span>{t.msg}</span>
                            </div>
                        </div>
                ))}
            </div>
            <div className="chat-input">
                <input type="text" onChange={(e) => setMsg(e.target.value)} onKeyPress={(e) => handleMessages(e)} value={msg} placeholder="Write your message here" />
            </div>
        </div>
    )
}

export default Chat
