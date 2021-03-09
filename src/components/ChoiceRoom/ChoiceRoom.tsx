import { useContext } from 'react'
import { WSContext } from '../../contexts/websocket';
import Btn from '../Btn/Btn';

const ChoiceRoom = () => {

    const { userID, setRoom } = useContext(WSContext)

    const createOrJoinRoom = async () => {
        const res = await fetch(`http://localhost:8085/public/${userID}`)
        if (res.ok) {
            const room = await res.json()
            setRoom({
                roomid: room.roomid,
                roomtype: "Public",
            })
        }
    }

    const createRoom = async () => {
        console.log(userID)
        const res = await fetch(`http://localhost:8085/private/${userID}`)
        if (res.ok){
            const room = await res.json()
            setRoom({
                roomid: room.roomid,
                roomtype: "Private",
            })
        }
    }

    return (
        <div className="choice-room">
            <Btn text="Play" handler={() => createOrJoinRoom()}/>
            <Btn text="Create Room" handler={() => createRoom()}/>
        </div>
    )
}

export default ChoiceRoom
