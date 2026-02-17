"use client";

import { Button } from "@/components/ui/button";
import { ScanLine } from "lucide-react";

export function BookingCTA() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 text-primary-foreground shadow-2xl sm:px-16 md:py-24">
          <div className="absolute top-0 right-0 -z-0 h-full w-1/2 opacity-10">
             <ScanLine className="h-full w-full rotate-12 scale-150" />
          </div>
          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
              Ready to take control of your <br className="hidden sm:inline" /> dental health?
            </h2>
            <p className="mb-10 text-lg opacity-90 md:text-xl">
              Join thousands of users who have already discovered the power of AI-assisted dentistry. 
              Start your free scan now or book a session with an expert.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="secondary" className="h-14 px-10 text-lg font-bold">
                Start Free Scan
              </Button>
              <Button size="lg" className="h-14 px-10 text-lg font-bold border-2 border-primary-foreground bg-transparent hover:bg-primary-foreground hover:text-primary">
                Book Professional Consultation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
