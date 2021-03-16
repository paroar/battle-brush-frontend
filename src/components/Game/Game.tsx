import React, { useContext } from 'react'
import { WSContext } from '../../contexts/websocket'
import { GameState } from '../../types/types'
import CanvasFrame from '../CanvasFrame/CanvasFrame'
import Players from '../Players/Players'
import RoomState from '../RoomState/RoomState'
import UserInfo from '../UserInfo/UserInfo'

const Game = () => {

    const { roomState, room } = useContext(WSContext)

    const handleStart = async () => {
        fetch(`http://localhost:8085/startgame/${room.roomid}`)
    }

    return (
        <div className="game">
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