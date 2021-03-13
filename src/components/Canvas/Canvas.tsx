import React, { useEffect, useRef } from "react";
import './canvas.css'
import CanvasDraw, { CanvasDrawProps } from 'react-canvas-draw'

type Props = {
  width: number
  height: number
  handler: (_: string) => void
}

const Canvas = (props: Props) => {

  const { width, height, handler } = props

  const canvasRef = useRef<CanvasDraw>(null)

  const saveCanvas = () => {
    if (canvasRef.current) {
      const data = canvasRef.current.getSaveData()
      handler(data)
    }
  }

  const clear = () => {
    if (canvasRef.current) {
      canvasRef.current.clear()
      saveCanvas()
    }
  }

  const undo = () => {
    if (canvasRef.current) {
      canvasRef.current.undo()
    }
  }

  return (
    <>
      <CanvasDraw
        ref={canvasRef}
        brushRadius={5}
        onChange={() => saveCanvas()}
        canvasWidth={width}
        canvasHeight={height}
      />
      <button onClick={() => clear()}>Clear</button>
      <button onClick={() => undo()}>Undo</button>
    </>
  )
};

export default Canvas