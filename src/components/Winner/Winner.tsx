import React, { useContext } from 'react'
import { WSContext } from '../../contexts/websocket'
import CanvasFrame from '../CanvasFrame/CanvasFrame'
import Theme from '../Theme/Theme'


const Winner = () => {

    const {
        winner
    } = useContext(WSContext)

    return (
        <>
            <CanvasFrame isDisabled={true} handlerImg={() => { }} drawImg={winner.img}/>
            <Theme>: by {winner.username}</Theme>
        </>
    )
}

export default Winner
