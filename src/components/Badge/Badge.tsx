type Props = {
    handler: () => void
    text: string
}

const Badge = (props: Props) => {

    const { text, handler } = props

    return (
        <div className="badge">
            <span onClick={() => handler()}>{text}</span>
        </div>
    )
}

export default Badge
