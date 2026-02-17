"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScanLine, Stethoscope } from "lucide-react";

export function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Stethoscope className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight">DentalAI</span>
        </Link>
        <nav className="hidden space-x-6 md:flex">
          <Link href="#features" className="text-sm font-medium transition-colors hover:text-primary">
            Features
          </Link>
          <Link href="#ai-scan" className="text-sm font-medium transition-colors hover:text-primary">
            AI Scan
          </Link>
          <Link href="#about" className="text-sm font-medium transition-colors hover:text-primary">
            About Us
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="hidden sm:inline-flex">
            Sign In
          </Button>
          <Button className="gap-2">
            <ScanLine className="h-4 w-4" />
            Book Now
          </Button>
        </div>
      </div>
    </header>
  );
}
