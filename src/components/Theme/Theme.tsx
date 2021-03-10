import { useContext } from 'react'
import { WSContext } from '../../contexts/websocket'

type Props = {
    children?: React.ReactNode
}

const Theme = (props: Props) => {

    const { theme } = useContext(WSContext)

    return (
        <>
            <h1>{theme}{props.children}</h1>
        </>
    )
}

export default Theme
