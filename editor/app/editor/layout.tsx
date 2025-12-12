'use client'

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./(components)/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main style={{height:"100vh",width:"100vw"}}>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}