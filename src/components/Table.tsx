import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { CheckIcon, XMarkIcon, PlusCircleIcon } from "@heroicons/react/24/solid"
import { useAutoAnimate } from "@formkit/auto-animate/react"

import useStore, { Characteristic } from "../store";

import { v4 as uuid } from "uuid";

const Table = () => {
    const { parameters, getCharacteristigByParameterId } = useStore();

    const [parent] = useAutoAnimate();
    return (
        <div className="text-white">
            <div className="grid grid-cols-6 gap-2" ref={parent}>
                <Box primary>Parameters</Box>
                <Box primary colSpan={4}>Characteristics</Box>
                {parameters.map((parameter, index) => {
                    const characteristics = getCharacteristigByParameterId(parameter.id);
                    return (
                        <div key={parameter.id} className="grid grid-cols-6 gap-2 col-span-6">
                            <Box>{parameter.name}</Box>
                            <Box colSpan={4}>
                                <div className="flex flex-wrap items-center gap-2">
                                    {
                                        characteristics.map((characteristic, index) => {
                                            return (
                                                <Characteristic key={characteristic.id} characteristic={characteristic} />
                                            )
                                        })
                                    }
                                    <AddCharacteristic parameterId={parameter.id} />

                                </div>
                            </Box>
                        </div>
                    )
                }
                )}
                <AddParameter />
            </div>
        </div>
    )
}

const Box = ({ children, colSpan, primary }: { children: React.ReactNode, colSpan?: 2 | 4, primary?: boolean }) => {
    return (
        <div className={clsx(colSpan == 4 && "col-span-4", colSpan == 2 || !colSpan && "col-span-2", !primary ? "bg-gray-800 text-sm" : "text-xl", "min-h-12 border rounded flex items-center shadow-md shadow-gray-700 font-bold font-mono cursor-default p-4")}>
            {children}
        </div>
    )
}

const AddParameter = () => {
    const [isActive, setIsActive] = useState(false);
    const [name, setName] = useState("");

    const parameterInput = useRef<HTMLInputElement>(null);

    const { addParameter } = useStore();

    const handleAdd = () => {
        addParameter({
            name,
            id: uuid(),
        });
        setName("");
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                handleAdd();
            }
            if (e.key === "Escape") {
                setIsActive(false);
                setName("");
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        }
    }, [handleAdd, setName, setIsActive]);

    useEffect(() => {
        if (isActive) {
            parameterInput.current?.focus();
        }
    }, [isActive]);

    if (!isActive) return (
        <div
            className="col-span-2 h-12 border rounded flex justify-center items-center shadow-md shadow-gray-700 font-bold text-sm font-mono bg-emerald-900 hover:bg-green-900 cursor-pointer"
            onClick={() => setIsActive(true)}>
            <span className="flex gap-2 items-center"><div className="w-6 h-6"><PlusCircleIcon /></div>Add Parameter</span>
        </div>
    );

    return (
        <div className="col-span-2 h-12 border rounded flex justify-center items-center shadow-md shadow-gray-700 font-bold text-xl font-mono pr-2">
            <input ref={parameterInput} type="text" className="bg-transparent text-white w-full text-2xl border-0 focus:border-transparent focus:ring-0" value={name} onChange={(e) => setName(e.currentTarget.value)} />
            <div className="w-8 hover:text-green-600 cursor-pointer" onClick={() => handleAdd()}>
                <CheckIcon />
            </div>
            <div className="w-8 hover:text-red-600 cursor-pointer" onClick={() => {
                setIsActive(false);
                setName("");
            }}
            >
                <XMarkIcon />
            </div>
        </div >
    );

}

const Characteristic = ({ characteristic }: { characteristic: Characteristic }) => {
    return (
        <div className="p-2 h-12 flex items-center border rounded">
            {characteristic.name}
        </div>
    )
}

const AddCharacteristic = ({ parameterId }: { parameterId: string }) => {
    const { addCharacteristic } = useStore();
    const [isActive, setIsActive] = useState(false);
    const [name, setName] = useState("");

    const characteristicInput = useRef<HTMLInputElement>(null);

    const handleAdd = () => {
        addCharacteristic({
            name,
            id: uuid(),
            parameterId,
        });
        setName("");
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                handleAdd();
            }
            if (e.key === "Escape") {
                setIsActive(false);
                setName("");
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        }
    }, [handleAdd, setName, setIsActive]);

    if (!isActive) {
        return (
            <PlusCircleIcon className="w-6 h-6 cursor-pointer" onClick={() => setIsActive(true)} />
        )
    }

    return (
        <div className="h-12 border rounded flex justify-center items-center shadow-md shadow-gray-700 font-bold font-mono pr-2">
            <input ref={characteristicInput} type="text" className="bg-transparent text-white w-full border-0 focus:border-transparent focus:ring-0" value={name} onChange={(e) => setName(e.currentTarget.value)} />
            <div className="w-8 hover:text-green-600 cursor-pointer" onClick={() => handleAdd()}>
                <CheckIcon />
            </div>
            <div className="w-8 hover:text-red-600 cursor-pointer" onClick={() => {
                setIsActive(false);
                setName("");
            }}
            >
                <XMarkIcon />
            </div>
        </div >
    );
}

export default Table;