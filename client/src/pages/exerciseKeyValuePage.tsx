import {useState} from "react";

interface Pair {
    key: string;
    value: string;
}

export default function ExerciseKeyValuePage() {
    const [pairs, setPairs] = useState<Pair[]>([]);
    const [newPair, setNewPair] = useState<Pair>({key: "", value: ""});

    const addPair = () => {
        if (!newPair.key) {
            alert("Key is required");
            return;
        }

        if (!newPair.value) {
            alert("Value is required");
            return;
        }

        const existingPairIndex = pairs.findIndex((pair) => pair.key === newPair.key);
        if (existingPairIndex !== -1) {
            const updatedPairs = [...pairs];
            updatedPairs[existingPairIndex] = newPair;
            setPairs(updatedPairs);
        } else {
            setPairs([...pairs, newPair]);
        }
        setNewPair({key: "", value: ""});
    };

    const deletePair = (index: number) => {
        const updatedPairs = [...pairs];
        updatedPairs.splice(index, 1);
        setPairs(updatedPairs);
    };

    return (
        <div className="max-w-4xl mx-auto p-5 text-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-center mb-6 text-black">Key-Value Pairs</h2>
            <div className="mb-4 flex justify-center items-center">
                <div className="mb-4 flex items-center">
                    <label htmlFor="key" className="mr-2 text-black">Key</label>
                    <input
                        type="text"
                        id="key"
                        value={newPair.key}
                        onChange={(e) => setNewPair({...newPair, key: e.target.value})}
                        placeholder="Enter Key"
                        className="input input-bordered w-1/3 mr-2 bg-yellow-100 text-yellow-800 p-2 rounded-l-md"
                    />
                    <label htmlFor="value" className="mr-2 text-black">Value</label>
                    <input
                        type="text"
                        id="value"
                        value={newPair.value}
                        onChange={(e) => setNewPair({...newPair, value: e.target.value})}
                        placeholder="Enter Value"
                        className="input input-bordered w-1/3 mr-2 bg-blue-100 text-blue-800 p-2"
                    />
                    <button onClick={addPair}
                            className="btn bg-blue-500 text-white hover:bg-blue-700 rounded-md p-2 ml-4">
                        Add Pair
                    </button>
                </div>
            </div>
            <div>
                {pairs.map((pair, index) => (
                    <KeyValuePair key={index} pair={pair} onDelete={() => deletePair(index)}/>
                ))}
            </div>
        </div>
    );
}

function KeyValuePair({pair, onDelete}: { pair: Pair; onDelete: () => void }) {
    return (
        <div
            className="border border-white bg-gray-800 p-4 rounded-lg shadow-md mb-4 flex justify-between items-center">
            <div>
                <p className="text-lg font-semibold text-white">{pair.key}</p>
                <p className="text-gray-300">{pair.value}</p>
            </div>
            <button onClick={onDelete} className="text-red-500 hover:text-red-700 focus:outline-none">
                Delete
            </button>
        </div>
    );
}
