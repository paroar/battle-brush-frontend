import { useContext, useState, useRef, useEffect } from "react"
import { WSContext } from "../../contexts/websocket"
import { MessageType } from "../../types/types"
import { BsArrowBarLeft, BsArrowBarRight } from "react-icons/bs"
import { ReactComponent as LeftCorner } from "../../assets/left-corner.svg"

type Props = {
    handleChat: () => void
    chatIsHidden: boolean
}

const Chat = (props: Props) => {

    const { userID, userName, chatMessages, room } = useContext(WSContext)

    const { chatIsHidden, handleChat } = props

    const [msg, setMsg] = useState("")

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
                onClick={() => handleChat()}
            />
            <div className={`chat  ${chatIsHidden ? "hide" : ""}`}>
                <div className="chat-header">
                    <BsArrowBarRight
                        className="collapse-btn"
                        size={30}
                        onClick={() => handleChat()}
                    />
                    <div className="chat-header__content">
                        <span className="chat-header__content__title">Room Chat</span>
                    </div>
                </div>
                <div className="chat-messages" ref={messagesEndRef}>
                    {chatMessages.map(t => (
                        t.type !== MessageType.Chat
                            ?
                            <div className="chat-messages__warning">
                                <span>{t.msg}</span>
                            </div>
                            :
                            <div className={`chat-messages__content ${t.username === userName ? 'out' : 'in'}`}>
                                <span className={`title ${t.username === userName ? 'hide' : ''}`}>{t.username}</span>
                                <span>{t.msg}</span>
                            </div>
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
