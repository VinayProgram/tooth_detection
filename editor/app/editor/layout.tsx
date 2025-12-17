'use client'

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { AppSidebar } from "./(components)/app-sidebar"
import { LeftSidebar } from "./(components)/left-sidebar"
import MenuActions from "./(components)/menu-actions"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/providers/query-client-provider"
import { Menubar } from "@/components/ui/menubar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
     <SidebarProvider
      defaultOpen={false}
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
        } as React.CSSProperties
      }
    >
      <AppSidebar  />
      <SidebarInset>
        <MenuActions />
        <div className="flex flex-1 flex-col">{children}</div>
      </SidebarInset>
      <LeftSidebar/>
    </SidebarProvider>
    </QueryClientProvider>
  )
}
