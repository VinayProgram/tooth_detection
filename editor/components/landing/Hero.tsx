"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, ScanLine } from "lucide-react";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] bg-sky-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 -z-10 h-[300px] w-[300px] bg-cyan-500/10 blur-[100px] rounded-full" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col items-start gap-6">
            <Badge variant="secondary" className="px-3 py-1 text-sm font-medium">
              <Star className="mr-2 h-3 w-3 fill-sky-500 text-sky-500" />
              Revolutionizing Oral Health with AI
            </Badge>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Get Your <span className="text-primary italic">Dental Scan</span> in Seconds
            </h1>
            <p className="max-w-[600px] text-lg text-muted-foreground md:text-xl">
              Upload a photo or use your camera for an instant AI-powered dental checkup. 
              Get professional recommendations and book appointments with top-rated dentists.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" className="h-14 px-8 gap-2 text-lg">
                <Link href="/ai-scan-dashboard">
                  <ScanLine className="h-5 w-5" />
                  Scan My Teeth Free
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 px-8 gap-2 text-lg">
                <Link href="/bookappoinment">
                  Book Appointment
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-zinc-200" />
                ))}
              </div>
              <p>Trusted by 10,000+ users worldwide</p>
            </div>
          </div>
          <div className="relative aspect-square lg:aspect-auto lg:h-[600px]">
            <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/20 to-cyan-500/20 rounded-3xl animate-pulse" />
            <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/20 shadow-2xl backdrop-blur-3xl">
              {/* Replace with actual image later */}
              <div className="flex h-full w-full items-center justify-center bg-zinc-900/10">
                <div className="text-center p-8">
                  <ScanLine className="mx-auto h-24 w-24 text-primary opacity-20 mb-4" />
                  <p className="text-muted-foreground font-medium">AI Dental Scan Simulation</p>
                  <div className="mt-6 flex justify-center gap-2">
                     <div className="h-4 w-48 bg-primary/20 rounded-full overflow-hidden">
                        <div className="h-full w-2/3 bg-primary animate-[shimmer_2s_infinite]" />
                     </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 rounded-2xl bg-background p-4 shadow-xl border border-border sm:p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-green-500 animate-ping" />
                </div>
                <div>
                  <p className="text-sm font-bold">98.5% Accuracy</p>
                  <p className="text-xs text-muted-foreground">Certified AI Model</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
