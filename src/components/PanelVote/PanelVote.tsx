import { useContext } from 'react'
import poo from "../../assets/poo.png"
import paper from "../../assets/paper.png"
import sad from "../../assets/sad.png"
import great from "../../assets/great.png"
import love from "../../assets/love.png"
import unicorn from "../../assets/unicorn.png"
import { WSContext } from '../../contexts/websocket'
import Skeleton from 'react-loading-skeleton'

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

            <img alt="user drawing" className="img" src={draw.img} />

            <div className="voting">
                <div onClick={() => handler(1)}>
                    <img className="voting-img" alt="poo" src={poo} />
                </div>
                <div onClick={() => handler(2)}>
                    <img className="voting-img" alt="paper" src={paper} />
                </div>
                <div onClick={() => handler(3)}>
                    <img className="voting-img" alt="sad" src={sad} />
                </div>
                <div onClick={() => handler(4)}>
                    <img className="voting-img" alt="great" src={great} />
                </div>
                <div onClick={() => handler(5)}>
                    <img className="voting-img" alt="love" src={love} />
                </div>
                <div onClick={() => handler(6)}>
                    <img className="voting-img" alt="unicorn" src={unicorn} />
                </div>
            </div>
        </>
    )
}

export default PanelVote
