import useStore from "../store";
import { TrashIcon, PhotoIcon } from "@heroicons/react/24/solid";
import type { Characteristic as CharacteristicT } from "../store";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const Combinations = () => {
    const { combinations, removeCombination, setCombinationOnDisplay } = useStore();
    const [parent] = useAutoAnimate();

    if (combinations.length == 0) {
        return <div className="text-white font-mono">
            <h1 className="text-xl">There are no combinations so far...</h1>
            You can create combinations by selecting the desired characteristics in the table or use the "Generate" button.
        </div>
    }

    return (
        <div className="space-y-2" ref={parent}>
            {combinations.map((combination, index) => {
                return (
                    <div key={combination.id} className="flex gap-2">
                        <div className="flex flex-wrap items-center gap-2 w-full">
                            {
                                combination.characteristics.map((characteristic, index) => {
                                    return (
                                        <Characteristic key={characteristic.id} characteristic={characteristic} />
                                    )
                                })
                            }
                        </div>
                        <PhotoIcon className="w-6 cursor-pointer text-white" onClick={() => setCombinationOnDisplay(combination)} />
                        <TrashIcon className="w-6 cursor-pointer text-white" onClick={() => removeCombination(combination.id)} />
                    </div>
                )
            })}
        </div>
    );
}

const Characteristic = ({ characteristic }: { characteristic: CharacteristicT }) => {
    const { getParameterById } = useStore();
    const parameter = getParameterById(characteristic.parameterId);
    return (
        <div className="flex items-center gap-2 text-white border p-2 rounded">
            <div className="text-sm"><span className="italic font-bold">{parameter?.name}:</span> {characteristic.name}</div>
        </div>
    )
}

export default Combinations;