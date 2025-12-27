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
import { useSearchParams } from "next/navigation"



export function LeftSidebar() {
  const { points3D } = useClipStore()
  const [hide, setHide] = React.useState<boolean>(false)
  const query = useSearchParams()
  const action = query.get('stage')
  if (action == 'showmasks-both') return null

  return (
    <div className="absolute right-0 top-0 h-full w-64 bg-amber-50 border-l text-black flex flex-col z-30">
      <div className="px-3 py-2 font-semibold border-b">
        <CrossIcon size={10} onClick={() => setHide(true)} ></CrossIcon>
      </div>
      {Object.keys(points3D).map((x) => {
        return (
          <div
            key={x}
            className={`
                flex items-center gap-2 px-3 py-2 cursor-pointer
                ${false ? 'bg-blue-200' : 'hover:bg-amber-100'}
              `}
          >
            {/* Visibility */}
            {/* <button
              onClick={e => {
                e.stopPropagation()
                layer.visible = !layer.visible
                layer.traverse?.((obj: any) => {
                  obj.visible = layer.visible
                })
              }}
            >
              {layer.visible === false ? (
                <EyeOff size={16} />
              ) : (
                <Eye size={16} />
              )}
            </button> */}

            {/* Name */}
            <span className="flex-1 text-sm truncate">
              {x}
            </span>

            {/* Lock */}
            {/* <button
              onClick={e => {
                e.stopPropagation()
                layer.locked = !layer.locked
              }}
            >
              {layer.locked ? (
                <Lock size={14} />
              ) : (
                <Unlock size={14} />
              )}
            </button> */}
          </div>
        )
      })}
    </div>
  )
}