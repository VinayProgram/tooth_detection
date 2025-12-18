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
  const img = args.texture.image as HTMLImageElement;

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
  console.warn(pts)
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  pts.slice(1).forEach(pt => ctx.lineTo(pt.x, pt.y));
  ctx.closePath();
  ctx.fill();

  const masked = new THREE.CanvasTexture(canvas);
  masked.needsUpdate = true;
  return masked
};





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

//destination-in

//destination-out

//both

