import { create } from 'zustand'
import { globalCompositeOperationType } from '../editor/utils/masking';
type ClipStore = {
  onMask: { action: globalCompositeOperationType; newTime: string } 
  setOnMask:(mask:{ action: globalCompositeOperationType; newTime: string })=>void
}

export const useClipStore = create<ClipStore>()((set) => ({
onMask:{action:"destination-in",newTime:""},
setOnMask:(mask)=>set({onMask:mask})  
}))

