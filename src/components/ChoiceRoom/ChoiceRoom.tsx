import { CaretRightOutlined, PlusOutlined, ApiOutlined } from '@ant-design/icons';
import { Space, Button } from 'antd';
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
            <Space>
                <Button type="primary" size="large" icon={<CaretRightOutlined />} onClick={() => createOrJoinRoom()}>Play</Button>
                <Button type="primary" size="large" icon={<PlusOutlined />} onClick={() => setIsCreateModalVisible(true)}>Create Room</Button>
                <div>
                    <p>Username: {userName}</p>
                </div>

            </Space>

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
