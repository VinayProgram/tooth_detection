'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { useClipStore } from "@/app/store/clip-store"
import { useProcessMasks } from "../(hooks)/lasso-tool.hook"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
  Scissors,
  Eraser,
  Layers,
} from "lucide-react"

export function AppSidebar() {
  const {
    setOnMask,
    setDestinationInCutOuts,
    setDestinationOutCutOuts,
  } = useClipStore()

  const processMasks = useProcessMasks()
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const updateRoute = (stage: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("stage", stage)
    router.push(`${pathname}?${params.toString()}`)
  }

  const handleDestinationIn = () => {
    setOnMask({ action: "destination-in", newTime: Date.now().toString() })
    const result: any = processMasks('destination-in')
    setDestinationInCutOuts(result.masks)
    updateRoute("showmasks-in")
  }

  const handleDestinationOut = () => {
    setOnMask({ action: "destination-out", newTime: Date.now().toString() })
    const result: any = processMasks('destination-out')
    setDestinationOutCutOuts(result.excludedTexture)
    updateRoute("showmasks-out")
  }

  const handleBoth = () => {
  
    setOnMask({ action: "destination-out", newTime: (Date.now() + 1).toString() })
    const outResult: any = processMasks('destination-out')
    console.log(outResult)
    // IN
    setOnMask({ action: "destination-in", newTime: Date.now().toString() })
    const inResult: any = processMasks('destination-in')
    
    setDestinationInCutOuts(inResult.masks)
    setDestinationOutCutOuts(outResult.excludedTexture)
    console.log(inResult,outResult)
    updateRoute("showmasks-both")
  }

  return (
    <Sidebar collapsible="offcanvas" variant="floating">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-semibold tracking-wide">
            Lasso Operations
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <div className="flex flex-col gap-2 p-2">
                  <Button
                    variant="default"
                    className="flex items-center gap-2 justify-start"
                    onClick={handleDestinationIn}
                  >
                    <Scissors className="w-4 h-4" />
                    Include Lasso
                  </Button>

                  <Button
                    variant="secondary"
                    className="flex items-center gap-2 justify-start"
                    onClick={handleDestinationOut}
                  >
                    <Eraser className="w-4 h-4" />
                    Exclude Lasso
                  </Button>

                  <Button
                    variant="outline"
                    className="flex items-center gap-2 justify-start"
                    onClick={handleBoth}
                  >
                    <Layers className="w-4 h-4" />
                    Include + Exclude
                  </Button>
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
