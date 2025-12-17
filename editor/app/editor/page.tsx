'use client'

import React from 'react'
import EditorImage from './(components)/editor-image'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import RendererComponent from './(components)/render'

const page = () => {
  return (
   <div className="@container/main flex flex-1 flex-col">
      <div className="flex flex-col gap-4 ">
    <Canvas style={{height:'94vh'}}>
      <RendererComponent/>
      <OrbitControls enableRotate={true}/>
    </Canvas>
   </div>
   </div>
  )
}

export default page
