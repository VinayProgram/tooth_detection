import { create } from 'zustand'
import * as fabric from 'fabric'
type ClipStore = {
  clipShapes: fabric.Polyline<{
    fill: string;
    strokeWidth: number;
    stroke: string;
    objectCaching: false;
    transparentCorners: false;
    cornerColor: string;
  }, fabric.SerializedPolylineProps, fabric.ObjectEvents>[]|null
  selClipShapes: (set: fabric.Polyline<{
    fill: string;
    strokeWidth: number;
    stroke: string;
    objectCaching: false;
    transparentCorners: false;
    cornerColor: string;
  }, fabric.SerializedPolylineProps, fabric.ObjectEvents>[]) => void
}

export const useClipStore = create<ClipStore>()((set) => ({
  clipShapes:null,
  selClipShapes:(seg)=>{set({clipShapes:seg})}
}))

