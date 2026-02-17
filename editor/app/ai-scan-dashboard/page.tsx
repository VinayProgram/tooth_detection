"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Camera, Upload, CheckCircle2, Loader2, Info } from "lucide-react";
import { useScanStore } from "./store";

export default function AIScanPage() {
  const router = useRouter();
  const { photos, resetPhotos } = useScanStore();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      router.push("/signin");
    }
  }, [router]);

  const handleCaptureClick = () => {
    router.push("/ai-scan-dashboard/scan-process");
  };

  const handleSubmit = () => {
    if (!photos.smile || !photos.upper || !photos.lower) {
      alert("Please capture all three photos before submitting.");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      resetPhotos();
    }, 2500);
  };

  if (submitted) {
    return (
      <div className="flex min-h-screen flex-col bg-white">
        <Navbar />
        <main className="flex flex-grow items-center justify-center px-4 pt-24 pb-12">
          <div className="max-w-md w-full text-center space-y-6 animate-in fade-in zoom-in duration-500">
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-zinc-900">Scan Submitted!</h1>
            <p className="text-zinc-600">
              Our AI is currently analyzing your photos. You will receive a detailed report in your dashboard within 5 minutes.
            </p>
            <Button onClick={() => router.push("/")} className="w-full h-12 text-lg">
              Return Home
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50/50">
      <Navbar />
      <main className="flex-grow pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900">AI Oral Health Scan</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              For an accurate analysis, please provide three clear photos of your teeth using the camera tool.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {(["smile", "upper", "lower"] as const).map((type) => (
              <Card key={type} className={`border-2 transition-all duration-300 ${photos[type] ? "border-green-500 bg-green-50/30" : "border-zinc-200"}`}>
                <CardHeader>
                  <CardTitle className="capitalize text-xl flex items-center gap-2">
                    {type === "smile" && "Smile Photo"}
                    {type === "upper" && "Upper Jaw"}
                    {type === "lower" && "Lower Jaw"}
                    {photos[type] && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4 py-6">
                  <div className={`aspect-video w-full rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-colors ${photos[type] ? "bg-white overflow-hidden border-green-200" : "bg-zinc-100/50 border-zinc-200"}`}>
                    {photos[type] ? (
                       <img src={photos[type]!} className="w-full h-full object-cover" alt={type} />
                    ) : (
                      <>
                        <Camera className="h-10 w-10 text-muted-foreground opacity-50" />
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">No Photo Yet</span>
                      </>
                    )}
                  </div>
                  <Button className="w-full h-11 text-xs gap-2" onClick={handleCaptureClick}>
                    <Camera className="h-4 w-4" />
                    {photos[type] ? "Retake Photo" : "Capture Photo"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 bg-white p-8 rounded-3xl shadow-lg border border-zinc-200">
             <div className="flex items-start gap-4 mb-8 p-4 bg-sky-50 rounded-2xl text-sky-900 border border-sky-100">
                <Info className="h-6 w-6 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-bold mb-1">Getting the best results:</p>
                  <p className="opacity-90">Open the camera tool and follow the step-by-step guidance for each scan type.</p>
                </div>
             </div>
             
             <Button 
                onClick={handleSubmit}
                disabled={submitting} 
                className="w-full h-14 text-xl font-bold rounded-2xl shadow-xl shadow-primary/20"
             >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                    Analyzing Photos...
                  </>
                ) : (
                  "Submit Complete Scan"
                )}
             </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
