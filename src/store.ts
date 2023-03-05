import { create } from "zustand";
import { persist } from "zustand/middleware";


export type Parameter = {
    id: string;
    name: string;
    selectedCharacteristicId?: string;
}

export type Characteristic = {
    id: string;
    parameterId: string;
    name: string;
};

export interface Store {
    apiKey?: string;
    setApiKey: (apiKey: string) => void;

    parameters: Parameter[];
    setParameters: (parameters: Parameter[]) => void;

    characteristics: Characteristic[];
    setCharacteristics: (characteristics: Characteristic[]) => void;

    addParameter: (parameter: Parameter) => void;
    addCharacteristic: (characteristic: Characteristic) => void;

    removeParameter: (parameterId: string) => void;
    removeCharacteristic: (characteristicId: string) => void;

    getCharacteristigByParameterId: (parameterId: string) => Characteristic[];

    editMode: boolean;
    setEditMode: (editMode: boolean) => void;
}

const useStore = create(
    persist<Store>(
        (set, get) => ({
            apiKey: undefined,
            setApiKey: (apiKey: string) => set({ apiKey }),

            parameters: [],
            setParameters: (parameters: Parameter[]) => set({ parameters }),

            characteristics: [],
            setCharacteristics: (characteristics: Characteristic[]) => set({ characteristics }),

            addParameter: (parameter: Parameter) => {
                if (parameter.name === "" || parameter.name === undefined) return;
                const parameters = get().parameters;
                parameters.push(parameter);
                set({ parameters });
            },

            addCharacteristic: (characteristic: Characteristic) => {
                if (characteristic.name === "" || characteristic.name === undefined) return;
                const characteristics = get().characteristics;
                characteristics.push(characteristic);
                set({ characteristics });
            },

            removeParameter: (parameterId: string) => {
                const parameters = get().parameters;
                const index = parameters.findIndex((parameter) => parameter.id === parameterId);
                if (index !== -1) {
                    parameters.splice(index, 1);

                    const characteristics = get().characteristics;
                    const characteristicsToRemove = characteristics.filter((characteristic) => characteristic.parameterId === parameterId);
                    characteristicsToRemove.forEach((characteristic) => {
                        const index = characteristics.findIndex((characteristic) => characteristic.id === characteristic.id);
                        if (index !== -1) {
                            characteristics.splice(index, 1);
                        }
                    });

                    set({ parameters, characteristics });
                }
            },

            removeCharacteristic: (characteristicId: string) => {
                const characteristics = get().characteristics;
                const index = characteristics.findIndex((characteristic) => characteristic.id === characteristicId);
                if (index !== -1) {
                    characteristics.splice(index, 1);
                    set({ characteristics });
                }
            },

            getCharacteristigByParameterId: (parameterId: string) => {
                const characteristics = get().characteristics;
                return characteristics.filter((characteristic) => characteristic.parameterId === parameterId);
            },

            editMode: false,
            setEditMode: (editMode: boolean) => set({ editMode }),
        }),
        {
            name: "store",
        }
    )
);

export default useStore;