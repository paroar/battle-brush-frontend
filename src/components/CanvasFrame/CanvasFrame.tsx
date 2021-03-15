import CanvasDraw from 'react-canvas-draw'
import { FaEraser, FaRegTrashAlt, FaBackward, FaPaintBrush, FaDotCircle, FaSquare, FaSave } from 'react-icons/fa'

const pallete = [
    "#0771df",
    "#12bfcc",
    "#00da6c",
    "#7cd322",
    "#f5cc00",
    "#f2a301",
    "#fe9400",
    "#e14b00",
    "#f71f20",
    "#f80094",
    "#a441b8",
    "#6c40b9",
    "#ffffff",
    "#808080",
    "#000000",
]

const CanvasFrame = () => {
    return (
        <div className="canvas-grid">
            <CanvasDraw
                className="canvas"
                brushRadius={5}
                canvasWidth={864}
                canvasHeight={540}
            />
            <div className="tools">
                <FaSave size={25} />
                <FaRegTrashAlt size={25} />
                <FaBackward size={25} />
                <FaEraser size={25} />
                <FaPaintBrush size={25} />
            </div>
            <div className="brush-size">
                <FaDotCircle size={10} />
                <FaDotCircle size={15} />
                <FaDotCircle size={20} />
                <FaDotCircle size={25} />
                <FaDotCircle size={30} />
            </div>
            <div className="pallete">
                {pallete.map(p => (
                    <FaSquare color={p} size={20} />
                ))}
            </div>
            <div className="first">
                <input className="input" type="color" name="" id="" />
            </div>
            <div className="second">
                <input className="input" type="color" name="" id="" />
            </div>
        </div>
    )
}

export default CanvasFrame
