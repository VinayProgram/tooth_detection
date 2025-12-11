"use client";
import React, {
  createContext,
  useContext,
  useRef,
  ReactNode,
  RefObject,
} from "react";

interface CanvasContextType {
  canvasRef: RefObject<HTMLCanvasElement | null>;
}

const CanvasContext = createContext<CanvasContextType>({
  canvasRef: { current: null },
});

export const useCanvas = () => useContext(CanvasContext);

const CanvasProvider = ({ children }: { children: ReactNode }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  return (
    <CanvasContext.Provider value={{ canvasRef }}>
      <canvas
        ref={canvasRef}
        style={{ border: "1px solid #ccc", width: "100%", height: "auto" }}
      />
      {children}
    </CanvasContext.Provider>
  );
};

export default CanvasProvider;
