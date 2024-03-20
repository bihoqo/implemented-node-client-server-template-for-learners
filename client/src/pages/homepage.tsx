import {ExerciseInfo} from "../interfaces";
import clsx from "clsx";
import {COLORS} from "../const/colors.ts";

const EXERCISES: ExerciseInfo[] = [
    {id: 1, subject: "Counter", path: "/exercise1"},
    {id: 2, subject: "Input Text", path: "/exercise2"},
    {id: 3, subject: "Todo list", path: "/exercise3"},
    {id: 4, subject: "Statistics", path: "/exercise4"},
    {id: 5, subject: "Key value", path: "/exercise5"},
    {id: 6, subject: "Memory game", path: "/exercise6"},
    {id: 7, subject: "Register (Req-Res)", path: "/exercise7"},
    {id: 8, subject: "Logic (Req-Res)", path: "/exercise8"},
];

export default function Homepage() {
    return (
        <div className="max-w-screen-lg mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-6 text-center">
                Welcome to the Exercises Page!
            </h1>
            <h2 className="text-2xl font-semibold mb-4 text-center">
                Please Select an Exercise:
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {EXERCISES.map((exerciseInfo: ExerciseInfo, idx: number) => (
                    <ExerciseCard key={idx} exerciseInfo={exerciseInfo} index={idx}/>
                ))}
            </div>
        </div>
    );
}

function ExerciseCard({exerciseInfo, index}: { exerciseInfo: ExerciseInfo; index: number }) {
    // Define an array of colors to be used for exercise cards


    // Get the color for the current exercise based on its index
    const color = COLORS[index % COLORS.length];

    return (
        <div className={clsx("rounded-lg shadow-lg p-4", color)}>
            <h2 className="text-xl font-bold mb-2 text-center">Exercise {exerciseInfo.id}</h2>
            <h2 className="text-lg font-bold mb-2 text-center">{exerciseInfo.subject}</h2>
            <a
                href={exerciseInfo.path}
                className="block text-center text-blue-500 hover:underline"
            >
                Go to exercise
            </a>
        </div>
    );
}
