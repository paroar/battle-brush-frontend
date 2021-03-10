import React from 'react'

type Props = {
    children: React.ReactNode
}

const Curtain = (props: Props) => {
    return (
        <div className="curtain">
            {props.children}
        </div>
    )
}

export default Curtain
