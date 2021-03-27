import React, { Children, useContext } from 'react'
import { WSContext } from '../../contexts/websocket'
import { GameState } from '../../types/types'
import CanvasFrame from '../CanvasFrame/CanvasFrame'
import Players from '../Players/Players'
import RoomState from '../RoomState/RoomState'
import UserInfo from '../UserInfo/UserInfo'

type Props = {
    className?: string
}

const Game = (props: Props) => {

    const { roomState, room } = useContext(WSContext)

    const { className } = props

    const handleStart = async () => {
        fetch(`${process.env.REACT_APP_API_ENDPOINT}/startgame/${room.roomid}`)
    }

    return (
        <div className={`game ${className}`}>
            <UserInfo />
            <Players />
            {roomState === GameState.Waiting ?
                <>
                    <CanvasFrame isDisabled={false} />
                    <div className="btn-back" onClick={() => handleStart()}>
                        <span>Start</span>
                    </div>
                </>
                :
                <RoomState />
            }
        </div>
    )
}

export default Game