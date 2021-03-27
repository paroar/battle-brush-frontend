import { useContext } from 'react'
import { WSContext } from '../../contexts/websocket';

const ChoiceRoom = () => {

    const { userID, setRoom } = useContext(WSContext)

    const createOrJoinRoom = async () => {
        const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/public/${userID}`)
        if (res.ok) {
            const room = await res.json()
            setRoom({
                roomid: room.roomid,
                roomtype: "Public",
            })
        }
    }

    const createRoom = async () => {
        const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/private/${userID}`)
        if (res.ok) {
            const room = await res.json()
            setRoom({
                roomid: room.roomid,
                roomtype: "Private",
            })
        }
    }

    return (
        <>
            <div className="choice-room">
                <div className="btn-back" onClick={() => createOrJoinRoom()}>
                    <span>Play</span>
                </div>
                <div className="btn-back" onClick={() => createRoom()}>
                    <span>Create</span>
                </div>
            </div>
        </>
    )
}

export default ChoiceRoom
