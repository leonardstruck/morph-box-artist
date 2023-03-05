import { create } from "zustand";
import { persist } from "zustand/middleware";

import { v4 as uuid } from "uuid";


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

export type Combination = {
    id: string;
    characteristics: Characteristic[];
    generatedUrl?: string;
}

export interface Store {
    apiKey?: string;
    setApiKey: (apiKey: string) => void;

    combinationOnDisplay?: Combination;
    setCombinationOnDisplay: (combination: Combination) => void;
    removeCombinationOnDisplay: () => void;
    updateImageUrl: (combinationId: string, imageUrl: string) => void;

    parameters: Parameter[];
    setParameters: (parameters: Parameter[]) => void;
    getParameterById: (parameterId: string) => Parameter | undefined;

    characteristics: Characteristic[];
    setCharacteristics: (characteristics: Characteristic[]) => void;

    addParameter: (parameter: Parameter) => void;
    addCharacteristic: (characteristic: Characteristic) => void;

    removeParameter: (parameterId: string) => void;
    removeCharacteristic: (characteristicId: string) => void;

    getCharacteristigByParameterId: (parameterId: string) => Characteristic[];

    editMode: boolean;
    setEditMode: (editMode: boolean) => void;

    combinations: Combination[];
    addCombination: (combination: Combination) => void;
    removeCombination: (combinationId: string) => void;
    generateCombination: () => void;
}

const useStore = create(
    persist<Store>(
        (set, get) => ({
            apiKey: undefined,
            setApiKey: (apiKey: string) => set({ apiKey }),

            combinationOnDisplay: undefined,
            setCombinationOnDisplay: (combination: Combination) => set({ combinationOnDisplay: combination }),
            removeCombinationOnDisplay: () => set({ combinationOnDisplay: undefined }),
            updateImageUrl: (combinationId: string, imageUrl: string) => {
                // update image url in combination
                const combinations = get().combinations;
                // find index of combination
                const index = combinations.findIndex((combination) => combination.id === combinationId);
                if (index !== -1) {
                    // update image url
                    combinations[index].generatedUrl = imageUrl;
                    set({ combinations });
                }

                // update image url in combination on display
                const combinationOnDisplay = get().combinationOnDisplay;
                if (combinationOnDisplay?.id === combinationId) {
                    combinationOnDisplay.generatedUrl = imageUrl;
                    set({ combinationOnDisplay });
                }
            },

            parameters: [],
            setParameters: (parameters: Parameter[]) => set({ parameters }),
            getParameterById: (parameterId: string) => {
                const parameters = get().parameters;
                return parameters.find((parameter) => parameter.id === parameterId);
            },

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

            combinations: [],
            addCombination: (combination: Combination) => {
                const combinations = get().combinations;
                combinations.push(combination);
                set({ combinations });
            },

            removeCombination: (combinationId: string) => {
                const combinations = get().combinations;
                const index = combinations.findIndex((combination) => combination.id === combinationId);
                if (index !== -1) {
                    combinations.splice(index, 1);
                    set({ combinations });
                }
            },

            generateCombination: () => {
                const combinations = get().combinations;
                const parameters = get().parameters;
                const characteristics = get().characteristics;

                // get a random characteristic from each parameter
                const randomCharacteristics = parameters.map((parameter) => {
                    const parameterCharacteristics = characteristics.filter((characteristic) => characteristic.parameterId === parameter.id);
                    const randomIndex = Math.floor(Math.random() * parameterCharacteristics.length);
                    return parameterCharacteristics[randomIndex];
                });

                if (randomCharacteristics.length === 0) return;

                // generate a combination
                const combination: Combination = {
                    id: uuid(),
                    characteristics: randomCharacteristics,
                };

                // add the combination to the list
                combinations.push(combination);
                set({ combinations });
            }
        }),
        {
            name: "store",
        }
    )
);

export default useStore;