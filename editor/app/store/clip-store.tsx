import { create } from 'zustand'
type ClipStore = {
  onMask: { action: string; newTime: string } 
  setOnMask:(mask:{ action: string; newTime: string })=>void
}

export const useClipStore = create<ClipStore>()((set) => ({
onMask:{action:"",newTime:""},
setOnMask:(mask)=>set({onMask:mask})  
}))

