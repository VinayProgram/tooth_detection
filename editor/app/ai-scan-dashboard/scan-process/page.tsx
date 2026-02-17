"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Camera, RefreshCw, CheckCircle2, ChevronLeft, Stethoscope, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useScanStore } from "../store";

type ScanStep = "smile" | "upper" | "lower" | "review";

const steps: { key: "smile" | "upper" | "lower" | "review"; label: string; instruction: string }[] = [
  { key: "smile", label: "Smile Scan", instruction: "Show your teeth and smile widely for the camera." },
  { key: "upper", label: "Upper Jaw", instruction: "Tilt your head back so we can see your upper teeth clearly." },
  { key: "lower", label: "Lower Jaw", instruction: "Tilt your chin down and open slightly for the lower teeth." },
  { key: "review", label: "Review Scans", instruction: "Check your photos before submitting for AI analysis." },
];

export default function CameraScanPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const { photos, setPhoto } = useScanStore();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const currentStep = steps[currentStepIndex];

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    try {
      if (typeof navigator === "undefined" || !navigator.mediaDevices) return;
      
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } } 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setHasPermission(true);
    } catch (err) {
      console.error("Camera access error:", err);
      setHasPermission(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      if (context && currentStep.key !== "review") {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/png");
        setPhoto(currentStep.key, dataUrl);
        
        if (currentStepIndex < 2) {
          setCurrentStepIndex(prev => prev + 1);
        } else {
          setCurrentStepIndex(3);
          stopCamera();
        }
      }
    }
  };

  const goToStep = (index: number) => {
    setCurrentStepIndex(index);
    if (index < 3) {
        startCamera();
    } else {
        stopCamera();
    }
  };

  if (hasPermission === false) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 text-white p-6 text-center">
        <AlertCircle className="h-16 w-12 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Camera Access Denied</h2>
        <p className="text-zinc-400 max-w-md mb-8">
          We need access to your camera to perform the dental scan.
        </p>
        <Button onClick={() => window.location.reload()} variant="outline" className="text-white border-white/20">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-white overflow-hidden">
      <header className="p-4 flex items-center justify-between border-b border-white/10 bg-zinc-900/50 backdrop-blur-md z-10">
        <div className="flex items-center gap-2">
           <Stethoscope className="h-6 w-6 text-sky-400" />
           <span className="font-bold tracking-tight">DentalAI Scan</span>
        </div>
        <div className="flex gap-1">
          {steps.map((_, idx) => (
            <div key={idx} className={`h-1.5 w-8 rounded-full ${idx <= currentStepIndex ? "bg-sky-500" : "bg-white/10"}`} />
          ))}
        </div>
        <Link href="/ai-scan-dashboard" className="text-zinc-400 text-sm hover:text-white">Exit</Link>
      </header>

      <main className="flex-grow flex flex-col relative">
        {currentStepIndex < 3 ? (
          <div className="flex-grow relative bg-black flex items-center justify-center">
            <video ref={videoRef} autoPlay playsInline muted className="h-full w-full object-cover" style={{ transform: "scaleX(-1)" }} />
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
               <div className="w-[80%] aspect-[4/3] border-2 border-dashed border-white/30 rounded-[100px]" />
            </div>
            <div className="absolute top-8 left-0 w-full px-6 text-center">
              <div className="bg-zinc-900/80 backdrop-blur-md px-6 py-4 rounded-3xl inline-block">
                <p className="text-sky-400 text-xs font-bold uppercase tracking-widest">{currentStep.label}</p>
                <p className="text-zinc-200 mt-1">{currentStep.instruction}</p>
              </div>
            </div>
            <div className="absolute bottom-10 left-0 w-full flex items-center justify-center gap-12">
              <button 
                onClick={() => currentStepIndex > 0 && goToStep(currentStepIndex - 1)} 
                className={`h-12 w-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 transition-opacity ${currentStepIndex === 0 ? "opacity-0 pointer-events-none" : "opacity-100"}`}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button onClick={capturePhoto} className="h-20 w-20 rounded-full bg-white flex items-center justify-center active:scale-95 transition-transform shadow-2xl">
                <div className="h-16 w-16 rounded-full border-4 border-zinc-950" />
              </button>
              
              <button onClick={() => window.location.reload()} className="h-12 w-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10">
                <RefreshCw className="h-5 w-5 text-zinc-400" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-grow bg-zinc-950 p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto space-y-8 py-8">
              <h2 className="text-3xl font-bold text-center">Review Your Scans</h2>
              <div className="grid gap-6 md:grid-cols-3">
                {(["smile", "upper", "lower"] as const).map((type, idx) => (
                  <div key={type} className="space-y-2">
                    <div className="aspect-[4/3] rounded-3xl border-2 border-white/10 overflow-hidden bg-zinc-900 group relative">
                      {photos[type] && <img src={photos[type]!} className="h-full w-full object-cover" alt={type} />}
                      <button 
                        onClick={() => goToStep(idx)}
                        className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                         <RefreshCw className="h-8 w-8" />
                      </button>
                    </div>
                    <p className="font-bold text-center">{steps[idx].label}</p>
                  </div>
                ))}
              </div>
              <div className="text-center pt-8">
                <Button 
                  size="lg" 
                  className="h-16 px-12 rounded-3xl bg-sky-600 hover:bg-sky-500 text-lg font-bold"
                  onClick={() => router.push("/ai-scan-dashboard")}
                >
                  Confirm and Go Back
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
