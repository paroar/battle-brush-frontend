import { useContext, useState } from "react"
import { RouteComponentProps, withRouter } from "react-router-dom"
import { WSContext } from "../../contexts/websocket"

interface Props extends RouteComponentProps {
    setIsModalVisible: (b: boolean) => void
}

const JoinRoom = (props:Props) => {

    const {setIsModalVisible} = props

    const {userID, roomRef} = useContext(WSContext)

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

    return (
        <div>
            <p>Join Room</p>
            <input type="text" onChange={(e) => handleRoomID(e)}/>
            <div className="create-room-field">
                <button onClick={() => setIsModalVisible(false)}>Cancel</button>
                <button onClick={() => joinRoom()}>Join</button>
            </div>
        </div>
    )
}

export default withRouter(JoinRoom)
