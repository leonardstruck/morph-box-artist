import useStore from "../store";
import { TrashIcon } from "@heroicons/react/24/solid";
import type { Characteristic as CharacteristicT } from "../store";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const Combinations = () => {
    const { combinations, removeCombination } = useStore();
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
                    <div key={combination.id} className="flex">
                        <div className="flex flex-wrap items-center gap-2 w-full">
                            {
                                combination.characteristics.map((characteristic, index) => {
                                    return (
                                        <Characteristic key={characteristic.id} characteristic={characteristic} />
                                    )
                                })
                            }
                        </div>
                        <TrashIcon className="w-4 cursor-pointer text-white" onClick={() => removeCombination(combination.id)} />
                    </div>
                )
            })}
        </div>
    );
}

const Characteristic = ({ characteristic }: { characteristic: CharacteristicT }) => {
    return (
        <div className="flex items-center gap-2 text-white border p-2 rounded">
            <div className="text-sm">{characteristic.name}</div>
        </div>
    )
}

export default Combinations;