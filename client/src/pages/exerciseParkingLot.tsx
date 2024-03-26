import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs"; // Make sure to import Dayjs

interface AddCarToParkForm {
    width: number;
    plate: string;
    parkName: string;
}

interface ParkedCar {
    plate: string;
    parkingTime: Dayjs;
    width: number;
}

interface ParkingLot {
    name: string;
    widthCapacity: number;
}

const PARKS: ParkingLot[] = [
    {
        name: "Park A",
        widthCapacity: 100,
    },
    {
        name: "Park B",
        widthCapacity: 500,
    },
    {
        name: "Park C",
        widthCapacity: 150,
    }
];


// Define initial park data
const INITIAL_PARKS_DATA: Record<string, ParkedCar[]> = {
    "Park A": [
        { plate: "ABC123", parkingTime: dayjs(), width: 2 },
        { plate: "XYZ789", parkingTime: dayjs(), width: 3 }
    ],
    "Park B": [
        { plate: "DEF456", parkingTime: dayjs(), width: 2 }
    ],
    "Park C": []
};

export default function ExerciseParkingLot() {
    const [parkedCardsRecord, setParkedCardsRecord] = useState<Record<string, ParkedCar[]>>(INITIAL_PARKS_DATA);
    const [formData, setFormData] = useState<AddCarToParkForm>({
        width: 0,
        plate: "",
        parkName: "Park A" // Default to Park A
    });

    function calculateParkOccupiedSpace(parkName: string) {
        let sum = 0;
        for (const car of parkedCardsRecord[parkName]) {
            sum += car.width;
        }
        return sum;
    }

    const handleParkChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData(prevData => ({
            ...prevData,
            parkName: e.target.value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { width, plate, parkName } = formData;

        // Validate width
        if (width <= 0) {
            alert("Width must be greater than 0");
            return;
        }

        // Check capacity
        const foundPark = PARKS.find(p => p.name === parkName);

        if (!foundPark) {
            alert("Invalid park name");
            return;
        }

        const occupiedSpace = calculateParkOccupiedSpace(parkName);
        const remainingCapacity = foundPark.widthCapacity - occupiedSpace;

        if (remainingCapacity < width) {
            alert(`Not enough room in ${parkName}`);
            return;
        }

        // Add new car
        const newCar: ParkedCar = {
            plate,
            parkingTime: dayjs(),
            width
        };
        setFormData({ width: 0, plate: "", parkName: formData.parkName }); // Reset form data
        setParkedCardsRecord(prevData => ({
            ...prevData,
            [parkName]: [...prevData[parkName], newCar] // Add new car to the appropriate park
        }));
    };

    return (
        <div className="container mx-auto p-4">
            <div className="max-w-lg mx-auto mt-4 p-4 border border-gray-300 rounded bg-gray-600/20 shadow-md">
                <h1 className="text-2xl font-semibold mb-4">Add Car to Park</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="width" className="block text-sm font-medium text-gray-700">Width:</label>
                        <input type="number" id="width" name="width" value={formData.width} min={1} onChange={(e) => setFormData({ ...formData, width: parseFloat(e.target.value) })} required className="mt-1 p-2 block w-full border-gray-300 rounded-md" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="plate" className="block text-sm font-medium text-gray-700">Plate:</label>
                        <input type="text" id="plate" name="plate" value={formData.plate} onChange={(e) => setFormData({ ...formData, plate: e.target.value })} required className="mt-1 p-2 block w-full border-gray-300 rounded-md" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="park" className="block text-sm font-medium text-gray-700">Select Park:</label>
                        <select id="park" name="park" value={formData.parkName} onChange={handleParkChange} className="mt-1 p-2 block w-full border-gray-300 rounded-md">
                            {Object.keys(parkedCardsRecord).map((parkName, index) => (
                                <option key={index} value={parkName}>{parkName}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300">Submit</button>
                </form>
            </div>

            {/* Display Parks and Their Parked Cars */}
            <div className="mt-8">
                {Object.entries(parkedCardsRecord).map(([parkName, parkedCars], index) => {
                    const currentPark = PARKS.find(p => p.name === parkName);

                    if (!currentPark) {
                        return null;
                    }

                    return <div key={index} className="border border-gray-300 p-4 my-4 rounded">
                        <h2 className="text-lg font-semibold">{parkName}</h2>
                        <p>Parked Cars:</p>
                        <ul className="list-disc pl-5">
                            {parkedCars.map((car, carIndex) => (
                                <li key={carIndex}> Plate: {car.plate}, Width: {car.width}</li>
                            ))}
                        </ul>
                        <p>Occupied Space: {calculateParkOccupiedSpace(parkName)}</p>
                        <p>Remaining
                            Space: {currentPark?.widthCapacity - calculateParkOccupiedSpace(parkName)}</p>
                        <p>Number of Parked Cars: {parkedCars.length}</p>
                    </div>
                })}
            </div>
        </div>
    );
}
