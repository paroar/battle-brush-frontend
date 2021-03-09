import { useContext } from 'react'
import { WSContext } from '../../contexts/websocket'

const Players = () => {

    const { players } = useContext(WSContext)

    return (
        <div className="players">
            {players.data.map(p => (
                <>
                    <span>{p.name}</span>
                    <span>{p.id}</span>
                </>
            ))}
        </div>
    )
}

export default Players
