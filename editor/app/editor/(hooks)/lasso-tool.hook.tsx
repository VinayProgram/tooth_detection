import { useClipStore } from "@/app/store/clip-store";
import React, { RefObject } from "react";
import { processDestinationIn, processDestinationOut } from "../utils/masking";
import * as THREE from 'three'
export const useProcessMasks = () => {
    const { onMask, points3D, orignalImageMeshRef, boxSize, imageTexture } = useClipStore()
    console.log(orignalImageMeshRef)
    return React.useCallback(() => {
        return actionFunction(onMask.action)({
            points3D,
            boxSize,
            onMask,
            texture: imageTexture!,
            originalMesh: orignalImageMeshRef!,
        });
    }, [onMask]);
}


export const useIntializeImage = (imageTexture: THREE.Texture<unknown>, orignalImageMeshRef: THREE.Mesh) => {
    const { setBoxSize, setImageTexture, setOrignalImageMeshRef } = useClipStore()

    React.useEffect(() => {
        if (!imageTexture.image) return;
        console.log('random ge',orignalImageMeshRef)
        const img = imageTexture.image as HTMLImageElement;
        const w = img.width;
        const h = img.height;
        const HEIGHT = 10;
        const WIDTH = (w / h) * HEIGHT;
        setBoxSize([WIDTH, HEIGHT, 0.1]);
        setImageTexture(imageTexture)
        orignalImageMeshRef && setOrignalImageMeshRef(orignalImageMeshRef)
    }, [imageTexture,orignalImageMeshRef]);
}


const actionFunction = (action: GlobalCompositeOperation) => {
    switch (action) {
        case "destination-in":
            return processDestinationIn
        default:
            return processDestinationIn;
    }
}