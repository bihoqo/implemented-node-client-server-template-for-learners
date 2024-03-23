import React, { useState } from 'react';
import clsx from "clsx";

// Define an enum for ingredients
enum Ingredient {
    Flour = 'Flour',
    Sugar = 'Sugar',
    Eggs = 'Eggs',
    Butter = 'Butter',
    Milk = 'Milk',
}

const ExerciseIncludePage: React.FC = () => {
    return (
        <div className="max-w-screen-lg mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-6 text-center">
                Exercise Include Page
            </h1>
            <Example1 />
            <Example2 />
        </div>
    );
};

function Example1() {
    // State to keep track of selected ingredients
    const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);

    // Function to handle button click event
    const toggleIngredient = (ingredient: Ingredient) => {
        // Check if the ingredient is already selected
        const isSelected = selectedIngredients.includes(ingredient);

        // Update the list of selected ingredients accordingly
        if (isSelected) {
            setSelectedIngredients(selectedIngredients.filter(item => item !== ingredient));
        } else {
            setSelectedIngredients([...selectedIngredients, ingredient]);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4 text-center">Select Ingredients</h1>
            <div className="flex flex-row gap-4 justify-center items-center">
                {/* Generate buttons for each ingredient */}
                {Object.values(Ingredient).map(ingredient => (
                    <button
                        key={ingredient}
                        onClick={() => toggleIngredient(ingredient)}
                        className={clsx("p-2 w-[100px] rounded-md shadow-md", selectedIngredients.includes(ingredient) ? 'bg-green-500 hover:bg-green-400' : 'bg-gray-300 hover:bg-gray-200')}
                    >
                        {ingredient}
                    </button>
                ))}
            </div>
            {/* Display selected ingredients */}
            <div className="flex flex-col justify-center items-center mt-6">
                <p className="text-lg font-semibold">Selected Ingredients:</p>
                <p>{selectedIngredients.join(', ')}</p>
            </div>
        </div>
    );
}

function Example2() {
    // State to keep track of checkbox values
    const [checkboxValues, setCheckboxValues] = useState<{ [key in Ingredient]: boolean }>({
        Flour: false,
        Sugar: false,
        Eggs: false,
        Butter: false,
        Milk: false,
    });

    // Function to handle checkbox change event
    const handleCheckboxChange = (ingredient: Ingredient) => {
        setCheckboxValues({
            ...checkboxValues,
            [ingredient]: !checkboxValues[ingredient],
        });
    };

    // State to keep track of selected radio button value
    const [selectedRadioButton, setSelectedRadioButton] = useState<Ingredient | null>(null);

    // Function to handle radio button change event
    const handleRadioButtonChange = (ingredient: Ingredient) => {
        setSelectedRadioButton(ingredient);
    };

    return (
        <div className="container mx-auto p-4 mt-8">
            <h1 className="text-3xl font-bold mb-4 text-center">Example 2: Checkboxes and Radio Buttons</h1>
            <div className="flex flex-col gap-4">
                {/* Checkboxes */}
                <div>
                    <p className="text-lg font-semibold mb-2">Checkboxes:</p>
                    {Object.values(Ingredient).map(ingredient => (
                        <label key={ingredient} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={checkboxValues[ingredient]}
                                onChange={() => handleCheckboxChange(ingredient)}
                                className="form-checkbox h-5 w-5 text-blue-500 rounded"
                            />
                            <span>{ingredient}</span>
                        </label>
                    ))}
                </div>
                {/* Radio Buttons */}
                <div>
                    <p className="text-lg font-semibold mb-2">Radio Buttons:</p>
                    {Object.values(Ingredient).map(ingredient => (
                        <label key={ingredient} className="flex items-center gap-2">
                            <input
                                type="radio"
                                checked={selectedRadioButton === ingredient}
                                onChange={() => handleRadioButtonChange(ingredient)}
                                className="form-radio h-5 w-5 text-blue-500 rounded"
                            />
                            <span>{ingredient}</span>
                        </label>
                    ))}
                </div>
            </div>
            {/* Display selected options */}
            <div className="flex flex-col justify-center items-center mt-6">
                <p className="text-lg font-semibold">Selected Checkboxes:</p>
                <p>{Object.entries(checkboxValues).filter(([, value]) => value).map(([key]) => key).join(', ')}</p>
                <p className="text-lg font-semibold mt-4">Selected Radio Button:</p>
                <p>{selectedRadioButton || 'None'}</p>
            </div>
        </div>
    );
}

export default ExerciseIncludePage;
