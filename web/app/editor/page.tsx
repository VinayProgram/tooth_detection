'use client'
import React from 'react'
import { useCanvas } from '../fabric-canvas-lib/canvas-provider'
import ImageEditingCanvas from '../(components)/poly-selector'

const page = () => {
    const { canvasRef } = useCanvas()
    return (
        <>
       <ImageEditingCanvas canvasRef={canvasRef}/>
        </>
    )
}

export default page
