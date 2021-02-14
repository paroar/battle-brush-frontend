import { CaretRightOutlined, PlusOutlined, ApiOutlined } from '@ant-design/icons';
import { Space, Button } from 'antd';
import React, { useContext, useState } from 'react'
import { WSContext } from '../../contexts/websocket';
import Modal from '../Modal/Modal';
import  CreateRoom  from "../ModalRooms/CreateRoom";
import  JoinRoom  from "../ModalRooms/JoinRoom";


const ChoiceRoom = () => {

    const { userName, userID, setRoom } = useContext(WSContext)

    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
    const [isJoinModalVisible, setIsJoinModalVisible] = useState(false);

    const createOrJoinRoom = async () => {
        const url = "http://localhost:8085/createjoin"
        const res = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                userid: userID,
            })
        })
        if (res.ok){
            const data = await res.json()
            setRoom(data.roomid)
        }
    }
    
    return (
        <div>
            <Space>
                <Button type="primary" size="large" icon={<CaretRightOutlined />} onClick={()=>createOrJoinRoom()}>Play</Button>
                <Button type="primary" size="large" icon={<PlusOutlined />} onClick={() => setIsCreateModalVisible(true)}>Create Room</Button>
                <Button type="primary" size="large" icon={<ApiOutlined />} onClick={() => setIsJoinModalVisible(true)}>Join Room</Button>
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

            <Modal
                isModalVisible={isJoinModalVisible}
            >
                <JoinRoom
                    isModalVisible={isJoinModalVisible}
                    setIsModalVisible={setIsJoinModalVisible}
                />
            </Modal>
        </div>
    )
}

export default ChoiceRoom
