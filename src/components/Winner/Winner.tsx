import { useContext } from 'react'
import { WSContext } from '../../contexts/websocket'

const Winner = () => {

    const {
        theme,
        winner
    } = useContext(WSContext)
    
    return (
        <>
            <p>{theme}</p>
            <h2>{winner.username}</h2>
            <div className={`container-img`}>
                <img alt="user drawing" className="img" src={winner.img} />
            </div>
        </>
    )
}

export default Winner
