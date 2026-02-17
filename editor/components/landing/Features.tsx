"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, Calendar, ShieldCheck, Zap } from "lucide-react";

const features = [
  {
    title: "Instant AI Scan",
    description: "Get a comprehensive analysis of your oral health in less than 30 seconds using our advanced AI model.",
    icon: Zap,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    title: "Expert Recommendations",
    description: "Personalized advice on treatments, hygiene, and products tailored specifically to your dental profile.",
    icon: BrainCircuit,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    title: "Secure & Private",
    description: "Your health data is encrypted and handled with the highest standards of HIPAA-compliant security.",
    icon: ShieldCheck,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    title: "Easy Booking",
    description: "Found an issue? Instantly book an appointment with verified dentists in your local area.",
    icon: Calendar,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-zinc-50/50 dark:bg-zinc-900/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
            Everything You Need for a <span className="text-primary text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-cyan-500">Perfect Smile</span>
          </h2>
          <p className="max-w-[700px] mx-auto text-muted-foreground text-lg">
            Our AI-powered platform makes dental care accessible, instant, and incredibly easy.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className={`h-12 w-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
