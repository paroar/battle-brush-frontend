import { useContext, useState } from "react"
import { RouteComponentProps, withRouter } from "react-router-dom"
import { WSContext } from "../../contexts/websocket"

import "./createRoom.css"

interface Props extends RouteComponentProps {
    setIsModalVisible: (b: boolean) => void
}

const CreateRoom = (props: Props) => {

    const {setIsModalVisible} = props

    const { userID, roomRef } = useContext(WSContext)

    const [numPlayers, setNumPlayers] = useState(6)
    const [time, setTime] = useState(90)
    const [rounds, setRounds] = useState(3)


    const createRoom = async () => {
        const url = "http://localhost:8085/createroom"
        const res = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                userid: userID,
                numPlayers: numPlayers,
                time: time,
                rounds: rounds
            })
        })
        if (res.ok){
            const data = await res.json()
            roomRef.current = data.roomid
            props.history.push("/lobby")
        }
    }

    const handleNumPlayers = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNumPlayers(e.currentTarget.valueAsNumber)
    }

    const handleTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTime(e.currentTarget.valueAsNumber)
    }

    const handleRounds = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRounds(e.currentTarget.valueAsNumber)
    }
    
    return (
        <div className="create-room">
            <div className="create-room-field">
                <p>Nº Players</p>
                <input className="create-room-input" type="number" defaultValue={numPlayers} onChange={e => handleNumPlayers(e)}></input>
            </div>
            <div className="create-room-field">
                <p>Time</p>
                <input className="create-room-input" type="number" defaultValue={time} onChange={e => handleTime(e)}></input>
            </div>
            <div className="create-room-field">
                <p>Rounds</p>
                <input className="create-room-input" type="number" defaultValue={rounds} onChange={e => handleRounds(e)}></input>
            </div>
            <div className="create-room-field">
                <button onClick={() => setIsModalVisible(false)}>Cancel</button>
                <button onClick={() => createRoom()}>Create</button>
            </div>

        </div>
    )
}

export default withRouter(CreateRoom)
