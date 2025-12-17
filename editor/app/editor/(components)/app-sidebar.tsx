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
import { useProcessMasks } from "../(hooks)/lasso-tool.hook"



export function AppSidebar() {
  const {setOnMask}=useClipStore()
  const actionFn=useProcessMasks()

  const callAction=(action:GlobalCompositeOperation)=>{
    setOnMask({action:action,newTime:Date.now()+""})
    actionFn()
  }
  return (
    <Sidebar collapsible="offcanvas" variant="floating" >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
                <SidebarMenuItem >
                  <div className="flex">
                  <Button onClick={()=>{callAction('destination-in')}}>Include Lasso</Button>
                  <Button onClick={()=>{callAction('destination-out')}}>Exclude Lasso</Button>
                </div>
                </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}