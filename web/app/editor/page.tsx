'use client'
import React from 'react'
import { useCanvas } from '../fabric-canvas-lib/canvas-provider'
import ImageEditingCanvas from '../(components)/poly-selector'
import Editor from '../(components)/editor-image'
import { Canvas } from '@react-three/fiber'

const page = () => {
    const { canvasRef } = useCanvas()
    const [action,setAction]=React.useState<{ action: string; newTime: string }>({action:"",newTime:""})
    return (
        <>
        <button onClick={()=>setAction({action:"include",newTime:Date.now().toString()})}>include</button>
        <button onClick={()=>setAction({action:"exclude",newTime:Date.now().toString()})}>exclude</button>
        <Canvas>
        <Editor  onMask={action}/>
        </Canvas>
       {/* <ImageEditingCanvas canvasRef={canvasRef}/> */}
        </>
    )
}

export default page
