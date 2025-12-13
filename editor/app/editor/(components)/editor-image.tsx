'use client'
import { Box, Line, Mask, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { poly } from "./seg";
import { useClipStore } from "@/app/store/clip-store";
import { applyMask } from "../utils/masking";

const EditorImage = () => {
  const {onMask,setPoints3D,points3D,orignalImageTexture,setOringalImageTexture}=useClipStore()
  const orignalImageMeshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture("/test2.jpg");
  const [boxSize, setBoxSize] = useState<[number, number, number]>([1, 1, 0]);
  const [activeKey, setActiveKey] = useState<string>("auto");
  const [maskedTexture, setMaskedTexture] = useState<THREE.Texture[] | null>([]);

  // ---------------------------------------------------
  // INIT IMAGE SIZE + DEFAULT POLYGON
  // ---------------------------------------------------
  useEffect(() => {
    if (!texture.image) return;
     const img = texture.image as HTMLImageElement;
    const w = img.width;
    const h = img.height;
    console.log(w,h)
    const HEIGHT = 10;
    const WIDTH = (w / h) * HEIGHT;
    setBoxSize([WIDTH, HEIGHT, 0.1]);
    setActiveKey("auto");
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
    if (!onMask) return;
    if (!points3D) return;
    const masks:THREE.CanvasTexture<HTMLCanvasElement>[]=[]
    let excludedTexture:any=null
    for (const key in points3D) {
      const element = points3D[key];
      if(element.length==0)continue
      const mask=applyMask({
        boxSize:{
          height:boxSize[1],
          width:boxSize[0]
        },
        globalCompositeOperation:onMask.action,
        orignalImageMeshRef:orignalImageMeshRef.current as THREE.Mesh,
        polygon:element,
        texture: onMask.action=='destination-in'?texture:excludedTexture??texture
      });
      excludedTexture=mask
      mask&&masks.push(mask)
    }
   
    onMask.action=='destination-out'?setOringalImageTexture(excludedTexture as any):setMaskedTexture(masks)
  }, [onMask]);

  // ---------------------------------------------------
  // RENDER
  // ---------------------------------------------------
  console.dir(orignalImageTexture,{depth:100})
  console.log(maskedTexture)
  return (
    <>
      {maskedTexture?.length==0&&
      <Box
        args={boxSize}
        ref={orignalImageMeshRef}
        position={[0, 0, 0]}
        onClick={handleAddPoint}
        onDoubleClick={handleNewPolygon}
      >
        <meshBasicMaterial
          map={orignalImageTexture??texture}
          transparent
        />
      </Box>
      }

      

      


      {/* Draw polygons */}
      {Object.keys(points3D).map(key => {
        const pts = points3D[key];
        if(pts.length<2)return
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

      {
        maskedTexture?.map((x)=>{
          return(
              <Box
        args={boxSize}
        position={[0, 0, 0]}
        onClick={handleAddPoint}
        onDoubleClick={handleNewPolygon}
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
