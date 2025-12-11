"use client";
import React, { useEffect, useRef } from "react";
import { getPolygonPoints, machineLearnDataType, useGetPolygonPoints } from "../(api)/learn-api";
import * as fabric from 'fabric'; // v6
import { useClipStore } from "../store/polygonStore";
const ImageEditingCanvas = ({canvasRef}:{canvasRef:React.RefObject<HTMLCanvasElement|null>}) => {
    const{data:segData}=useGetPolygonPoints()

    React.useEffect(()=>{
        if(segData){runSeg(segData)}
        },[segData])

    const {selClipShapes}=useClipStore()
   

    const runSeg = async (segData: machineLearnDataType) => {
        const canvasEl = canvasRef.current;
        if (!canvasEl || !segData) return console.log("failed", segData);

        const canvas = new fabric.Canvas(canvasEl, {
            width: segData.original_width,
            height: segData.original_height,
        });
        const img = await fabric.FabricImage.fromURL("/test2.jpg");

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

    return <>Running Point Selection</>;
};

export default ImageEditingCanvas;
