'use client'
import { Box, Line, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { poly } from "./seg";

const Editor = ({ onMask }: { onMask?: { action: string; newTime: string } }) => {
  const imageMeshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture("/test2.jpg");

  const [boxSize, setBoxSize] = useState<[number, number, number]>([1, 1, 0]);
  const [points3D, setPoints3D] = useState<{ [key: string]: THREE.Vector3[] }>({});
  const [activeKey, setActiveKey] = useState<string>("auto");
  const [maskedTexture, setMaskedTexture] = useState<THREE.Texture | null>(null);

  // ---------------------------------------------------
  // INIT IMAGE SIZE + DEFAULT POLYGON
  // ---------------------------------------------------
  useEffect(() => {
    if (!texture.image) return;

    const img = texture.image as HTMLImageElement;
    const w = img.width;
    const h = img.height;

    const HEIGHT = 10;
    const WIDTH = (w / h) * HEIGHT;

    setBoxSize([WIDTH, HEIGHT, 0.1]);

    const worldPts = poly.map(([px, py]) => {
      const x = (px / w) * WIDTH - WIDTH / 2;
      const y = -(py / h) * HEIGHT + HEIGHT / 2;
      return new THREE.Vector3(x, y, 0.05);
    });

    setPoints3D({ auto: worldPts });
    setActiveKey("auto");
  }, [texture]);

  // ---------------------------------------------------
  // ADD POINT
  // ---------------------------------------------------
  const handleAddPoint = (e: any) => {
    const clone = e.point.clone();
    setPoints3D(prev => ({
      ...prev,
      [activeKey]: [...(prev[activeKey] || []), clone]
    }));
  };

  const handleNewPolygon = () => {
    const key = "poly_" + Date.now();
    setPoints3D(prev => ({ ...prev, [key]: [] }));
    setActiveKey(key);
  };

  // ---------------------------------------------------
  // 3D → UV Conversion (ALWAYS use original mesh)
  // ---------------------------------------------------
  const convert3DToUV = (point: THREE.Vector3) => {
    if (!imageMeshRef.current) return { u: 0, v: 0 };

    const mesh = imageMeshRef.current;
    mesh.updateWorldMatrix(true, false);

    const inv = new THREE.Matrix4().copy(mesh.matrixWorld).invert();
    const local = point.clone().applyMatrix4(inv);

    const w = boxSize[0];
    const h = boxSize[1];

    return {
      u: (local.x + w / 2) / w,
      v: 1 - (local.y + h / 2) / h
    };
  };

  // ---------------------------------------------------
  // APPLY MASK ONCE
  // ---------------------------------------------------
  const applyMask = (polygon: THREE.Vector3[]) => {
    if (!texture.image || polygon.length === 0) return;

    const img = texture.image as HTMLImageElement;

    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d")!;

    ctx.drawImage(img, 0, 0);

    ctx.globalCompositeOperation =
      onMask?.action == "include" ? "destination-in" : "destination-out";

    const pts = polygon.map(p => {
      const uv = convert3DToUV(p);
      return { x: uv.u * img.width, y: uv.v * img.height };
    });

    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    pts.slice(1).forEach(pt => ctx.lineTo(pt.x, pt.y));
    ctx.closePath();
    ctx.fill();

    const masked = new THREE.CanvasTexture(canvas);
    masked.needsUpdate = true;
    setMaskedTexture(masked);
  };

  // ---------------------------------------------------
  // TRIGGER MASKING
  // ---------------------------------------------------
  useEffect(() => {
    if (!onMask) return;
    if (!points3D[activeKey]) return;

    applyMask(points3D[activeKey]);
  }, [onMask?.action]);

  // ---------------------------------------------------
  // RENDER
  // ---------------------------------------------------
  return (
    <>
      {/* ORIGINAL OR MASKED */}
      <Box
        args={boxSize}
        ref={imageMeshRef}
        position={[0, 0, 0]}
        onClick={handleAddPoint}
        onDoubleClick={handleNewPolygon}
      >
        <meshBasicMaterial
          map={maskedTexture || texture}
          transparent
        />
      </Box>

      {/* Draw polygons */}
      {Object.keys(points3D).map(key => {
        const pts = points3D[key];
        if (pts.length < 2) return null;

        return (
          <Line
            key={key}
            points={pts}
            color={key === activeKey ? "yellow" : "blue"}
            lineWidth={3}
          />
        );
      })}

      {/* Draw points */}
      {Object.keys(points3D).map(key =>
        points3D[key].map((p, i) => (
          <mesh key={`${key}_${i}`} position={p}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshBasicMaterial
              color={key === activeKey ? "red" : "white"}
            />
          </mesh>
        ))
      )}
    </>
  );
};

export default Editor;
