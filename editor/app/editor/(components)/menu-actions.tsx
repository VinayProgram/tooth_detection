'use client'
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useGetPolygonPoints } from "../(api)/learn-api"
import React from "react"
import * as THREE from 'three'
import { useClipStore } from "@/app/store/clip-store"
const MenuActions = () => {
    const { data: points } = useGetPolygonPoints()
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
    if(!data)return alert('no data points')
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
        <div>
            <Menubar>
                <MenubarMenu>
                    <SidebarTrigger />
                    <MenubarTrigger>File</MenubarTrigger>

                    <MenubarContent>
                        <MenubarItem>
                            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem>New Window</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>Share</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem onClick={() => setPoints()}>AI Segment</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
        </div>
    )
}

export default MenuActions
