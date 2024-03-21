import {useState} from "react";
import clsx from "clsx";


export default function ExerciseButtonColorPage() {
    const [isButtonOn, setIsButtonOn] = useState(false);

    return (
        <div className="max-w-md mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4 text-center">Button Color Changes (Between One and Off)</h1>
            <div className="flex justify-center space-x-4">
                <button
                    className={clsx("text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",
                        isButtonOn ? "bg-blue-500 hover:bg-blue-600 " : "bg-red-500 hover:bg-red-600"
                    )}
                    onClick={() => setIsButtonOn(!isButtonOn)}
                >
                    {isButtonOn ? "Turn Off" : "Turn On"}
                </button>
            </div>
        </div>
    );
}
