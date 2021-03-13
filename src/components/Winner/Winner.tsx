import React, { useContext, useEffect, useRef } from 'react'
import CanvasDraw from 'react-canvas-draw'
import { WSContext } from '../../contexts/websocket'
import Theme from '../Theme/Theme'

type Props = {
    width: number
    height: number
}

const Winner = (props: Props) => {

    const {
        winner
    } = useContext(WSContext)

    const {width, height} = props

    const canvasRef = useRef<CanvasDraw>(null)

    useEffect(() => {
        if (canvasRef.current) {
            canvasRef.current.loadSaveData(winner.img)
        }
    }, [])

    return (
        <>
            <CanvasDraw
                ref={canvasRef}
                loadTimeOffset={8}
                brushRadius={5}
                disabled
                canvasWidth={width}
                canvasHeight={height}
                hideInterface={true}
            />
            <Theme>: by {winner.username}</Theme>
        </>
    )
}

export default Winner
