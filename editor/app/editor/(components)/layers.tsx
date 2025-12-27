'use client'

import React, { useMemo, useState } from 'react'
import { Eye, EyeOff, Lock, Unlock, Plus, Trash2 } from 'lucide-react'
import { useClipStore } from '@/app/store/clip-store'
import * as THREE from 'three'
import { useSearchParams } from 'next/navigation'
const Layers = () => {
    const {
        destinationInCutOuts = [],
        destinationOutCutOuts = [],
        activeObject, setActiveObject
    } = useClipStore()

    /** ✅ Correct merge */
    const layers = useMemo(
        () => [...destinationInCutOuts, destinationOutCutOuts],
        [destinationInCutOuts, destinationOutCutOuts]
    )
 
    return (
        <div className="absolute right-0 top-0 h-full w-64 bg-amber-50 border-l text-black flex flex-col z-30">

            {/* Header */}
            <div className="px-3 py-2 font-semibold border-b">
                Layers
            </div>

            {/* Layer List */}
            <div className="flex-1 overflow-y-auto">
                {layers.length >= 1 && layers.map((layer: any) => {
                    if (!layer) return null
                    const isActive = activeObject === layer.uuid

                    return (
                        <div
                            key={layer.uuid}
                            onClick={() => setActiveObject(layer.uuid)}
                            className={`
                flex items-center gap-2 px-3 py-2 cursor-pointer
                ${isActive ? 'bg-blue-200' : 'hover:bg-amber-100'}
              `}
                        >
                            {/* Visibility */}
                            <button
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
                            </button>

                            {/* Name */}
                            <span className="flex-1 text-sm truncate">
                                {layer.name || layer.uuid}
                            </span>

                            {/* Lock */}
                            <button
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
                            </button>
                        </div>
                    )
                })}
            </div>

            {/* Footer */}
            <div className="flex border-t">
                <button className="flex-1 p-2 hover:bg-amber-100 flex justify-center">
                    <Plus size={18} />
                </button>
                <button className="flex-1 p-2 hover:bg-amber-100 flex justify-center">
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    )
}

export default Layers
