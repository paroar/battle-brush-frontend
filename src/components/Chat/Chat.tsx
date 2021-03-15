import { useContext, useState, useRef, useEffect } from "react"
import { WSContext } from "../../contexts/websocket"
import { MessageType } from "../../types/types"
import { BsArrowBarLeft, BsArrowBarRight } from "react-icons/bs"
import { ReactComponent as LeftCorner } from "../../assets/left-corner.svg"

const Chat = () => {

    const { userID, userName, chatMessages, room } = useContext(WSContext)

    const [msg, setMsg] = useState("")

    const [isHidden, setIsHidden] = useState(false)

    const handleMessages = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const msgInput = msg.trim()
        if (e.key == "Enter" && msgInput.length > 0) {
            fetch("http://localhost:8085/chat", {
                method: "POST",
                body: JSON.stringify({
                    playerid: userID,
                    roomid: room.roomid,
                    username: userName,
                    msg: msg,
                })
            })
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
        <>
            <BsArrowBarLeft
                className="reverse"
                size={30}
                onClick={() => setIsHidden(!isHidden)}
            />
            <div className={`chat  ${isHidden ? "collapse" : ""}`}>
                <div className="chat-header-wrapper">
                    <BsArrowBarRight
                        className="collapse-btn"
                        size={30}
                        onClick={() => setIsHidden(!isHidden)}
                    />
                    <div className="chat-header">
                        <span className="chat-header-title">Room Chat</span>
                    </div>
                </div>
                <div className="chat-messages">
                    {chatMessages.map(t => (
                        t.type !== MessageType.Chat
                            ?
                            <div className="chat-messages-misc">
                                <span>{t.msg}</span>
                            </div>
                            : <>
                                <div className={`chat-messages-wrapper ${t.username === userName ? 'message-out' : ''}`}>
                                    <LeftCorner className={`message-corner ${t.username === userName ? 'corner-reverse' : ''}`} />
                                    <div className={`message-content `}>
                                        <span className={`message-title ${t.username === userName ? 'message-title-hide' : ''}`}>{t.username}</span>
                                        <span>{t.msg}</span>
                                    </div>
                                </div>
                            </>
                    ))}
                </div>
                <div className="chat-input">
                    <input type="text" onChange={(e) => setMsg(e.target.value)} onKeyPress={(e) => handleMessages(e)} value={msg} placeholder="Write your message here" />
                </div>
            </div>
        </>
    )
}

export default Chat
