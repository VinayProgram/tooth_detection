'use client'

import React from 'react'
import EditorImage from './(components)/editor-image'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import RendererComponent from './(components)/render'
import Layers from './(components)/layers'
import { useSearchParams } from 'next/navigation'

const page = () => {
  const query = useSearchParams()
  const action = query.get('stage')
  return (
    <div className="@container/main flex flex-1 flex-col">
      <div className="flex flex-col gap-4 ">
        {action == 'showmasks-both' && <Layers />}
        <Canvas style={{ height: '94vh' }}>
          <RendererComponent />
          <OrbitControls enableRotate={false} />
        </Canvas>
      </div>
    </div>
  )
}

export default page
