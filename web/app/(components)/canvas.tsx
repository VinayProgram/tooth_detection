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
            opacity:1,
            stroke: "red",
            strokeWidth: 2,
            objectCaching: false,
            absolutePositioned: true
        });
    });

    // Combine all polygons into a Group
    const clipGroup = new fabric.Group(clipShapes, {
        absolutePositioned: true
    });
    canvas.add(img);
    
    canvas.add(clipGroup)
    canvas.requestRenderAll();
};



    const drawPolygons = (ctx: CanvasRenderingContext2D) => {
        if (!segData) return null
        ctx.lineWidth = 1;
        ctx.strokeStyle = "red";
        ctx.fillStyle = "yellow";

        segData.segments.forEach((segment) => {
            const polygon = segment.polygon;

            // Draw lines
            ctx.beginPath();
            polygon.forEach(([x, y], index) => {
                if (index === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            });
            ctx.closePath();
            ctx.stroke();

            // Draw points
            polygon.forEach(([x, y]) => {
                ctx.beginPath();
                ctx.arc(x, y, 1, 0, Math.PI * 2);
                ctx.fill();
            });
        });
    };

    return (
        <canvas
            ref={canvasRef}
            style={{ border: "1px solid #ccc", width: "100%", height: "auto" }}
        />
    );
};

export default ImageEditingCanvas;
