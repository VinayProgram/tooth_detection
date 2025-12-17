'use client'
import { Box, Line, Mask, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { poly } from "./seg";
import { useClipStore } from "@/app/store/clip-store";
import { useSearchParams } from "next/navigation";
import { useIntializeImage } from "../(hooks)/lasso-tool.hook";

const EditorImage = () => {
  const params = useSearchParams()
  const orignalImageMeshRef = useRef<THREE.Mesh>(null);
  const fileName = params.get('file')
  const { setPoints3D, points3D, boxSize } = useClipStore()
  const imageTexture = useTexture(`http://localhost:7541/static/${fileName}`);
  const [activeKey, setActiveKey] = useState<string>( "poly_" + Date.now());
  useIntializeImage(imageTexture,orignalImageMeshRef.current!)

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


  return (
    <>
        <Box
          args={boxSize}
          ref={orignalImageMeshRef}
          position={[0, 0, 0]}
          onClick={handleAddPoint}
          onDoubleClick={handleNewPolygon}
        >
          <meshBasicMaterial
            map={imageTexture}
            transparent
          />
        </Box>

      {points3D && Object.keys(points3D).map(key => {
        const pts = points3D[key];
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

      {/* {
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
      } */}
    </>
  );
};

export default EditorImage;
