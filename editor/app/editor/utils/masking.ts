import * as THREE from 'three'

interface ArgsForMasking {
  orignalImageMeshRef: THREE.Mesh,
  point: THREE.Vector3,
  boxSize: {
    height: number,
    width: number
  },
  texture: THREE.Texture<unknown>,
  polygon: THREE.Vector3[],
  globalCompositeOperation: GlobalCompositeOperation
}


const convert3DToUV = (args: ArgsForMasking) => {
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


export const applyMask = (args: Omit<ArgsForMasking, "point">) => {
  if (!args.texture.image || args.polygon.length === 0) return;
  const baseTexture = args.texture 

  const img = baseTexture.image as HTMLImageElement;

  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0);

  ctx.globalCompositeOperation = args.globalCompositeOperation;

  const pts = args.polygon.map(p => {
    const uv = convert3DToUV({ ...args, point: p });
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

// export const applyMaskDestintionIn = (args: Omit<ArgsForMasking, "point">) => {
//   if (!args.texture.image || args.polygon.length === 0) return;

//   const img = args.texture.image as HTMLImageElement;

//   /* ---------------------------
//      1. Draw original image
//   ----------------------------*/
//   const fullCanvas = document.createElement("canvas");
//   fullCanvas.width = img.width;
//   fullCanvas.height = img.height;

//   const fullCtx = fullCanvas.getContext("2d")!;
//   fullCtx.drawImage(img, 0, 0);

//   /* ---------------------------
//      2. Convert polygon → image space
//   ----------------------------*/
//   const pts = args.polygon.map(p => {
//     const uv = convert3DToUV({ ...args, point: p });
//     return {
//       x: uv.u * img.width,
//       y: uv.v * img.height,
//     };
//   });

//   /* ---------------------------
//      3. Apply mask
//   ----------------------------*/
//   fullCtx.globalCompositeOperation = args.globalCompositeOperation;
//   fullCtx.beginPath();
//   fullCtx.moveTo(pts[0].x, pts[0].y);
//   pts.slice(1).forEach(pt => fullCtx.lineTo(pt.x, pt.y));
//   fullCtx.closePath();
//   fullCtx.fill();

//   /* ---------------------------
//      4. Compute bounding box
//   ----------------------------*/
//   let xmin = Infinity,
//       ymin = Infinity,
//       xmax = -Infinity,
//       ymax = -Infinity;

//   for (const p of pts) {
//     xmin = Math.min(xmin, p.x);
//     ymin = Math.min(ymin, p.y);
//     xmax = Math.max(xmax, p.x);
//     ymax = Math.max(ymax, p.y);
//   }

//   const width = Math.ceil(xmax - xmin);
//   const height = Math.ceil(ymax - ymin);

//   if (width <= 0 || height <= 0) return;

//   /* ---------------------------
//      5. Crop canvas
//   ----------------------------*/
//   const cropCanvas = document.createElement("canvas");
//   cropCanvas.width = width;
//   cropCanvas.height = height;

//   const cropCtx = cropCanvas.getContext("2d")!;
//   cropCtx.drawImage(
//     fullCanvas,
//     xmin, ymin, width, height,   // source
//     0, 0, width, height           // destination
//   );

//   /* ---------------------------
//      6. Create texture
//   ----------------------------*/
//   const croppedTexture = new THREE.CanvasTexture(cropCanvas);
//   croppedTexture.needsUpdate = true;

//   /* ---------------------------
//      7. Store metadata (IMPORTANT)
//   ----------------------------*/
//   croppedTexture.userData = {
//     bbox: { xmin, ymin, width, height },
//     originalWidth: img.width,
//     originalHeight: img.height,
//   };

//   return croppedTexture;
// };



type MaskProcessorParams = {
  points3D: Record<string, any[]>;
  boxSize: [number, number,number];
  onMask: {
    action: GlobalCompositeOperation;
  };
  texture: THREE.Texture;
  originalMesh: THREE.Mesh;
};

type MaskProcessorResult = {
  masks: THREE.CanvasTexture<HTMLCanvasElement>[];
  excludedTexture: THREE.CanvasTexture<HTMLCanvasElement> | null;
};

export function processDestinationIn({
  points3D,
  boxSize,
  onMask,
  texture,
  originalMesh,
}: MaskProcessorParams):Omit<MaskProcessorResult,'excludedTexture'> {
  const masks: THREE.CanvasTexture<HTMLCanvasElement>[] = [];
  for (const key in points3D) {
    const polygon = points3D[key];
    if (!polygon?.length) continue;

    const mask = applyMask({
      boxSize: {
        height: boxSize[1],
        width: boxSize[0],
      },
      globalCompositeOperation: onMask.action ,
      orignalImageMeshRef: originalMesh,
      polygon,
      texture:texture
    });
    if (!mask) continue;
    masks.push(mask);
  }

  return { masks };
}

export function processDestinationOut({
  points3D,
  boxSize,
  onMask,
  texture,
  originalMesh,
}: MaskProcessorParams):Omit<MaskProcessorResult,'masks'> {
  const masks: THREE.CanvasTexture<HTMLCanvasElement>[] = [];
  let excludedTexture: THREE.CanvasTexture<HTMLCanvasElement> | null = null;
  for (const key in points3D) {
    const polygon = points3D[key];
    if (!polygon?.length) continue;

    const mask = applyMask({
      boxSize: {
        height: boxSize[1],
        width: boxSize[0],
      },
      globalCompositeOperation: onMask.action ,
      orignalImageMeshRef: originalMesh,
      polygon,
      texture: excludedTexture ?? texture
    });

    if (!mask) continue;

    excludedTexture = mask;
    masks.push(mask);
  }

  return { excludedTexture };
}


