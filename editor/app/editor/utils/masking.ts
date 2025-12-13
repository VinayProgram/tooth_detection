import * as THREE from 'three'

export type globalCompositeOperationType="destination-in" | "destination-out"
interface ArgsForMasking {
orignalImageMeshRef:THREE.Mesh,
point: THREE.Vector3,
boxSize:{
    height:number,
    width:number
},
texture:THREE.Texture<unknown>,
polygon: THREE.Vector3[],
globalCompositeOperation: globalCompositeOperationType
}


  const convert3DToUV = (args:ArgsForMasking) => {
     if (!args.orignalImageMeshRef) return { u: 0, v: 0 };
 
     const mesh = args.orignalImageMeshRef;
     mesh.updateWorldMatrix(true, false);
 
     const inv = new THREE.Matrix4().copy(mesh.matrixWorld).invert();
     const local = args.point.clone().applyMatrix4(inv);
 
     const w = args.boxSize.width;
     const h = args.boxSize.height;
 
     return {
       u: (local.x + w / 2) / w,
       v: 1 - (local.y + h / 2) / h
     };
   };


export const applyMask = (args:Omit<ArgsForMasking,"point">) => {
    if (!args.texture.image || args.polygon.length === 0) return;
    const img = args.texture.image as HTMLImageElement;

    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d")!;

    ctx.drawImage(img, 0, 0);

    ctx.globalCompositeOperation = args.globalCompositeOperation;

    const pts = args.polygon.map(p => {
      const uv = convert3DToUV({...args,point:p});
      return { x: uv.u * img.width, y: uv.v * img.height };
    });

    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    pts.slice(1).forEach(pt => ctx.lineTo(pt.x, pt.y));
    ctx.closePath();
    ctx.fill();

    const masked = new THREE.CanvasTexture(canvas);
    masked.needsUpdate = true;
    return masked
  };