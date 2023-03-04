import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import clsx from "clsx";
import useStore from "../store";

export type OnboardingProps = {
    open: boolean
}

const Onboarding = ({ open }: OnboardingProps) => {
    const [key, setKey] = useState<string>("");
    const { setApiKey } = useStore();

    const { isLoading, isError, error, mutate } = useMutation<unknown, Error>({
        mutationFn: async () => {
            await fetch("https://api.openai.com/v1/models", {
                headers: {
                    Authorization: `Bearer ${key}`
                }
            }).then((res) => {
                if (res.status === 401) {
                    throw new Error("Invalid API key");
                }
            })
        },
        onSuccess: () => {
            setApiKey(key);
        }
    });

    return (
        <Transition.Root show={open} as={Fragment} appear={true}>
            <Dialog as="div" className="relative z-10" onClose={() => { }}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 backdrop-blur-3xl transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                <div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                            Welcome!
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                This app demonstrates the "Morphological Box" creativity technique.
                                                To get started, you'll need to enter your OpenAI API key.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="my-8">
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                        OpenAI API Key
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="key"
                                            id="key"
                                            className={clsx("block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6", isError && "ring-red-500")}
                                            placeholder="sk-..."
                                            aria-describedby="key-description"
                                            onChange={(e) => setKey(e.target.value)}
                                            value={key}
                                        />
                                    </div>
                                    {isError && <p className="mt-2 text-sm text-red-500" id="key-description">{error.message}</p>}
                                    <p className="mt-2 text-sm text-gray-500" id="key-description">
                                        We'll use this key to access OpenAI API. All requests are made from your browser, so your key is never sent to our servers.
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">
                                        <a href="https://openai.com/" className="text-indigo-600 hover:text-indigo-500">OpenAI</a> is a company that builds artificial general intelligence (AGI) to benefit humanity as a whole. They provide an API that allows you to access their DALL-E image generation model.
                                        OpenAI may charge you for using their API. Please see their <a href="https://beta.openai.com/pricing" className="text-indigo-600 hover:text-indigo-500">pricing page</a> for more information.
                                    </p>
                                </div>
                                <div className="mt-5 sm:mt-6">
                                    <button
                                        type="button"
                                        className={clsx("inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", isLoading && "cursor-wait opacity-50")}
                                        onClick={() => mutate()}
                                        disabled={isLoading}
                                    >
                                        Save and continue
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div >
            </Dialog >
        </Transition.Root >
    );
}

export default Onboarding