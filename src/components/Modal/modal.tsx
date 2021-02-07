import { CloseOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import "./modal.css"

type Props = {
    isModalVisible: boolean
    setIsModalVisible: (_: boolean) => void
    children: React.ReactNode
}

const Modal = (props: Props) => {

    const { isModalVisible, setIsModalVisible } = props

    return (
        <div className={`modal-${isModalVisible ? "visible" : "invisible"}`}>
            <div className="modal-content">
                {props.children}
            </div>
        </div>
    )
}

export default Modal
