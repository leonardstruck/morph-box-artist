import clsx from "clsx";
import { useEffect, useState } from "react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid"

const Table = () => {
    return (
        <div className="text-white">
            <div className="grid grid-cols-6 gap-2">
                <Box>Parameters</Box>
                <Box colSpan={4}>Characteristics</Box>
                <AddParameter />
            </div>
        </div>
    )
}

const Box = ({ children, colSpan }: { children: React.ReactNode, colSpan?: number }) => {
    return (
        <div className={clsx(colSpan ? `col-span-${colSpan}` : "col-span-2", "h-12 border rounded flex justify-center items-center shadow-md shadow-gray-700 font-bold text-xl font-mono cursor-default")}>
            {children}
        </div>
    )
}

const AddParameter = () => {
    const [isActive, setIsActive] = useState(false);
    const [name, setName] = useState("");

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                setName("");
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
    }, []);

    if (!isActive) return (
        <div
            className="col-span-2 h-12 border rounded flex justify-center items-center shadow-md shadow-gray-700 font-bold text-sm font-mono bg-green-800 cursor-pointer"
            onClick={() => setIsActive(true)}>
            <span>+ add parameter</span>
        </div>
    );

    return (
        <div className="col-span-6 h-12 border rounded flex justify-center items-center shadow-md shadow-gray-700 font-bold text-xl font-mono pr-2">
            <input type="text" className="bg-transparent text-white w-full text-2xl border-0 focus:border-transparent focus:ring-0" value={name} onChange={(e) => setName(e.currentTarget.value)} />
            <div className="w-8 hover:text-green-600 cursor-pointer">
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