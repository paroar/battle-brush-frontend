import { useContext } from 'react'
import { WSContext } from '../../contexts/websocket'

const Players = () => {

    const { players } = useContext(WSContext)

    return (
        <div className="players">
            {players?.map(p => (
                <p>{p}</p>
            ))}
        </div>
    )
}

export default Players
