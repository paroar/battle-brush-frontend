import { useContext } from 'react'
import { WSContext } from '../../contexts/websocket'
import Badge from '../Badge/Badge'

const Players = () => {

    const { players, userID, userName } = useContext(WSContext)

    return (
        <div className="players">
            <Badge text={userName} handler={() => console.log()}/>
            {players.data.filter(p => p.id != userID).map(p => (
                <Badge key={p.id} text={p.name} handler={() => console.log(p.id)} />
            ))}
        </div>
    )
}

export default Players
