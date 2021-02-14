import React from 'react'
import "./modal.css"

type Props = {
    isModalVisible: boolean
    children: React.ReactNode
}

const Modal = (props: Props) => {

    const { isModalVisible } = props

    return (
        <div className={`modal-${isModalVisible ? "visible" : "invisible"}`}>
            <div className="modal-content">
                {props.children}
            </div>
        </div>
    )
}

export default Modal
