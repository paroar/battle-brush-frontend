import ReactCountdownClock from 'react-countdown-clock'

type Props = {
    seconds: number
    color: string
    alpha?: number
    size?: number
}

const Timer = (props: Props) => {

    const { seconds, color, alpha, size } = props

    return (
        <div className="timer">
            <ReactCountdownClock
                seconds={seconds}
                color={color}
                alpha={alpha}
                size={size} />
        </div>
    )
}

export default Timer
