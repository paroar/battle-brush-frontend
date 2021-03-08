import React, { useContext } from 'react'
import ChoiceRoom from '../../components/ChoiceRoom/ChoiceRoom'
import { WSContext } from '../../contexts/websocket'
import Lobby from '../../components/Lobby/Lobby'
import main from '../../assets/main.svg'

const Home = () => {

    const { room } = useContext(WSContext)

    if (room.roomid) {
        return <Lobby/>
    }else {
        return (
            <section className="home">
                <h1 className="title">what the f*** is that</h1>
                <img className="svg" src={main} />
                <ChoiceRoom />
                <span className="contact">Want to add your draw to the front page? Contact me at <a href="">email</a></span>
            </section>
        )
    }


}

export default Home
