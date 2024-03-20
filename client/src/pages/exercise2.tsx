import React, {useState} from "react";
import {isStringValidNumber} from "../utils/numbers.ts";

export default function Exercise2() {
    const [inputTextValue, setInputTextValue] = useState("");
    const [inputNumberValue, setInputNumberValue] = useState("");

    function handleInputTextChange(e: React.ChangeEvent<HTMLInputElement>) {
        setInputTextValue(e.target.value);
    }

    function handleInputNumberChange(e: React.ChangeEvent<HTMLInputElement>) {
        let newValue = e.target.value;
        if (newValue.trim() === "") {
            setInputNumberValue("");
            return;
        }

        if (newValue.startsWith("00")) {
            return;
        }

        if (newValue.startsWith(".")) {
            newValue = `0${newValue}`;
        }

        if (!isStringValidNumber(newValue)) {
            return;
        }
        setInputNumberValue(newValue);
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="max-w-md mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">Input Text: {inputTextValue}</h1>
                <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
                    value={inputTextValue}
                    onChange={handleInputTextChange}
                    placeholder="Type something..."
                />
            </div>
            <div className="max-w-md mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">Input Text: {inputNumberValue || 0}</h1>
                <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
                    value={inputNumberValue}
                    onChange={handleInputNumberChange}
                    placeholder="Type something..."
                />
            </div>
        </div>
    );
}
