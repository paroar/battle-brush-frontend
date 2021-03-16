import React, { useContext, useLayoutEffect } from 'react'
import ChoiceRoom from '../../components/ChoiceRoom/ChoiceRoom'
import { WSContext } from '../../contexts/websocket'
import Lobby from '../../components/Lobby/Lobby'
import main from '../../assets/main.svg'
import Vivus from 'vivus'

const Home = () => {

    const { room } = useContext(WSContext)

    useLayoutEffect(() => {
        new Vivus('home-svg', {
            duration: 1000,
            file: main,
            type: 'oneByOne',
        })
    }, [])

    return (
        <div className="content-wrapper">
            {room.roomid ?
                <Lobby />
                :
                <section className="home">
                    <h1 className="home__title">what the f*** is that</h1>
                    <div id="home-svg" className="home__svg" />
                    <ChoiceRoom />
                    <span className="home__contact">Want to add your drawing to the front page? Contact me at <a href="">email</a></span>
                </section>
            }
        </div>
    )
}

export default Home
