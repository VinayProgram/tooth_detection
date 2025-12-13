'use client'
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { useClipStore } from "@/app/store/clip-store"



export function AppSidebar() {
  const {setOnMask}=useClipStore()
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
             
                <SidebarMenuItem >
                  <div className="flex">
                  <Button onClick={()=>setOnMask({action:"destination-in",newTime:Date.now()+""})}>Include Lasso</Button>
                  <Button onClick={()=>setOnMask({action:"destination-out",newTime:Date.now()+""})}>Exclude Lasso</Button>
                </div>
                </SidebarMenuItem>
             
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}