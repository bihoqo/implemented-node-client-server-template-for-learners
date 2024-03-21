import { useState } from "react";

export default function ExerciseCounterPage() {
    const [counter, setCounter] = useState(0);

    return (
        <div className="max-w-md mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4 text-center">Counter: {counter}</h1>
            <div className="flex justify-center space-x-4">
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => setCounter(counter + 1)}
                >
                    Increment
                </button>
                <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => setCounter(counter - 1)}
                >
                    Decrement
                </button>
            </div>
        </div>
    );
}
