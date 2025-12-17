'use client'

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
import { usePathname, useRouter, useSearchParams } from "next/navigation"




export function AppSidebar() {
  const { setOnMask,setDestinationInCutOuts } = useClipStore()
  const actionFn = useProcessMasks()
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const callAction = (action: GlobalCompositeOperation) => {
    setOnMask({ action: action, newTime: Date.now() + "" })
    const {masks}=actionFn()
    const params = new URLSearchParams(searchParams.toString())

    if (action == 'destination-in') {
      params.set('stage', 'showmasks')
      setDestinationInCutOuts(masks)
      router.push(pathname + '?' + params.toString())
      
    } 
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
                  <Button onClick={() => { callAction('destination-in') }}>Include Lasso</Button>
                  <Button onClick={() => { callAction('destination-out') }}>Exclude Lasso</Button>
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}