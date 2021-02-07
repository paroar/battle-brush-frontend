
import React, { useEffect, useRef } from "react";
import './canvas.css'

export const Canvas: React.FC = () => {

    const canvas = useRef<HTMLCanvasElement>(null)
    const ctx = useRef(canvas?.current?.getContext("2d"));

    const lastX = useRef(0);
    const lastY = useRef(0);

    const isDrawing = useRef(false)

    const drawOnCanvas = (event: MouseEvent) => {
        if (!ctx || !ctx.current) {
          return;
        }
        if(isDrawing.current){
            ctx.current.beginPath();
            ctx.current.moveTo(lastX.current, lastY.current);
            ctx.current.lineTo(event.offsetX, event.offsetY);
            ctx.current.stroke();
        }
    
        [lastX.current, lastY.current] = [event.offsetX, event.offsetY];
      }
    
      const handleMouseDown = (e: MouseEvent) => {
        isDrawing.current = true;
        [lastX.current, lastY.current] = [e.offsetX, e.offsetY];
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

      

    return (
        <canvas ref={canvas} className="canvas" width="1280" height="720"/>
    )
};