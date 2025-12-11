import React from 'react'

const Canvas = ({canvasRef}:{canvasRef:React.RefObject<HTMLCanvasElement | null>}) => {
    return (
        <canvas
            ref={canvasRef}
            style={{ border: "1px solid #ccc", width: "100%", height: "auto" }}
        />
    )
}

export default Canvas
