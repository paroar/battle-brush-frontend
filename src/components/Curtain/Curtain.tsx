import React from 'react'

type Props = {
    children?: React.ReactNode
    className?: string
}

const Curtain = (props: Props) => {

    const {children, className} = props

    return (
        <div className={className}>
            {children}
        </div>
    )
}

export default Curtain
