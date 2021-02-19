import React, { useContext } from 'react'
import ChoiceRoom from '../../components/ChoiceRoom/ChoiceRoom'
import { WSContext } from '../../contexts/websocket'
import Lobby from '../../components/Lobby/Lobby'
import './home.css'

const Home = () => {

    const { room } = useContext(WSContext)

    return (
        room.roomid ? <Lobby/> : <ChoiceRoom/>
    )

}

export default Home
