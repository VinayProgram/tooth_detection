"use client";
import React, { useEffect, useRef } from "react";
import { getPolygonPoints, machineLearnDataType, useGetPolygonPoints } from "../(api)/learn-api";
import * as fabric from 'fabric'; // v6
import { useClipStore } from "../store/polygonStore";
const ImageEditingCanvas = ({canvasRef}:{canvasRef:React.RefObject<HTMLCanvasElement|null>}) => {
    const{data:segData}=useGetPolygonPoints()
    const [imageG,setImageG]=React.useState<fabric.FabricImage<Partial<fabric.ImageProps>, fabric.SerializedImageProps, fabric.ObjectEvents>>()
    const [fbCanvas,setFbCanvas]=React.useState<fabric.Canvas>()
    React.useEffect(()=>{
        if(segData){
            runSeg(segData)
        }
        },[segData])
    const {selClipShapes,clipShapes}=useClipStore()
    const runSeg = async (segData: machineLearnDataType) => {
        const canvasEl = canvasRef.current;
        if (!canvasEl || !segData) return console.log("failed", segData);
        const canvas = new fabric.Canvas(canvasEl, {
            width: segData.original_width,
            height: segData.original_height,
        });
        const img = await fabric.FabricImage.fromURL("/test2.jpg");
        setImageG(img)
        setFbCanvas(canvas)
        // Convert all segmentation polygons to fabric polyline objects
        const clipShapes = segData.segments.map(seg => {
            const points = seg.polygon.map(([x, y]) => ({ x, y }));
            return new fabric.Polyline(points, {
                fill: '',
                strokeWidth: 1,
                stroke: 'blue',
                objectCaching: false,
                transparentCorners: false,
                cornerColor: 'blue',
            });
        });
        selClipShapes(clipShapes)
        img.set({
            selectable: false,
            evented: false,
            hasControls: false,
            lockMovementX: true,
            lockMovementY: true,
        });
        canvas.add(img);
        clipShapes.forEach((poly) => {
            poly.on('mousedblclick', () => {
                if (true) {
                    poly.cornerStyle = 'circle';
                    poly.cornerColor = 'rgba(0,0,255,0.2)';
                    poly.hasBorders = false;
                    poly.controls = fabric.controlsUtils.createPolyControls(poly);

                } else {
                    poly.cornerColor = 'blue';
                    poly.cornerStyle = 'rect';
                    poly.hasBorders = true;
                    poly.controls = fabric.controlsUtils.createObjectDefaultControls();
                }
                poly.setCoords();
                canvas.requestRenderAll();
            });
            canvas.add(poly)
        })
        canvas.requestRenderAll();
    };

     const cutImageWithPolygon = async () => {
    if (!fbCanvas || !imageG || !clipShapes) return;

    // For each polygon, create a new clipped image
    clipShapes.forEach(async (poly) => {
        // Clone the original image
        const clonedImg=imageG.cloneAsImage({})
            // Convert polyline → polygon
            const clipPolygon = new fabric.Polygon(
                poly.points!.map(p => ({ x: p.x, y: p.y })),
                {
                    absolutePositioned: true
                }
            );

            // Apply clipPath to clone
            clonedImg.set({
                clipPath: clipPolygon,
                selectable: true,
                hasControls: false,
                evented: false,
            });

            // Add clipped image to canvas
            fbCanvas.add(clonedImg);
            fbCanvas.requestRenderAll();

            // (Optional) Export clipped region:
            // const imgUrl = clonedImg.toDataURL({ format: "png" });
            // console.log("Cut image:", imgUrl);
    });
};


    return <>
    <button className="bg-amber-50 text-stone-600 absolute top-0" onClick={cutImageWithPolygon}>Submit</button>
    </>;
};

export default ImageEditingCanvas;
