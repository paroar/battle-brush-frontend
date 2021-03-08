import React, { useContext, useEffect, useRef } from "react";
import { WSContext } from "../../contexts/websocket";
import { GameState } from "../../types/types";
import './canvas.css'

type Props = {
  width: number
  height: number
}

const Canvas = (props: Props) => {

  const { width, height } = props

  const { roomState, userID, room } = useContext(WSContext)

  const canvas = useRef<HTMLCanvasElement>(null)
  const ctx = useRef(canvas?.current?.getContext("2d"));

  const lastX = useRef(0);
  const lastY = useRef(0);

  const isDrawing = useRef(false)

  const drawOnCanvas = (e: MouseEvent) => {
    if (!ctx || !ctx.current) {
      return;
    }
    if (isDrawing.current) {
      ctx.current.beginPath();
      ctx.current.moveTo(lastX.current, lastY.current);
      ctx.current.lineTo(e.offsetX, e.offsetY);
      ctx.current.stroke();
    }

    [lastX.current, lastY.current] = getMousePos(canvas, e);
  }

  const handleMouseDown = (e: MouseEvent) => {
    isDrawing.current = true;
    [lastX.current, lastY.current] = getMousePos(canvas, e);
  }

  function getMousePos(canvas: React.RefObject<HTMLCanvasElement>, e: MouseEvent) {
    var rect = canvas.current?.getBoundingClientRect();
    const mousePos = [
      Math.round((e.clientX - rect!.left) / (rect!.right - rect!.left) * canvas.current!.width),
      Math.round((e.clientY - rect!.top) / (rect!.bottom - rect!.top) * canvas.current!.height)
    ]
    console.log(mousePos)
    return mousePos
  }

  const stopDrawing = () => {
    isDrawing.current = false;
  }

  useEffect(() => {
    ctx.current = canvas?.current?.getContext("2d");
    if (canvas && canvas.current && ctx && ctx.current) {
      canvas.current.addEventListener("mousedown", handleMouseDown);
      canvas.current.addEventListener("mousemove", drawOnCanvas);
      canvas.current.addEventListener("mouseup", stopDrawing);
      canvas.current.addEventListener("mouseout", stopDrawing);

      ctx.current.strokeStyle = "#000";
      ctx.current.lineJoin = "round";
      ctx.current.lineCap = "round";
      ctx.current.lineWidth = 10;
    }

    return () => {
      canvas.current?.removeEventListener("mousedown", handleMouseDown);
      canvas.current?.removeEventListener("mousemove", drawOnCanvas);
      canvas.current?.removeEventListener("mouseup", stopDrawing);
      canvas.current?.removeEventListener("mouseout", stopDrawing);
    }
  }, []);

  useEffect(() => {
    if (roomState == GameState.Recolecting) {
      const imgString = canvas.current?.toDataURL()
      fetch("http://localhost:8085/img", {
        method: "POST",
        body: JSON.stringify({
          playerid: userID,
          roomid: room.roomid,
          img: imgString,
        })
      })
    }
  }, [roomState])

  return (
    <div>
      < canvas width={width} height={height} ref={canvas} className="canvas" />
    </div>
  )
};

export default Canvas