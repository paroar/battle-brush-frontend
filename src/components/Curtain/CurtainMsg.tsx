import React from 'react'

type Props = {
    text: string
}

const CurtainMsg = (props: Props) => {
    return (
        <div className="curtain-msg">
            <h1>{props.text}</h1>
        </div>
    )
}

export default CurtainMsg
