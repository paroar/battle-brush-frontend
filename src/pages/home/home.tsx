import React, { useContext, useLayoutEffect } from 'react'
import ChoiceRoom from '../../components/ChoiceRoom/ChoiceRoom'
import { WSContext } from '../../contexts/websocket'
import Lobby from '../../components/Lobby/Lobby'
import main from '../../assets/main.svg'
import kofi from '../../assets/BuyMeACoffee_Red.png'
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
                    <div className="home__contact">
                        <span >Want to add your drawing to the front page? Contact me at <a href="">email</a></span>
                    </div>
                    <div className="home__kofi"><a href="https://ko-fi.com/kamvas" target="_blank"><img src={kofi} alt="donation" /></a></div>
                </section>
            }
        </div>
    )
}

export default Home
