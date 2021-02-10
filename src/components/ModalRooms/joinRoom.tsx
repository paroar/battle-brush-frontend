import { useContext, useEffect, useRef } from "react"
import { RouteComponentProps, withRouter } from "react-router-dom"
import { WSContext } from "../../contexts/websocket"

interface Props extends RouteComponentProps {
    isModalVisible: boolean
    setIsModalVisible: (b: boolean) => void
}

const JoinRoom = (props:Props) => {

    const {isModalVisible, setIsModalVisible} = props

    const {userID, roomRef} = useContext(WSContext)

    const inputRef = useRef<HTMLInputElement>(null)

    const joinRoom = async () => {
        const url = "http://localhost:8085/joinroom"
        const res = await fetch(url, {
            method: "PATCH",
            body: JSON.stringify({
                userid: userID,
                roomid: roomRef.current,
            })
        })
        if (res.ok){
            props.history.push("/lobby")
        }
    }

    const handleRoomID = (e:React.ChangeEvent<HTMLInputElement>) => {
        roomRef.current = e.currentTarget.value
        console.log(roomRef.current)
    }

    useEffect(() => {
        inputRef.current?.select()
    }, [isModalVisible])

    return (
        <div>
            <p>Join Room</p>
            <input type="password" ref={inputRef} onChange={(e) => handleRoomID(e)}/>
            <div className="create-room-field">
                <button onClick={() => setIsModalVisible(false)}>Cancel</button>
                <button onClick={() => joinRoom()}>Join</button>
            </div>
        </div>
    )
}

export default withRouter(JoinRoom)
