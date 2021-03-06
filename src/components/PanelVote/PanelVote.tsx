import { useContext, useEffect, useState } from 'react'
import poo from "../../assets/poo.png"
import paper from "../../assets/paper.png"
import sad from "../../assets/sad.png"
import great from "../../assets/great.png"
import love from "../../assets/love.png"
import unicorn from "../../assets/unicorn.png"
import { WSContext } from '../../contexts/websocket'
import { GameState, MessageType } from '../../types/types'

const PanelVote = () => {

    const {
        roomState,
        webSocket,
        draw,
    } = useContext(WSContext)

    const [vote, setVote] = useState(3.5)

    useEffect(() => {
        if (roomState === GameState.RecolectingVotes) {
            fetch("http://localhost:8085/vote", {
                method: "POST",
                body: JSON.stringify({
                    type: MessageType.Vote,
                    content: {
                        vote: vote,
                        userid: draw.userid
                    }
                })
            })
            console.log("RecolectingVotes")
        }
    }, [roomState])

    useEffect(() => {
        setVote(3.5)
    }, [roomState])

    return (
        <>
            <div className={`container-img`}>
                <img alt="user drawing" className="img" src={draw.img} />
            </div>
            <div className="voting">
                <div onClick={() => setVote(1)}>
                    <img className="voting-img" alt="poo" src={poo} />
                </div>
                <div onClick={() => setVote(2)}>
                    <img className="voting-img" alt="paper" src={paper} />
                </div>
                <div onClick={() => setVote(3)}>
                    <img className="voting-img" alt="sad" src={sad} />
                </div>
                <div onClick={() => setVote(4)}>
                    <img className="voting-img" alt="great" src={great} />
                </div>
                <div onClick={() => setVote(5)}>
                    <img className="voting-img" alt="love" src={love} />
                </div>
                <div onClick={() => setVote(6)}>
                    <img className="voting-img" alt="unicorn" src={unicorn} />
                </div>
            </div>
        </>
    )
}

export default PanelVote
