import { ApiOutlined, CaretRightOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Space, Input } from 'antd'
import React, { useContext, useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import Modal from '../../components/Modal/modal'
import CreateRoom from '../../components/ModalRooms/createRoom'
import JoinRoom from '../../components/ModalRooms/joinRoom'
import { WSContext } from '../../contexts/websocket'
import './home.css'

interface Props extends RouteComponentProps{}

const Home = (props: Props) => {

    const { userName, userID, roomRef } = useContext(WSContext)

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
            roomRef.current = data.roomid
            props.history.push("/lobby")
        }
    }

    return (
        <>
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
                    isModalVisible={isJoinModalVisible}
                    setIsModalVisible={setIsJoinModalVisible}
                />
            </Modal>
        </>
    )

}

export default withRouter(Home)
