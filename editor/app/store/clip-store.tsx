import { create } from 'zustand'
import * as THREE from 'three'
type ClipStore = {
  onMask: { action: GlobalCompositeOperation; newTime: string } 
  setOnMask:(mask:{ action: GlobalCompositeOperation; newTime: string })=>void

  points3D:{ [key: string]: THREE.Vector3[] }
  setPoints3D:(data:{ [key: string]: THREE.Vector3[] })=>void

 
  orignalImageMeshRef:THREE.Mesh|null
  setOrignalImageMeshRef:(data:THREE.Mesh)=>void

  boxSize:[number, number, number]
  setBoxSize:(boxSize:[number, number, number])=>void

  imageTexture:THREE.Texture<unknown>|null,
  setImageTexture:(img:THREE.Texture<unknown>)=>void

  destinationInCutOuts:THREE.CanvasTexture<HTMLCanvasElement>[],
  setDestinationInCutOuts:(data:THREE.CanvasTexture<HTMLCanvasElement>[])=>void

  destinationOutCutOuts:THREE.CanvasTexture<HTMLCanvasElement>|null,
  setDestinationOutCutOuts:(data:THREE.CanvasTexture<HTMLCanvasElement>)=>void
}

export const useClipStore = create<ClipStore>()((set) => ({
onMask:{action:'destination-in',newTime:""},
setOnMask:(mask)=>set({onMask:mask}) ,

points3D:{},
setPoints3D:(data)=>{set({points3D:data})},

orignalImageMeshRef:null,
setOrignalImageMeshRef(data) {
  set({orignalImageMeshRef:data})
},

boxSize:[1, 1, 0],
setBoxSize:(d)=>{set({boxSize:d})},

imageTexture:null,
setImageTexture:(img)=>set({imageTexture:img}),

destinationInCutOuts:[],
setDestinationInCutOuts(data) {
  set({destinationInCutOuts:data})
},


destinationOutCutOuts:null,
setDestinationOutCutOuts(data) {
  set({destinationOutCutOuts:data})
},
}))

