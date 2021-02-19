import { CaretRightOutlined, PlusOutlined, ApiOutlined } from '@ant-design/icons';
import { Space, Button } from 'antd';
import React, { useContext, useState } from 'react'
import { WSContext } from '../../contexts/websocket';
import { MessageType } from '../../types/types';
import Modal from '../Modal/Modal';
import  CreateRoom  from "../ModalRooms/CreateRoom";


const ChoiceRoom = () => {

    const { userName, webSocket } = useContext(WSContext)

    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);

    const createOrJoinRoom = async () => {
        webSocket.send(JSON.stringify({
            type: MessageType.RoomCommand,
            content: {
                command: "JoinCreate",
            }
        }))
    }
    
    return (
        <div>
            <Space>
                <Button type="primary" size="large" icon={<CaretRightOutlined />} onClick={()=>createOrJoinRoom()}>Play</Button>
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
