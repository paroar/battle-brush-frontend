import { useContext, useEffect, useRef, useState } from "react"
import { WSContext } from "../../contexts/websocket"

interface Props {
    isModalVisible: boolean
    setIsModalVisible: (b: boolean) => void
}

const JoinRoom = (props: Props) => {

    const { isModalVisible, setIsModalVisible } = props

    const { userID, setRoom } = useContext(WSContext)

    const [inputRoom, setInputRoom] = useState("")

    const inputRef = useRef<HTMLInputElement>(null)

    const joinRoom = async () => {
        const url = "http://localhost:8085/joinroom"
        const res = await fetch(url, {
            method: "PATCH",
            body: JSON.stringify({
                userid: userID,
                roomid: inputRoom,
            })
        })
        if (res.ok) {
            setRoom(inputRoom)
        }
    }

    const handleRoomID = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputRoom(e.currentTarget.value)
    }

    useEffect(() => {
        if (isModalVisible) {
            inputRef.current?.select()
        }
    }, [isModalVisible])

    return (
        <div>
            <p>Join Room</p>
            <input type="password" ref={inputRef} onChange={(e) => handleRoomID(e)} />
            <div className="create-room-field">
                <button onClick={() => setIsModalVisible(false)}>Cancel</button>
                <button onClick={() => joinRoom()}>Join</button>
            </div>
        </div>
    )
}

export default JoinRoom
