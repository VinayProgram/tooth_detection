import { create } from "zustand";

interface ScanStore {
    photos: {
        smile: string | null;
        upper: string | null;
        lower: string | null;
    };
    setPhoto: (type: "smile" | "upper" | "lower", dataUrl: string) => void;
    resetPhotos: () => void;
}

export const useScanStore = create<ScanStore>((set) => ({
    photos: {
        smile: null,
        upper: null,
        lower: null,
    },
    setPhoto: (type, dataUrl) =>
        set((state) => ({
            photos: { ...state.photos, [type]: dataUrl },
        })),
    resetPhotos: () =>
        set({
            photos: { smile: null, upper: null, lower: null },
        }),
}));
