import { useContext } from 'react'
import { WSContext } from '../../contexts/websocket'
import Theme from '../Theme/Theme'

const Winner = () => {

    const {
        winner
    } = useContext(WSContext)

    return (
        <>
            <div className="canvas-container" >
                <img alt="user drawing" className="img" src={winner.img} />
            </div>
            <Theme>: by {winner.username}</Theme>
        </>
    )
}

export default Winner
