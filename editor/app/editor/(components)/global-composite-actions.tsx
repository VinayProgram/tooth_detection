'use client'

import { Box } from '@react-three/drei'
import { useClipStore } from '@/app/store/clip-store'
import * as THREE from 'three'
import React from 'react'

/* ---------------------------------------------
   DESTINATION IN CUTOUTS
----------------------------------------------*/
const DestinationInCutOutsComponent = () => {
  const { boxSize, destinationInCutOuts } = useClipStore()

  if (!destinationInCutOuts || destinationInCutOuts.length === 0) return null

  return (
    <>
      {destinationInCutOuts.map((texture, index) => (
        <Box
          key={texture.uuid ?? index}
          args={boxSize}
          position={[0, 0, 0]}
          renderOrder={1}
        >
          <meshBasicMaterial
            attach="material"
            map={texture}
            transparent
            depthWrite={false}
            depthTest={true}
            blending={THREE.NormalBlending}
          />
        </Box>
      ))}
    </>
  )
}

/* ---------------------------------------------
   DESTINATION OUT CUTOUT
----------------------------------------------*/
export const DestinationOutCutOutsComponent = () => {
  const { boxSize, destinationOutCutOuts,destinationInCutOuts } = useClipStore()
  console.log('inn',destinationInCutOuts,'out',destinationOutCutOuts)
  if (!destinationOutCutOuts) return null

  return (
    <Box
      args={boxSize}
      position={[0, 0, 0]}
      renderOrder={2}
    >
      <meshBasicMaterial
        attach="material"
        map={destinationOutCutOuts}
        transparent
        depthWrite={false}
        depthTest={true}
        blending={THREE.NormalBlending}
      />
    </Box>
  )
}

export default DestinationInCutOutsComponent
