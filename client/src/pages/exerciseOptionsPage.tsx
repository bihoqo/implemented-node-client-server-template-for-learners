import React, { useState } from "react";

enum TemperatureOption {
    Cold = "Cold",
    Warm = "Warm",
    Hot = "Hot"
}

export default function ExerciseOptionsPage() {
    const [selectedTemperature, setSelectedTemperature] = useState<TemperatureOption>(TemperatureOption.Cold);

    const handleTemperatureChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTemperature(event.target.value as TemperatureOption);
    };

    return (
        <div className="flex items-center justify-center h-screen">
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
                    style={{ backgroundColor: getColor(selectedTemperature) }}
                    className="w-20 h-20 rounded-md"
                ></div>
            </div>
        </div>
    );
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
