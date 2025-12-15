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



export function LeftSidebar() {
  const {points3D}=useClipStore()
  return (
    <Sidebar side={'right'} >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Left Sidebar</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
                <SidebarMenuItem >
                {Object.keys(points3D).map((x)=>{
                    return (
                        <Button> Segments {x} </Button>
                    )
                })}
                </SidebarMenuItem>
             
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}