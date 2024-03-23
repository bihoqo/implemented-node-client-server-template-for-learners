import React, {useState} from "react";
import {faker} from "@faker-js/faker";
import clsx from "clsx";

enum ToppingOption {
    PICKLE = "pickle",
    ONION = "onion",
    TOMATO = "tomato",
    LETTUCE = "lettuce",
    SAUCE = "sauce"
}

enum WeightOption {
    "100kg" = "100kg",
    "200kg" = "200kg",
    "300kg" = "300kg"
}

interface OrderFormState {
    name: string;
    weight: WeightOption;
    toppings: ToppingOption[];
}

interface Order {
    id: number;
    recipient: string;
    orderDetails: string[];
    totalPrice: number;
}

const TOPPING_PRICES: { [topping in ToppingOption]: number } = {
    [ToppingOption.PICKLE]: 0.5,
    [ToppingOption.ONION]: 0.3,
    [ToppingOption.TOMATO]: 0.4,
    [ToppingOption.LETTUCE]: 0.2,
    [ToppingOption.SAUCE]: 0.6,
};

const WEIGHT_PRICES: { [weight in WeightOption]: number } = {
    [WeightOption["100kg"]]: 5.99,
    [WeightOption["200kg"]]: 8.99,
    [WeightOption["300kg"]]: 11.99,
};

const BUN_PRICE = 1.5; // Price for the bun

const ExerciseOrderPage: React.FC = () => {
    const [formState, setFormState] = useState<OrderFormState>({
        name: "",
        weight: WeightOption["100kg"],
        toppings: [],
    });
    const [orders, setOrders] = useState<Order[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormState({...formState, [name]: value});
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value, checked} = e.target;
        const toppingOption: ToppingOption = value as ToppingOption; // Convert value to ToppingOption enum type
        if (checked) {
            setFormState({...formState, toppings: [...formState.toppings, toppingOption]});
        } else {
            setFormState({...formState, toppings: formState.toppings.filter((t) => t !== toppingOption)});
        }
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const totalPrice =
            BUN_PRICE + WEIGHT_PRICES[formState.weight] + formState.toppings.reduce((acc, topping) => acc + TOPPING_PRICES[topping], 0);
        const newOrder: Order = {
            id: Math.floor(Math.random() * 100000), // Generate a random ID
            recipient: formState.name,
            orderDetails: [...formState.toppings, "bun"],
            totalPrice: totalPrice,
        };
        setOrders([...orders, newOrder]);
        setFormState({
            name: "",
            weight: WeightOption["100kg"],
            toppings: [],
        });
    };

    const fillFields = () => {
        const randomToppings = Object.values(ToppingOption).sort(() => Math.random() - 0.5).slice(0, 3);
        const randomWeight = Object.values(WeightOption)[Math.floor(Math.random() * 3)];

        // Generate random boolean values for each topping
        const randomToppingsState = Object.values(ToppingOption).reduce((acc, topping) => {
            acc[topping] = Math.random() < 0.5; // Assign true or false randomly
            return acc;
        }, {} as { [topping in ToppingOption]: boolean });

        setFormState({
            name: faker.person.fullName(),
            weight: randomWeight,
            toppings: randomToppings.filter(topping => randomToppingsState[topping]),
        });
    };

    return (
        <div className="flex flex-row gap-4 justify-center items-start mt-4">
            <div className="order-form-container rounded-lg shadow-md p-4 bg-blue-100">
                <h1 className="text-2xl font-bold mb-4">Order a Hamburger</h1>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
                        <option value="100kg">100kg - ${WEIGHT_PRICES["100kg"].toFixed(2)}</option>
                        <option value="200kg">200kg - ${WEIGHT_PRICES["200kg"].toFixed(2)}</option>
                        <option value="300kg">300kg - ${WEIGHT_PRICES["300kg"].toFixed(2)}</option>
                    </select>

                    <ToppingCheckbox name="pickle" label="Pickle" onChange={handleCheckboxChange}
                                     checked={formState.toppings.includes(ToppingOption.PICKLE)}/>
                    <ToppingCheckbox name="onion" label="Onion" onChange={handleCheckboxChange}
                                     checked={formState.toppings.includes(ToppingOption.ONION)}/>
                    <ToppingCheckbox name="tomato" label="Tomato" onChange={handleCheckboxChange}
                                     checked={formState.toppings.includes(ToppingOption.TOMATO)}/>
                    <ToppingCheckbox name="lettuce" label="Lettuce" onChange={handleCheckboxChange}
                                     checked={formState.toppings.includes(ToppingOption.LETTUCE)}/>
                    <ToppingCheckbox name="sauce" label="Sauce" onChange={handleCheckboxChange}
                                     checked={formState.toppings.includes(ToppingOption.SAUCE)}/>

                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                        Place Order
                    </button>
                    <button type="button" onClick={fillFields}
                            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                        Fill Fields
                    </button>
                </form>
            </div>
            <div>
                <div className={clsx("rounded-lg p-4 bg-orange-100 shadow-md",
                    {"hidden": orders.length === 0}
                )}>
                    <h1 className="text-2xl font-bold mb-4">Recent Orders:</h1>
                    {orders.map((order) => (
                        <OrderSummary key={order.id} order={order}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

interface ToppingCheckboxProps {
    name: string;
    label: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    checked: boolean;
}

const ToppingCheckbox: React.FC<ToppingCheckboxProps> = ({name, label, onChange, checked}) => {
    return (
        <div>
            <input type="checkbox" id={name} name={name} value={name} checked={checked} onChange={onChange}
                   className="mr-2"/>
            <label htmlFor={name}>{label}</label>
        </div>
    );
};

interface OrderSummaryProps {
    order: Order;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({order}) => {
    return (
        <div className="bg-gray-100 p-4 rounded shadow-md mb-4">
            <p>
                <span className="font-semibold">Recipient:</span> {order.recipient}
            </p>
            <p>
                <span className="font-semibold">Order:</span> {order.orderDetails.join(", ")}
            </p>
            <p>
                <span className="font-semibold">Total Price:</span> ${order.totalPrice.toFixed(2)}
            </p>
        </div>
    );
};

export default ExerciseOrderPage;
