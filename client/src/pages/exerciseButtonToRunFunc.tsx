import React, {useMemo, useState} from "react";
import {COLORS} from "../const/colors.ts";
import clsx from "clsx";

interface ButtonToCallInputFunction {
    title: string;
    // eslint-disable-next-line @typescript-eslint/ban-types
    inputFunctions: Function[];
}

interface Car {
    position: number;
    speed: number;
}

interface Student {
    name: string;
    grades: Record<string, number>; // subject -> grade
}

const aliceStudent: Student = {name: "Alice", grades: {"Math": 90, "Science": 80, "History": 70}};
const bobStudent: Student = {name: "Bob", grades: {"Math": 100, "Science": 100, "History": 100}};
const charlieStudent: Student = {name: "Charlie", grades: {"Math": 50, "Science": 60, "History": 70}};
const davidStudent: Student = {name: "David", grades: {"Math": 70, "Science": 80, "History": 90}};
const eveStudent: Student = {name: "Eve", grades: {"Math": 80, "Science": 70, "History": 60}};

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

function ex7_runCar(): React.ReactNode {
    const output: string[] = [];
    const car: Car = {position: 0, speed: 0};
    output.push(`1. Car position: ${car.position}, speed: ${car.speed}`);

    car.speed = 10;
    car.position += car.speed;
    output.push(`Set speed to 10`);
    output.push(`2. Car position: ${car.position}, speed: ${car.speed}`);

    car.position += car.speed;
    output.push(`3. Car position: ${car.position}, speed: ${car.speed}`);

    return <div>
        {output.map((line, idx) => (
            <div key={idx}>{line}</div>
        ))}
    </div>
}

function ex8_studentAverage(student: Student ): number {
    let sum = 0;
    let count = 0;
    for (const grade of Object.values(student.grades)) {
        sum += grade;
        count++;
    }
    return sum / count;
}

function ex9_studentWithBiggestGradeAverage(students: Student[]): Student | null {
    if (students.length === 0) {
        return null;
    }

    let maxAverage = ex8_studentAverage(students[0]);
    let studentWithMaxAverage = students[0];
    for (let i = 1; i < students.length; i++) {
        const average = ex8_studentAverage(students[i]);
        if (average > maxAverage) {
            maxAverage = average;
            studentWithMaxAverage = students[i];
        }
    }

    return studentWithMaxAverage;
}

function ex10_findStudentsWithGradeHigherThan(students: Student[], grade: number): Student[] {
    const studentsWithHigherGrade: Student[] = [];
    for (const student of students) {
        let hasHigherGrade = false;
        for (const studentGrade of Object.values(student.grades)) {
            if (studentGrade > grade) {
                hasHigherGrade = true;
                break;
            }
        }
        if (hasHigherGrade) {
            studentsWithHigherGrade.push(student);
        }
    }

    return studentsWithHigherGrade;
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
    {
        title: "ex7_runCar",
        inputFunctions: [
            () => ex7_runCar(),
        ],
    },
    {
        title: "ex8_studentAverage",
        inputFunctions: [
            () => ex8_studentAverage(aliceStudent),
            () => ex8_studentAverage(bobStudent),
            () => ex8_studentAverage(charlieStudent),
            () => ex8_studentAverage(davidStudent),
            () => ex8_studentAverage(eveStudent),
        ],
    },
    {
        title: "ex9_studentWithBiggestGradeAverage",
        inputFunctions: [
            () => ex9_studentWithBiggestGradeAverage([aliceStudent, bobStudent, charlieStudent, davidStudent, eveStudent]),
            () => ex9_studentWithBiggestGradeAverage([aliceStudent, charlieStudent]),
            () => ex9_studentWithBiggestGradeAverage([davidStudent]),
            () => ex9_studentWithBiggestGradeAverage([]),
        ]
    },
    {
        title: "ex10_findStudentsWithGradeHigherThan",
        inputFunctions: [
            () => ex10_findStudentsWithGradeHigherThan([aliceStudent, bobStudent, charlieStudent, davidStudent, eveStudent], 85),
        ]
    }
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
                            className={clsx("rounded mb-1 px-4 py-2 font-bold text-black hover:opacity-75",
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

function stringfyAny(value: any): any {
    try {
        if (React.isValidElement(value)) {
            return value;
        }
        if (Array.isArray(value)) {
            return `[${value.map((v: any) => stringfyAny(v)).join(", ")}]`;
        }
        if (typeof value === "boolean") {
            return value ? "true" : "false";
        }
        if (typeof value === "number") {
            return String(value);
        }
        if (typeof value === "string") {
            return value;
        }
        if (Array.isArray(value)) {
            return `[${value.join(", ")}]`;
        }
        if (typeof value === "object") {
            return JSON.stringify(value, null, 1);
        }
    } catch (err) {
        console.log("Error in stringfyAny", value, err);
        return String(value);
    }
}

function OutputResults({clickedBtn}: { clickedBtn: ButtonToCallInputFunction }) {
    const outputResults = useMemo(() => {
        return clickedBtn.inputFunctions.map((fn) => {
            return stringfyAny(fn());
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
