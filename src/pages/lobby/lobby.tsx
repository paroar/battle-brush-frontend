import { PlusOutlined, RedoOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'
import React, { useContext } from 'react'
import { WSContext } from '../../contexts/websocket'
import './lobby.css'

const Lobby = () => {

    const {webSocket} = useContext(WSContext)

    return (
        <>
            <Space>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => webSocket.send(JSON.stringify({msg: "create"}))}>Create Room</Button>
                <Button type="primary" icon={<RedoOutlined />} onClick={() => webSocket.send(JSON.stringify({msg: "refresh"}))}>refresh Rooms</Button>
            </Space>
        </>
    )

}

export default Lobby
