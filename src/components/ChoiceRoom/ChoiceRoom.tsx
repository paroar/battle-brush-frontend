import React, { useContext, useState } from 'react'
import { WSContext } from '../../contexts/websocket';
import Modal from '../Modal/Modal';
import CreateRoom from "../ModalRooms/CreateRoom";


const ChoiceRoom = () => {

    const { userName, userID, setRoom } = useContext(WSContext)

    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);

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

    return (
        <div>
            <div onClick={() => createOrJoinRoom()}>Play</div>
            <div onClick={() => setIsCreateModalVisible(true)}>Create Room</div>

           
                <div>
                    <p>Username: {userName}</p>
                </div>



            <Modal
                isModalVisible={isCreateModalVisible}
            >
                <CreateRoom
                    setIsModalVisible={setIsCreateModalVisible}

                />
            </Modal>
        </div>
    )
}

export default ChoiceRoom
