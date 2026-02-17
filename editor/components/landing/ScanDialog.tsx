"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScanLine, Upload, Camera, Loader2, CheckCircle2 } from "lucide-react";

export function ScanDialog() {
  const [step, setStep] = useState(1);
  const [isScanning, setIsScanning] = useState(false);

  const startScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setStep(2);
    }, 3000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" className="h-14 px-8 gap-2 text-lg">
          <ScanLine className="h-5 w-5" />
          Scan My Teeth Free
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>AI Dental Scanner</DialogTitle>
          <DialogDescription>
            {step === 1 
              ? "Upload a clear photo of your teeth for a quick AI assessment." 
              : "Scan Complete! Review your personalized recommendations."}
          </DialogDescription>
        </DialogHeader>

        {step === 1 ? (
          <div className="grid gap-6 py-8">
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/20 rounded-2xl p-12 bg-zinc-50 dark:bg-zinc-900 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer group">
              {isScanning ? (
                <div className="text-center">
                  <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto mb-4" />
                  <p className="font-medium">Analyzing oral health...</p>
                </div>
              ) : (
                <>
                  <Upload className="h-12 w-12 text-muted-foreground group-hover:text-primary transition-colors mb-4" />
                  <p className="font-medium">Click to upload or drag & drop</p>
                  <p className="text-sm text-muted-foreground mt-1">PNG, JPG up to 10MB</p>
                </>
              )}
            </div>
            <div className="flex gap-4">
              <Button variant="outline" className="flex-1 h-12 gap-2" disabled={isScanning}>
                <Camera className="h-4 w-4" />
                Use Camera
              </Button>
              <Button className="flex-1 h-12" onClick={startScan} disabled={isScanning}>
                Start Analysis
              </Button>
            </div>
          </div>
        ) : (
          <div className="py-6">
            <div className="bg-green-500/10 text-green-600 p-4 rounded-xl flex items-center gap-3 mb-6">
              <CheckCircle2 className="h-5 w-5" />
              <span className="font-medium text-sm">Analysis Successful: 98.7% Confidence</span>
            </div>
            <div className="space-y-4">
              <div className="p-4 border rounded-xl bg-background">
                <p className="font-bold text-sm mb-1 uppercase tracking-wider text-muted-foreground">General Status</p>
                <p className="text-lg">Healthy Gums, minor plaque detected on lower molars.</p>
              </div>
              <div className="p-4 border rounded-xl bg-background border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900">
                <p className="font-bold text-sm mb-1 uppercase tracking-wider text-amber-600 dark:text-amber-400">Recommendation</p>
                <p className="text-lg">Schedule a professional cleaning within the next 3 weeks.</p>
              </div>
            </div>
            <Button className="w-full h-12 mt-8" onClick={() => setStep(1)}>
              Book Appointment Now
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
