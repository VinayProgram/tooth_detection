import React from 'react'
import * as fabric from 'fabric'
const PolyProcessEditing = () => {
   const polygonToSmoothPath = (points: { x: number; y: number }[]) => {
          if (points.length < 2) return "";
  
          let path = `M ${points[0].x} ${points[0].y}`;
  
          for (let i = 1; i < points.length - 1; i++) {
              const midX = (points[i].x + points[i + 1].x) / 3;
              const midY = (points[i].y + points[i + 1].y) / 2;
  
              path += ` Q ${points[i].x} ${points[i].y} ${midX} ${midY}`;
          }
  
          // Close final curve
          const last = points[points.length - 1];
          const first = points[0];
          path += ` Q ${last.x} ${last.y} ${first.x} ${first.y} Z`;
  
          return path;
      };
  
      const cutImageWithPolygon = (canvas: fabric.Canvas, img: fabric.FabricImage, polygon: fabric.Polyline) => {
          // Clone the image so original stays untouched
          const clipPolygon = new fabric.Polygon(
              polygon.points!.map(p => ({ x: p.x, y: p.y })),
          );
  
          // Apply clipping
          img.set({
              clipPath: clipPolygon,
              selectable: true,
              evented: true,
          });
  
          canvas.add(img);
          canvas.requestRenderAll();
          return img
      };
  return (
    <div>
      
    </div>
  )
}

export default PolyProcessEditing
