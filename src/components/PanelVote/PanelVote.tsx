import React, { useContext } from 'react'
import poo from "../../assets/poo.png"
import paper from "../../assets/paper.png"
import sad from "../../assets/sad.png"
import great from "../../assets/great.png"
import love from "../../assets/love.png"
import unicorn from "../../assets/unicorn.png"
import { WSContext } from '../../contexts/websocket'
import CanvasFrame from '../CanvasFrame/CanvasFrame'

const images = [
    { alt: "poo", src: poo, vote: 1 },
    { alt: "paper", src: paper, vote: 2 },
    { alt: "sad", src: sad, vote: 3 },
    { alt: "great", src: great, vote: 4 },
    { alt: "love", src: love, vote: 5 },
    { alt: "unicorn", src: unicorn, vote: 6 },
]

type Props = {
    handler: (_: number) => void
}

const PanelVote = (props: Props) => {

    const {
        draw,
    } = useContext(WSContext)

    const { handler } = props

    return (
        <>
            <CanvasFrame isDisabled={true} drawImg={draw.img} />
            <div className="panel-vote">
                {images.map(i => (
                    <div onClick={() => handler(i.vote)}>
                        <img className="panel-vote__img" alt={i.alt} src={i.src} />
                    </div>
                ))}
            </div>
        </>
    )
}

export default PanelVote
