type Props = {
    handler: () => {}
    text: string
}

const Btn = (props: Props) => {
    return <div className="btn" onClick={() => props.handler()}>{props.text}</div>
}

export default Btn
