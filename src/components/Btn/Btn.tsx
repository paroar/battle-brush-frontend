type Props = {
    handler: () => void
    text: string
}

const Btn = (props: Props) => {

    const {handler, text} = props

    return (
        <div className="btn" onClick={() => handler()}>
            <span>{text}</span>
        </div>
    )
}

export default Btn
