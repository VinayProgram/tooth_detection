"use client";
import React, { useRef, useEffect } from "react";

export default function MarkPolygon() {
  const canvasRef = useRef(null);

  // your polygon
  const polygon = [
    [572.0, 324.0], [572.0, 370.0], [578.0, 370.0], [592.0, 384.0],
    [594.0, 384.0], [598.0, 388.0], [598.0, 394.0], [610.0, 394.0],
    [610.0, 388.0], [612.0, 386.0], [612.0, 384.0], [616.0, 380.0],
    [616.0, 378.0], [620.0, 374.0], [626.0, 374.0], [626.0, 348.0],
    [620.0, 348.0], [616.0, 344.0], [616.0, 340.0], [614.0, 338.0],
    [612.0, 338.0], [610.0, 336.0], [608.0, 336.0], [602.0, 330.0],
    [602.0, 324.0],
  ];

  // load image + draw + draw polygon
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.src = "/test2.jpg"; // 🔥 change to your image path

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // draw polygon
      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;

      ctx.beginPath();
      polygon.forEach(([x, y], i) => {
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.stroke();

      // draw points
      ctx.fillStyle = "yellow";
      polygon.forEach(([x, y]) => {
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      });
    };
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} style={{ maxWidth: "100%", border: "1px solid #aaa" }} />
    </div>
  );
}
