import React, { useState, useEffect } from "react";

interface OrderFormState {
    name: string;
    weight: string;
    toppings: string[];
}

const toppingPrices: { [topping: string]: number } = {
    pickle: 0.5,
    onion: 0.3,
    tomato: 0.4,
    lettuce: 0.2,
    sauce: 0.6,
};

const weightPrices: { [weight: string]: number } = {
    "100kg": 5.99,
    "200kg": 8.99,
    "300kg": 11.99,
};

const bunPrice = 1.5; // Price for the bun

const ExerciseOrderPage: React.FC = () => {
    const [formState, setFormState] = useState<OrderFormState>({
        name: "",
        weight: "100kg",
        toppings: [],
    });
    const [currentPrice, setCurrentPrice] = useState(0);

    useEffect(() => {
        const calculatePrice = () => {
            let totalPrice = 0;

            // Adding the price for the bun
            totalPrice += bunPrice;

            // Adding the price for the selected weight
            totalPrice += weightPrices[formState.weight];

            // Adding the price for each selected topping
            formState.toppings.forEach((topping) => {
                totalPrice += toppingPrices[topping];
            });

            setCurrentPrice(totalPrice);
        };

        calculatePrice();
    }, [formState]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormState({ ...formState, [name]: value });
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        if (checked) {
            setFormState({ ...formState, toppings: [...formState.toppings, value] });
        } else {
            setFormState({ ...formState, toppings: formState.toppings.filter((t) => t !== value) });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted with state:", formState);
        // Here you would handle the submission of the order
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Order a Hamburger</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <label htmlFor="name" className="font-semibold">
                    Your Name:
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded px-2 py-1"
                    required
                />

                <label htmlFor="weight" className="font-semibold">
                    Weight:
                </label>
                <select
                    id="weight"
                    name="weight"
                    value={formState.weight}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded px-2 py-1"
                    required
                >
                    <option value="100kg">100kg - ${weightPrices["100kg"].toFixed(2)}</option>
                    <option value="200kg">200kg - ${weightPrices["200kg"].toFixed(2)}</option>
                    <option value="300kg">300kg - ${weightPrices["300kg"].toFixed(2)}</option>
                </select>

                <fieldset>
                    <legend className="font-semibold">Toppings:</legend>
                    <div>
                        <input
                            type="checkbox"
                            id="bun"
                            name="bun"
                            value="bun"
                            checked
                            disabled
                            className="mr-2"
                        />
                        <label htmlFor="bun">Bun</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="pickle"
                            name="pickle"
                            value="pickle"
                            onChange={handleCheckboxChange}
                            className="mr-2"
                        />
                        <label htmlFor="pickle">Pickle</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="onion"
                            name="onion"
                            value="onion"
                            onChange={handleCheckboxChange}
                            className="mr-2"
                        />
                        <label htmlFor="onion">Onion</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="tomato"
                            name="tomato"
                            value="tomato"
                            onChange={handleCheckboxChange}
                            className="mr-2"
                        />
                        <label htmlFor="tomato">Tomato</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="lettuce"
                            name="lettuce"
                            value="lettuce"
                            onChange={handleCheckboxChange}
                            className="mr-2"
                        />
                        <label htmlFor="lettuce">Lettuce</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="sauce"
                            name="sauce"
                            value="sauce"
                            onChange={handleCheckboxChange}
                            className="mr-2"
                        />
                        <label htmlFor="sauce">Sauce</label>
                    </div>
                </fieldset>

                <div className="mt-4">
                    <h2 className="font-semibold">Current Order:</h2>
                    <ul>
                        {formState.toppings.map((topping, index) => (
                            <li key={index}>{topping}</li>
                        ))}
                        <li>Bun</li>
                    </ul>
                    <h3 className="font-semibold">Price: ${currentPrice.toFixed(2)}</h3>
                </div>

                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    Place Order
                </button>
            </form>
        </div>
    );
};

export default ExerciseOrderPage;
