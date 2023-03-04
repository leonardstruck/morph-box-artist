import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Store {
    apiKey?: string;
    setApiKey: (apiKey: string) => void;
}

const useStore = create(
    persist<Store>(
        (set, get) => ({
            apiKey: undefined,
            setApiKey: (apiKey: string) => set({ apiKey })
        }),
        {
            name: "store",
        }
    )
);

export default useStore;