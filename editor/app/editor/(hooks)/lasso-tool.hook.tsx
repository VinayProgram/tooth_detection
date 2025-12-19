import { useClipStore } from "@/app/store/clip-store";
import React, { RefObject } from "react";
import { processDestinationIn, processDestinationOut } from "../utils/masking";
import * as THREE from 'three'
export const useProcessMasks = () => {
    const { points3D, orignalImageMeshRef, boxSize, imageTexture,onMask } = useClipStore()
    return React.useCallback((action: GlobalCompositeOperation) => {
        return actionFunction(action)({
            points3D,
            boxSize,
            onMask: { action: action },
            texture: imageTexture!,
            originalMesh: orignalImageMeshRef!,
        });
    }, [onMask.newTime,onMask.action]);
}




export const useIntializeImage = (imageTexture: THREE.Texture<unknown>, orignalImageMeshRef: THREE.Mesh) => {
    const { setBoxSize, setImageTexture, setOrignalImageMeshRef } = useClipStore()

    React.useEffect(() => {
        if (!imageTexture.image) return;
        const img = imageTexture.image as HTMLImageElement;
        const w = img.width;
        const h = img.height;
        const HEIGHT = 10;
        const WIDTH = (w / h) * HEIGHT;
        setBoxSize([WIDTH, HEIGHT, 0.1]);
        setImageTexture(imageTexture)
        orignalImageMeshRef && setOrignalImageMeshRef(orignalImageMeshRef)
    }, [imageTexture, orignalImageMeshRef]);
}


const actionFunction = (action: GlobalCompositeOperation) => {
    console.log(action)
    switch (action) {
        case "destination-in":
            return processDestinationIn
        case "destination-out":
            return processDestinationOut
        default:
            return processDestinationIn;
    }
}