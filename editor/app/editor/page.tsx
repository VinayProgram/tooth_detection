'use client'

import React from 'react'
import EditorImage from './(components)/editor-image'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

const page = () => {
  return (
    <Canvas>
      <EditorImage/>
      <OrbitControls enableRotate={false}/>
    </Canvas>
  )
}

export default page
