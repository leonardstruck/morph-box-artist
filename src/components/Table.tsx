import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { CheckIcon, XMarkIcon, PlusCircleIcon } from "@heroicons/react/24/solid"
import { useAutoAnimate } from "@formkit/auto-animate/react"

import useStore from "../store";

import { v4 as uuid } from "uuid";

const Table = () => {
    const { parameters } = useStore();

    const [parent] = useAutoAnimate();
    return (
        <div className="text-white">
            <div className="grid grid-cols-6 gap-2" ref={parent}>
                <Box primary>Parameters</Box>
                <Box primary colSpan={4}>Characteristics</Box>
                {parameters.map((parameter, index) => (
                    <div key={parameter.id} className="grid grid-cols-6 gap-2 col-span-6">
                        <Box>{parameter.name}</Box>
                        <Box colSpan={4}>
                        </Box>
                    </div>
                ))}
                <AddParameter />
            </div>
        </div>
    )
}

const Box = ({ children, colSpan, primary }: { children: React.ReactNode, colSpan?: 2 | 4, primary?: boolean }) => {
    return (
        <div className={clsx(colSpan == 4 && "col-span-4", colSpan == 2 || !colSpan && "col-span-2", !primary ? "bg-gray-800 text-sm" : "text-xl", "min-h-12 border rounded flex justify-center items-center shadow-md shadow-gray-700 font-bold font-mono cursor-default p-4")}>
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
            className="col-span-2 h-12 border rounded flex justify-center items-center shadow-md shadow-gray-700 font-bold text-sm font-mono bg-green-800 cursor-pointer"
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

export default Table;