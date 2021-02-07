import { ApiOutlined, CaretRightOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Space, Input } from 'antd'
import React, { useContext, useState } from 'react'
import Modal from '../../components/Modal/modal'
import CreateRoom from '../../components/ModalRooms/createRoom'
import JoinRoom from '../../components/ModalRooms/joinRoom'
import { WSContext } from '../../contexts/websocket'
import './home.css'

const Home = () => {

    const { userID } = useContext(WSContext)

    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
    const [isJoinModalVisible, setIsJoinModalVisible] = useState(false);

    return (
        <>
            <Space>
                <Button type="primary" size="large" icon={<CaretRightOutlined />}>Play</Button>
                <Button type="primary" size="large" icon={<PlusOutlined />} onClick={() => setIsCreateModalVisible(true)}>Create Room</Button>
                <Button type="primary" size="large" icon={<ApiOutlined />} onClick={() => setIsJoinModalVisible(true)}>Join Room</Button>
                <p>{userID}</p>
            </Space>

            <Modal
                isModalVisible={isCreateModalVisible}
                setIsModalVisible={setIsCreateModalVisible}
            >
                <CreateRoom
                    setIsModalVisible={setIsCreateModalVisible}

                />
            </Modal>

            <Modal
                isModalVisible={isJoinModalVisible}
                setIsModalVisible={setIsJoinModalVisible}
            >
                <JoinRoom
                    setIsModalVisible={setIsJoinModalVisible}
                />
            </Modal>
        </>
    )

}

export default Home
