import { useEffect, useRef, useState } from 'react'
import CanvasDraw from 'react-canvas-draw'
import { FaEraser, FaRegTrashAlt, FaBackward, FaPaintBrush, FaDotCircle, FaSquare } from 'react-icons/fa'

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

const brushSizes = [5, 10, 15, 20]

enum ACTIONS {
    BRUSH = "brush",
    ERASE = "erase",
}

type Props = {
    drawImg?: string
    handlerImg?: (_: string) => void
    isDisabled: boolean
}

const CanvasFrame = (props: Props) => {

    const { handlerImg, isDisabled, drawImg } = props

    const [brushColor, setBrushColor] = useState("#000000")
    const [brushColorSecond, setBrushColorSecond] = useState("#000000")

    const [brushSize, setBrushSize] = useState(5)
    const [lazyRadius, setLazyRadius] = useState(10)

    const [tool, setTool] = useState(ACTIONS.BRUSH)

    const canvasRef = useRef<CanvasDraw>(null)

    useEffect(() => {
        if (canvasRef.current && drawImg) {
            canvasRef.current.loadSaveData(drawImg)
        }
    }, [drawImg])

    const handleClear = () => {
        if (canvasRef.current) {
            canvasRef.current.clear()
        }
    }

    const handleUndo = () => {
        if (canvasRef.current) {
            canvasRef.current.undo()
        }
    }

    const handleColor = (c: string) => {
        setBrushColor(c)
        setTool(ACTIONS.BRUSH)
        setLazyRadius(10)
    }

    const handleEraser = () => {
        if (tool !== ACTIONS.ERASE) {
            setTool(ACTIONS.ERASE)
            setLazyRadius(0)
            setBrushColorSecond(brushColor)
            setBrushColor("#ffffff")
        }
    }

    const handleBrush = () => {
        if (tool !== ACTIONS.BRUSH) {
            setTool(ACTIONS.BRUSH)
            setLazyRadius(10)
            setBrushColor(brushColorSecond)
            setBrushColorSecond(brushColor)
        }
    }

    const submitImg = () => {
        if (canvasRef.current && handlerImg) {
            handlerImg(canvasRef.current.getSaveData())
        }
    }

    return (
        <div className="canvas-frame">
            <CanvasDraw
                className={`canvas-frame__canvas ${tool}`}
                ref={canvasRef}
                brushRadius={brushSize}
                canvasWidth={864}
                canvasHeight={540}
                brushColor={brushColor}
                lazyRadius={lazyRadius}
                hideGrid={true}
                disabled={isDisabled}
                hideInterface={isDisabled}
                onChange={() => submitImg()}
            />

            {isDisabled ?
                null
                :
                (
                    <>
                        <div className="canvas-frame__tools">
                            <FaRegTrashAlt size={25} onClick={() => handleClear()} />
                            <FaBackward size={25} onClick={() => handleUndo()} />
                            <FaEraser size={25} onClick={() => handleEraser()} className={tool === ACTIONS.ERASE ? "selected" : ""} />
                            <FaPaintBrush size={25} onClick={() => handleBrush()} className={tool === ACTIONS.BRUSH ? "selected" : ""} />
                        </div>
                        <div className="canvas-frame__brush-size">
                            {brushSizes.map(b => (
                                <FaDotCircle key={b} size={b * 2} onClick={() => setBrushSize(b)} className={brushSize === b ? "selected" : ""} />
                            ))}
                        </div>
                        <div className="canvas-frame__pallete">
                            {pallete.map(p => (
                                <FaSquare key={p} color={p} size={30} onClick={() => handleColor(p)} />
                            ))}
                        </div>
                        <div className="canvas-frame__pick">
                            <input className="input" type="color" name="" id="" value={brushColor} onChange={(e) => setBrushColor(e.currentTarget.value)} />
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default CanvasFrame
