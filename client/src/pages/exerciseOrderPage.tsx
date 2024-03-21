import React, {useState, useEffect} from "react";

interface OrderFormState {
    name: string;
    weight: string;
    toppings: string[];
}

interface Order {
    id: number;
    recipient: string;
    orderDetails: string[];
    totalPrice: number;
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
    const [orders, setOrders] = useState<Order[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormState({...formState, [name]: value});
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value, checked} = e.target;
        if (checked) {
            setFormState({...formState, toppings: [...formState.toppings, value]});
        } else {
            setFormState({...formState, toppings: formState.toppings.filter((t) => t !== value)});
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const totalPrice =
            bunPrice + weightPrices[formState.weight] + formState.toppings.reduce((acc, topping) => acc + toppingPrices[topping], 0);
        const newOrder: Order = {
            id: Math.floor(Math.random() * 100000), // Generate a random ID
            recipient: formState.name,
            orderDetails: [...formState.toppings, "Bun"],
            totalPrice: totalPrice,
        };
        setOrders([...orders, newOrder]);
        setFormState({
            name: "",
            weight: "100kg",
            toppings: [],
        });
    };

    return (
        <div className="container mx-auto p-4">
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
                    <option value="100kg">100kg - ${weightPrices["100kg"].toFixed(2)}</option>
                    <option value="200kg">200kg - ${weightPrices["200kg"].toFixed(2)}</option>
                    <option value="300kg">300kg - ${weightPrices["300kg"].toFixed(2)}</option>
                </select>

                <ToppingCheckbox name="pickle" label="Pickle" onChange={handleCheckboxChange}/>
                <ToppingCheckbox name="onion" label="Onion" onChange={handleCheckboxChange}/>
                <ToppingCheckbox name="tomato" label="Tomato" onChange={handleCheckboxChange}/>
                <ToppingCheckbox name="lettuce" label="Lettuce" onChange={handleCheckboxChange}/>
                <ToppingCheckbox name="sauce" label="Sauce" onChange={handleCheckboxChange}/>

                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    Place Order
                </button>
            </form>
            {orders.length > 0 && (
                <div className="mt-8">
                    <h2 className="text-lg font-semibold mb-4">Recent Orders:</h2>
                    {orders.map((order) => (
                        <OrderSummary key={order.id} order={order}/>
                    ))}
                </div>
            )}
        </div>
    );
};

interface ToppingCheckboxProps {
    name: string;
    label: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ToppingCheckbox: React.FC<ToppingCheckboxProps> = ({name, label, onChange}) => {
    return (
        <div>
            <input type="checkbox" id={name} name={name} value={name} onChange={onChange} className="mr-2"/>
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
