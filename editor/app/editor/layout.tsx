'use client'

import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { AppSidebar } from "./(components)/app-sidebar"
import { LeftSidebar } from "./(components)/left-sidebar"
import MenuActions from "./(components)/menu-actions"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/providers/query-client-provider"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen w-screen">
        
        {/* LEFT SIDEBAR */}
        <SidebarProvider >
          <AppSidebar />
        </SidebarProvider>

        {/* MAIN CONTENT */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <MenuActions />
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>

        {/* RIGHT SIDEBAR */}
        <SidebarProvider>
          <LeftSidebar />
        </SidebarProvider>

      </div>
    </QueryClientProvider>
  )
}
