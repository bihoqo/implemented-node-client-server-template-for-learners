import React, {useState} from "react";
import clsx from "clsx";

enum TemperatureOption {
    Cold = "Cold",
    Warm = "Warm",
    Hot = "Hot"
}

export default function ExerciseOptionsPage() {
    return (
        <div className="flex flex-col gap-12">
            <Example1/>
            <Example2/>
        </div>
    )
}

function getColor(temperature: TemperatureOption): string {
    switch (temperature) {
        case TemperatureOption.Cold:
            return "blue";
        case TemperatureOption.Warm:
            return "orange";
        case TemperatureOption.Hot:
            return "red";
        default:
            return "black"; // Default color
    }
}

function Example1() {
    const [selectedTemperature, setSelectedTemperature] = useState<TemperatureOption>(TemperatureOption.Cold);

    const handleTemperatureChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTemperature(event.target.value as TemperatureOption);
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-semibold mb-4 text-center">
                Please select a temperature:
            </h2>
            <div className="shadow-lg p-6">
                <select
                    value={selectedTemperature}
                    onChange={handleTemperatureChange}
                    className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                >
                    {Object.values(TemperatureOption).map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
                <div
                    style={{backgroundColor: getColor(selectedTemperature)}}
                    className="w-20 h-20 rounded-md"
                ></div>
            </div>
        </div>
    );
}

enum DifficultyOption {
    VeryEasy = "Very Easy",
    Easy = "Easy",
    Medium = "Medium",
    Hard = "Hard",
    VeryHard = "Very Hard"
}

function Example2() {
    const [selectedOption, setSelectedOption] = useState<DifficultyOption>(DifficultyOption.VeryEasy);

    return (
        <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold mb-4 text-center">
                Please select a difficultly:
            </h2>
            <div className="flex flex-row flex-wrap justify-center">
                {Object.values(DifficultyOption).map((o: DifficultyOption) => {
                    return (
                        <div key={o} className="section-container rounded-lg p-4">
                            <button onClick={() => setSelectedOption(o)}
                                    className={clsx("text-blue-600 hover:text-white px-4 py-2 rounded-md shadow-md transition-colors duration-300",
                                        selectedOption === o ? "bg-blue-500 hover:bg-blue-400 text-white" : "bg-white hover:bg-blue-600 ")}>
                                {o}
                            </button>
                        </div>
                    )
                })}
            </div>
            <div className="flex flex-row justify-center items-center">
                <h1>Selected Option: {selectedOption}</h1>
            </div>
        </div>
    );
}
