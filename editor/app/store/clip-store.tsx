import { create } from 'zustand'
import { globalCompositeOperationType } from '../editor/utils/masking';
import * as THREE from 'three'
type ClipStore = {
  onMask: { action: globalCompositeOperationType; newTime: string } 
  setOnMask:(mask:{ action: globalCompositeOperationType; newTime: string })=>void
  points3D:{ [key: string]: THREE.Vector3[] }
  setPoints3D:(data:{ [key: string]: THREE.Vector3[] })=>void
  orignalImageTexture:THREE.Texture<unknown>|null,
  setOringalImageTexture:(data:THREE.Texture<unknown>)=>void
}

export const useClipStore = create<ClipStore>()((set) => ({
onMask:{action:"destination-in",newTime:""},
setOnMask:(mask)=>set({onMask:mask}) ,
points3D:{},
setPoints3D:(data)=>{set({points3D:data})},
orignalImageTexture:null,
setOringalImageTexture(data) {
  set({orignalImageTexture:data})
},
}))

