import React, { useContext, useEffect } from 'react'
import ChoiceRoom from '../../components/ChoiceRoom/ChoiceRoom'
import { WSContext } from '../../contexts/websocket'
import Lobby from '../../components/Lobby/Lobby'
import main from '../../assets/main.svg'
import ReactVivus from 'react-vivus';
import Vivus from 'vivus'

const Home = () => {

    const { room } = useContext(WSContext)

    useEffect(() => {
        new Vivus('my-div', { 
            duration: 1500, 
            file: main,
            type: "oneByOne"
        })
    }, [])

    if (room.roomid) {
        return <Lobby />
    } else {
        return (
            <section className="home">
                <h1 className="title">what the f*** is that</h1>
                <div id="my-div" className="svg"></div>
                <ChoiceRoom />
                <span className="contact">Want to add your drawing to the front page? Contact me at <a href="">email</a></span>
            </section>
        )
    }


}

export default Home
