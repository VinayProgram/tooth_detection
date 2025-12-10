"use client";
import React, { useEffect, useRef } from "react";
import { getPolygonPoints, machineLearnDataType } from "../(api)/learn-api";
import * as fabric from 'fabric'; // v6
const ImageEditingCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [segData, setSegData] = React.useState<machineLearnDataType | null>(null)
    React.useEffect(() => { gp() }, [])
    const gp = async () => {
        const data = await getPolygonPoints()
        setSegData(() => data)
        await runSeg(data)
    }

     const polygonToSmoothPath = (points: { x: number; y: number }[]) => {
        if (points.length < 2) return "";

        let path = `M ${points[0].x} ${points[0].y}`;

        for (let i = 1; i < points.length - 1; i++) {
            const midX = (points[i].x + points[i + 1].x) / 2;
            const midY = (points[i].y + points[i + 1].y) / 2;

            path += ` Q ${points[i].x} ${points[i].y} ${midX} ${midY}`;
        }

        // Close final curve
        const last = points[points.length - 1];
        const first = points[0];
        path += ` Q ${last.x} ${last.y} ${first.x} ${first.y} Z`;

        return path;
    };


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
            const pathStr = polygonToSmoothPath(points);
            return new fabric.Polyline(points, {
                fill: '',
                strokeWidth: 1,
                stroke: 'blue',
                objectCaching: false,
                transparentCorners: false,
                cornerColor: 'blue',
            });
        });

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
        // canvas.add(clipGroup)
        canvas.requestRenderAll();
    };



 

    return (
        <canvas
            ref={canvasRef}
            style={{ border: "1px solid #ccc", width: "100%", height: "auto" }}
        />
    );
};

export default ImageEditingCanvas;
