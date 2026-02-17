'use client'

import { Box, Edges, TransformControls } from '@react-three/drei'
import { useClipStore } from '@/app/store/clip-store'
import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import { useThree } from '@react-three/fiber'



export const DestinationInCutOutsComponent = () => {
  const { destinationInCutOuts,boxSize,imageTexture,activeObject } = useClipStore()
    const {scene}=useThree()

  if (!destinationInCutOuts || destinationInCutOuts.length === 0) return null
  
  return (
    <>
      {destinationInCutOuts.map((texture, index) => {

        return (

          <Box
            key={texture.uuid ?? index}
            name={texture.uuid + "_tooth"}
            args={boxSize}
            position={[0,0,0]} // spacing helps selection
            renderOrder={1}
           
          >
            <meshBasicMaterial
              map={texture}
              transparent
              depthWrite={false}
              depthTest
            />
            {/* <Edges color={"lime"}/> */}
          </Box>
        )
      })}


      {activeObject && (
        <TransformControls
        showZ={false}
          mode="rotate"
          object={scene.getObjectByName(activeObject+ "_tooth")}
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

const PIXEL_TO_WORLD = 0.025; // 1px = 0.01 world units


function textureToBoxSize(texture: THREE.Texture) {
  const img = texture.image as HTMLCanvasElement;

  const width = img.width * PIXEL_TO_WORLD;
  const height = img.height * PIXEL_TO_WORLD;

  return [width, height, 0.1] as [number, number, number];
}


function bboxToWorldPosition(
  bbox: { xmin: number; ymin: number; width: number; height: number },
  imageWidth: number,
  imageHeight: number
) {
  const cx = bbox.xmin + bbox.width / 2;
  const cy = bbox.ymin + bbox.height / 2;

  const x =
    (cx - imageWidth / 2) * PIXEL_TO_WORLD;

  const y =
    -(cy - imageHeight / 2) * PIXEL_TO_WORLD;

  return [x, y, 0] as [number, number, number];
}

