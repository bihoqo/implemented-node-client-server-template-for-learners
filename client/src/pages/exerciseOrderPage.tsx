import React, {useState} from "react";
import {faker} from "@faker-js/faker";
import clsx from "clsx";
import {shortenId} from "../utils/strings.ts";

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
    id: string;
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
    const [orders, setOrders] = useState<Order[]>([]);

    function addNewOrder(o: Order) {
        setOrders([...orders, o]);
    }

    return (
        <div className="flex flex-col gap-4 justify-start items-center mt-4">
            <div className="flex flex-row gap-4 justify-start items-start mt-4">
                {/* Render the OrderForm component */}
                <div className="flex">
                    <OrderForm addNewOrder={addNewOrder}/>
                </div>
                <div className="flex max-w-[800px]">
                    <OrdersList orders={orders}/>
                </div>
            </div>
            <RecipientStatistics orders={orders}/>
        </div>
    );
};

interface OrderFormProps {
    addNewOrder: (order: Order) => void;
}

function OrderForm({addNewOrder}: OrderFormProps) {
    // State variables and functions for the form
    const [formState, setFormState] = useState<OrderFormState>({
        name: "",
        weight: WeightOption["100kg"],
        toppings: [],
    });

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
            id: faker.string.uuid(),
            recipient: formState.name,
            orderDetails: [...formState.toppings, "bun"],
            totalPrice: totalPrice,
        };
        addNewOrder(newOrder);
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
    );
}

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

interface OrdersListProps {
    orders: Order[];
}

const OrdersList = ({orders}: OrdersListProps) => {
    return (
        <div>
            {/* Render the orders div */}
            <div className={clsx("rounded-lg p-4 bg-orange-100 shadow-md", {"hidden": orders.length === 0})}>
                <h1 className="text-2xl font-bold mb-4">Recent Orders:</h1>
                <div className="flex flex-row flex-wrap gap-2">
                    {orders.map((order) => (
                        <OrderSummary key={order.id} order={order}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

interface OrderSummaryProps {
    order: Order;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({order}) => {
    return (
        <div className="bg-gray-100 p-4 rounded shadow-md mb-4">
            <p>
                <span className="font-semibold">Order Id:</span> {shortenId(order.id)}
            </p>
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

const RecipientStatistics = ({orders}: { orders: Order[] }) => {
    const [selectedRecipient, setSelectedRecipient] = useState<string>("");

    // Extract unique recipients from orders
    const recipients = Array.from(new Set(orders.map((order) => order.recipient)));

    return (
        <div className="w-2/4 mb-8">
            <h1 className="text-2xl font-bold mb-4">Recipient Statistics:</h1>
            <div className="flex flex-wrap gap-2">
                {/* Render buttons for each recipient */}
                {recipients.map((recipient) => (
                    <button
                        key={recipient}
                        onClick={() => setSelectedRecipient(recipient)}
                        className={clsx("border border-gray-300 rounded px-2 py-1", {
                            "bg-blue-500 text-white": recipient === selectedRecipient,
                            "bg-gray-200 text-gray-700": recipient !== selectedRecipient,
                        })}
                    >
                        {recipient}
                    </button>
                ))}
            </div>
            {selectedRecipient && <RecipientStats recipient={selectedRecipient} orders={orders}/>}
        </div>
    );
};

interface RecipientStatsProps {
    recipient: string;
    orders: Order[];
}

const RecipientStats = ({recipient, orders}: RecipientStatsProps) => {
    const recipientOrders = orders.filter((order) => order.recipient === recipient);
    const totalSpent = recipientOrders.reduce((acc, order) => acc + order.totalPrice, 0);
    const totalOrders = recipientOrders.length;

    return (
        <div className="bg-gray-100 p-4 rounded shadow-md mt-4">
            <h2 className="text-lg font-semibold mb-2">Recipient: {recipient}</h2>
            <p>Total Orders: {totalOrders}</p>
            <p>Total Spent: ${totalSpent.toFixed(2)}</p>
        </div>
    );
}

export default ExerciseOrderPage;
