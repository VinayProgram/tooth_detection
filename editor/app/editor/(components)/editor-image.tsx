'use client'
import { Box, Line, Mask, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { poly } from "./seg";
import { useClipStore } from "@/app/store/clip-store";
import { applyMask, processMasks } from "../utils/masking";
import { useSearchParams } from "next/navigation";

const EditorImage = () => {
  const params = useSearchParams()
  const fileName = params.get('file')
  const { onMask, setPoints3D, points3D, orignalImageTexture, setOringalImageTexture } = useClipStore()
  const orignalImageMeshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(`http://localhost:7541/static/${fileName}`);
  const [boxSize, setBoxSize] = useState<[number, number, number]>([1, 1, 0]);
  const [activeKey, setActiveKey] = useState<string>( "poly_" + Date.now());
  const [maskedTexture, setMaskedTexture] = useState<THREE.Texture[] | null>([]);

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
    setOringalImageTexture(texture)
  }, [texture]);


  const handleAddPoint = (e: any) => {
    const clone = e.point.clone();
    setPoints3D({
      ...points3D,
      [activeKey]: [...(points3D[activeKey] || []), clone]
    });
  };

  const handleNewPolygon = () => {
    const key = "poly_" + Date.now();
    setPoints3D({ ...points3D, [key]: [] });
    setActiveKey(key);
  };



  useEffect(() => {
    if (!onMask || !points3D || !orignalImageMeshRef.current) return;

    const { masks, excludedTexture } = processMasks({
      points3D,
      boxSize,
      onMask,
      texture,
      originalMesh: orignalImageMeshRef.current,
    });

    if (onMask.action === "destination-out") {
      setOringalImageTexture(excludedTexture as any);
    } else {
      setMaskedTexture(masks);
    }
  }, [onMask]);



  return (
    <>
      {maskedTexture?.length == 0 &&
        <Box
          args={boxSize}
          ref={orignalImageMeshRef}
          position={[0, 0, 0]}
          onClick={handleAddPoint}
          onDoubleClick={handleNewPolygon}
        >
          <meshBasicMaterial
            map={orignalImageTexture ?? texture}
            transparent
          />
        </Box>
      }

      {/* Draw polygons */}
      {points3D && Object.keys(points3D).map(key => {
        const pts = points3D[key];
        console.log('====', pts)
        if (pts.length < 2) return
        return (
          <Line
            points={pts}
            color={"yellow"}
            lineWidth={10}
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

      {
        maskedTexture?.map((x) => {
          return (
            <Box
              args={boxSize}
              position={[0, 0, 0]}
            >
              <meshBasicMaterial
                map={x}
                transparent
              />
            </Box>
          )
        })
      }
    </>
  );
};

export default EditorImage;
