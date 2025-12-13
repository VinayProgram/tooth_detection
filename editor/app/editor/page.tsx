'use client'

import React from 'react'
import EditorImage from './(components)/editor-image'
import { Canvas } from '@react-three/fiber'

const page = () => {
  return (
    <Canvas>
      <EditorImage/>
    </Canvas>
  )
}

export default page
