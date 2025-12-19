'use client'

import { Box, TransformControls } from '@react-three/drei'
import { useClipStore } from '@/app/store/clip-store'
import * as THREE from 'three'
import React, { useRef, useState } from 'react'

/* ---------------------------------------------
   DESTINATION IN CUTOUTS
----------------------------------------------*/


export const DestinationInCutOutsComponent = () => {
  const { boxSize, destinationInCutOuts } = useClipStore()
  const [activeObject, setActiveObject] = useState<THREE.Object3D | null>(null)

  if (!destinationInCutOuts || destinationInCutOuts.length === 0) return null

  return (
    <>
      {destinationInCutOuts.map((texture, index) => (

        <Box
          key={texture.uuid ?? index}
          name={index+"_tooth"}
          args={[1,1,1]}
          position={[0, 0, 0]} // spacing helps selection
          renderOrder={1}
          onPointerDown={(e) => {
            e.stopPropagation()
            console.log(e.object)
            setActiveObject(e.object)
          }}
        >
          <meshBasicMaterial
            map={texture}
            transparent
            depthWrite={false}
            depthTest
          />
        </Box>
      ))}

      {destinationInCutOuts.map((texture, index) => (
        <Box
          key={texture.uuid ?? index}
          name={index+"_tooth"}
          args={[1,1,1]}
          position={[0, 0, 0]} // spacing helps selection
          renderOrder={1}
          onPointerDown={(e) => {
            e.stopPropagation()
            console.log(e.object)
            setActiveObject(e.object)
          }}
        >
          <meshBasicMaterial
            color={"green"}
            transparent
            wireframe={true}
            depthWrite={false}
            depthTest
          />
        </Box>
      ))}

      {activeObject && (
        <TransformControls
          mode="translate"
          object={activeObject}
        />
      )}
    </>
  )
}



/* ---------------------------------------------
   DESTINATION OUT CUTOUT
----------------------------------------------*/
export const DestinationOutCutOutsComponent = () => {
  const { boxSize, destinationOutCutOuts } = useClipStore()
  if (!destinationOutCutOuts) return null

  return (
    <Box
      args={boxSize}
      position={[0, 0, 0]}
      renderOrder={2}
    >
      <meshBasicMaterial
        color={"lightblue"}
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
