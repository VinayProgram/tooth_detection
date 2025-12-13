'use client'

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./(components)/app-sidebar"
import MenuActions from "./(components)/menu-actions"
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/providers/query-client-provider";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
    <SidebarProvider>
      <AppSidebar />
      <main style={{height:"100vh",width:"100vw"}}>
        <MenuActions/>
        {children}
      </main>
    </SidebarProvider>
    </QueryClientProvider>
  )
}