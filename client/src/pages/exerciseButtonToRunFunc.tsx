import React, {useMemo, useState} from "react";
import {COLORS} from "../const/colors.ts";
import clsx from "clsx";

interface ButtonToCallInputFunction {
    title: string;
    // eslint-disable-next-line @typescript-eslint/ban-types
    inputFunctions: Function[];
}

function ex1_sumOfList(listArr: number[]): number {
    let sum = 0;
    for (let i = 0; i < listArr.length; i++) {
        sum += listArr[i];
    }
    return sum;
}

function ex2_findLargest(listArr: number[]): number | null {
    if (listArr.length === 0) {
        return null;
    }

    let largest = listArr[0];
    for (let i = 1; i < listArr.length; i++) {
        if (listArr[i] > largest) {
            largest = listArr[i];
        }
    }
    return largest;
}

function ex3_countNumberOfInstances(listArr: number[], item: number): number {
    let count = 0;
    for (let i = 0; i < listArr.length; i++) {
        if (listArr[i] === item) {
            count++;
        }
    }
    return count;
}

function ex4_removeItemFromList(listArr: number[], item: number): string {
    const newList = [];
    for (let i = 0; i < listArr.length; i++) {
        if (listArr[i] !== item) {
            newList.push(listArr[i]);
        }
    }

    return `[${newList.join(", ")}]`; // convert array to string with brackets
}


function ex5_isListRaising(listArr: number[]): boolean {
    for (let i = 1; i < listArr.length; i++) {
        if (listArr[i] <= listArr[i - 1]) {
            return false;
        }
    }

    return true;
}

function ex6_isItemInList(listArr: number[], item: number): boolean {
    for (let i = 0; i < listArr.length; i++) {
        if (listArr[i] === item) {
            return true;
        }
    }

    return false;
}


const BUTTONS_TO_DISPLAY: ButtonToCallInputFunction[] = [
    {
        title: "ex1_sumOfList",
        inputFunctions: [
            () => ex1_sumOfList([1, 2, 3, 4, 5]),
            () => ex1_sumOfList([-6, -3, 6, 0, 2, 5, 20]),
            () => ex1_sumOfList([0, 0, 0, 2, 1, 0, 0]),
            () => ex1_sumOfList([1, -1]),
            () => ex1_sumOfList([]),
        ],
    },
    {
        title: "ex2_findLargest",
        inputFunctions: [
            () => ex2_findLargest([1, 2, 3, 4, 5]),
            () => ex2_findLargest([-6, -3, 6, 0, 2, 5, 20]),
            () => ex2_findLargest([0, 0, 0, 2, 1, 0, 0]),
            () => ex2_findLargest([1, -1]),
            () => ex2_findLargest([]),
        ],
    },
    {
        title: "ex3_countNumberOfInstances",
        inputFunctions: [
            () => ex3_countNumberOfInstances([1, 2, 3, 4, 5, 1], 1),
            () => ex3_countNumberOfInstances([-6, -3, 6, 0, 2, 3, 3], 3),
            () => ex3_countNumberOfInstances([0, 0, 0, 2, 1, 0, 0], 0),
            () => ex3_countNumberOfInstances([0, 0, 0, 2, 1, 0, 0], 1),
            () => ex3_countNumberOfInstances([0, 0, 0, 2, 1, 0, 0], 5),
            () => ex3_countNumberOfInstances([1, -1], 0),
            () => ex3_countNumberOfInstances([], 0),
        ],
    },
    {
        title: "ex4_removeItemFromList",
        inputFunctions: [
            () => ex4_removeItemFromList([1, 2, 3, 4, 5, 1], 1),
            () => ex4_removeItemFromList([-6, -3, 6, 0, 2, 3, 3], 3),
            () => ex4_removeItemFromList([0, 0, 0, 2, 1, 0, 0], 0),
            () => ex4_removeItemFromList([0, 0, 0, 2, 1, 0, 0], 1),
            () => ex4_removeItemFromList([0, 0, 0, 2, 1, 0, 0], 5),
            () => ex4_removeItemFromList([1, -1], 0),
            () => ex4_removeItemFromList([], 0),
        ],
    },
    {
        title: "ex5_isListRaising",
        inputFunctions: [
            () => ex5_isListRaising([1, 2, 3, 4, 5]),
            () => ex5_isListRaising([-6, -3, 6, 0, 2, 3, 3]),
            () => ex5_isListRaising([0, 0, 0, 2, 1, 0, 0]),
            () => ex5_isListRaising([0, 1, 4, 53]),
            () => ex5_isListRaising([1, -1]),
            () => ex5_isListRaising([]),
        ],
    },
    {
        title: "ex6_isItemInList",
        inputFunctions: [
            () => ex6_isItemInList([1, 2, 3, 4, 5], 1),
            () => ex6_isItemInList([-6, -3, 6, 0, 2, 3, 3], 3),
            () => ex6_isItemInList([0, 0, 0, 2, 1, 0, 0], 0),
            () => ex6_isItemInList([0, 0, 0, 2, 1, 0, 0], 1),
            () => ex6_isItemInList([0, 0, 0, 2, 1, 0, 0], 5),
            () => ex6_isItemInList([1, -1], 0),
            () => ex6_isItemInList([], 0),
        ],
    },
];

export default function ExerciseButtonToRunFunc() {
    const [lastClickedButton, setLastClickedButton] = useState<ButtonToCallInputFunction | undefined>(undefined);

    function buttonClickHandler(btn: ButtonToCallInputFunction) {
        setLastClickedButton(btn);
    }

    const getRandomColor = (index: number) => {
        return COLORS[index % COLORS.length];
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col space-y-4">
                <div className="flex flex-wrap space-x-4">
                    {BUTTONS_TO_DISPLAY.map((btn: ButtonToCallInputFunction, idx: number) => (
                        <button
                            key={btn.title}
                            onClick={() => buttonClickHandler(btn)}
                            className={clsx("rounded px-4 py-2 font-bold text-black hover:opacity-75",
                                getRandomColor(idx),
                                {"shadow-md border-red-700 border-solid border-2": btn.title === lastClickedButton?.title})}
                        >
                            {btn.title}
                        </button>
                    ))}
                </div>
                {lastClickedButton && (
                    <div className="mt-4">
                        <h1 className="text-3xl font-bold my-4">{lastClickedButton.title} results:</h1>
                        <OutputResults clickedBtn={lastClickedButton}/>
                    </div>)}
            </div>
        </div>
    );
}


function OutputResults({clickedBtn}: { clickedBtn: ButtonToCallInputFunction }) {
    const outputResults = useMemo(() => {
        return clickedBtn.inputFunctions.map((fn, idx) => {
            try {
                return String(fn());
            } catch (err: any) {
                return `Function ${idx} failed with error: ${err.message}`
            }
        });
    }, [clickedBtn.inputFunctions]);

    return (
        <div className="grid grid-cols-[1fr_20fr_40fr] gap-2">
            {/* Table Header */}
            <div className="bg-gray-200 py-2 text-center">Idx</div>
            <div className="bg-gray-200 py-2 text-center">Input</div>
            <div className="bg-gray-200 py-2 text-center">Output</div>

            {/* Table Rows */}
            {outputResults.map((output, idx) => (
                <React.Fragment key={idx}>
                    <div
                        className={clsx("py-2 px-4 font-medium", idx % 2 === 0 ? "bg-white" : "bg-gray-100")}>{idx}</div>
                    <div
                        className={clsx("py-2 px-4 font-medium", idx % 2 === 0 ? "bg-white" : "bg-gray-100")}>{clickedBtn.inputFunctions[idx].toString()}</div>
                    <div
                        className={clsx("py-2 px-4 font-medium", idx % 2 === 0 ? "bg-white" : "bg-gray-100")}>{output}</div>
                </React.Fragment>
            ))}
        </div>
    );
}
