'use client'
import { Calendar, CrossIcon, Home, Inbox, Search, Settings } from "lucide-react"

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
import React from "react"



export function LeftSidebar() {
  const { points3D } = useClipStore()
  const [hide, setHide] = React.useState<boolean>(false)
  return (
    <div className={`absolute right-25 top-5 w-50 flex flex-col gap-1 bg-amber-100 p-5 rounded-2xl ${hide && 'hidden'}`}>
      <div className="flex">Segments <CrossIcon size={10} onClick={()=>setHide(true)}></CrossIcon></div>
      {Object.keys(points3D).map((x) => {
        return (
          <Button> Segments {x} </Button>
        )
      })}
    </div>
  )
}