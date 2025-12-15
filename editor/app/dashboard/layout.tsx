'use client'

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/providers/query-client-provider";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
    <SidebarProvider>
      <main style={{height:"100vh",width:"100vw"}}>
        {children}
      </main>
    </SidebarProvider>
    </QueryClientProvider>
  )
}