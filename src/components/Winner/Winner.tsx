import React, { useContext } from 'react'
import { WSContext } from '../../contexts/websocket'
import CanvasFrame from '../CanvasFrame/CanvasFrame'

const Winner = () => {

    const {
        winner,
        theme
    } = useContext(WSContext)

    return (
        <>
            <CanvasFrame isDisabled={true} drawImg={winner.img} />
            <h1 className="winner">
                <span className="winner__theme">{theme}</span>: by {winner.username}
            </h1>
        </>
    )
}

export default Winner
