import { useContext } from 'react'
import { WSContext } from '../../contexts/websocket'

const Theme = () => {

    const { theme } = useContext(WSContext)

    return (
        <>
            <h1>{theme}</h1>
        </>
    )
}

export default Theme
