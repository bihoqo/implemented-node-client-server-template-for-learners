import {ExerciseInfo} from "../interfaces";
import clsx from "clsx";
import {COLORS} from "../const/colors.ts";

const EXERCISES: ExerciseInfo[] = [
    {id: 1, subject: "Counter", path: "/exerciseCounterPage"},
    {id: 2, subject: "Button color changes", path: "/exerciseButtonColorPage"},
    {id: 2, subject: "Layout", path: "/exerciseLayoutPage"},
    {id: 4, subject: "Options", path: "/exerciseOptionsPage"},
    {id: 5, subject: "Input Text", path: "/exerciseInputTextPage"},
    {id: 6, subject: "Todo list", path: "/exerciseTodoListPage"},
    {id: 7, subject: "Student Statistics", path: "/exerciseStudentStatisticsPage"},
    {id: 8, subject: "Key value", path: "/exerciseKeyValuePage"},
    {id: 9, subject: "Memory game", path: "/exerciseMemoryGamePage"},
    {id: 10, subject: "Tic-Tac-Toe", path: "/exerciseTicTacToePage"},
    {id: 11, subject: "Order", path: "/exerciseOrderPage"},
    {id: 12, subject: "Register (Req-Res)", path: "/exerciseRegisterPage"},
    {id: 13, subject: "Login (Req-Res)", path: "/exerciseLoginPage"},
];

export default function HomePage() {
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
            <div>
                <h2 className="text-2xl font-semibold mt-4 text-center">
                    In order to add more exercises (more pages), you need to do the following:
                </h2>
                <p>1. Create a new component page (preferable at .\client\src\pages).</p>
                <p>2. Go to App.tsx (.\client\src\App.tsx) and add new component page to router.</p>
                <p>3. Go to homePage.tsx (.\client\src\pages\homePage.tsx) and add the new page in EXERCISES const.</p>
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
