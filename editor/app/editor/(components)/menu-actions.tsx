'use client'
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useGetPolygonPoints } from "../(api)/learn-api"
import React from "react"
import * as THREE from 'three'
import { useClipStore } from "@/app/store/clip-store"
import { useSearchParams } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarShortcut, MenubarTrigger } from "@/components/ui/menubar"
const MenuActions = () => {
    const params = useSearchParams()
    const fileName = params.get('file')
    const { data: points } = useGetPolygonPoints(fileName ?? "")
    const { setPoints3D, points3D } = useClipStore()
    const data = React.useMemo(() => {
        return points?.segments.map(segments => {
            return segments.polygon.map((x) => {
                return {
                    x: x[0],
                    y: x[1],
                    z: 0
                }
            })
        })
    }, [points])

    const setPoints = () => {
        if (!data) return alert('no data points')
        const w = Number(points?.original_width);
        const h = Number(points?.original_height);

        const HEIGHT = 10;
        const WIDTH = (w / h) * HEIGHT;

        if (!data || !w || !h) return;

        const obj: Record<string, THREE.Vector3[]> = {};

        data.forEach((polygon, polyIndex) => {
            const worldPts = polygon.map((point) => {
                const x = (point.x / w) * WIDTH - WIDTH / 2;
                const y = -(point.y / h) * HEIGHT + HEIGHT / 2;
                return new THREE.Vector3(x, y, 0.05);
            });

            obj[`poly_${polyIndex}`] = worldPts;
        });

        setPoints3D(obj);
    };

    return (

        <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
            <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                <SidebarTrigger className="-ml-1" />
                <Separator
                    orientation="vertical"
                    className="mx-2 data-[orientation=vertical]:h-4"
                />
                <h1 className="text-base font-medium">Photo Editor</h1>

                <Menubar>
                    <MenubarMenu>
                        <MenubarTrigger>Actions</MenubarTrigger>
                        <MenubarContent>
                            <MenubarItem onClick={()=>setPoints()}>
                                Ai Segment <MenubarShortcut>⌘T</MenubarShortcut>
                            </MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>

                </Menubar>

                <div className="ml-auto flex items-center gap-2">
                    <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
                        Panel
                    </Button>
                </div>
            </div>
        </header>
    )
}

export default MenuActions
