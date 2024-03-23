import React, {useState} from 'react';
import {faker} from "@faker-js/faker";

enum LayoutExampleOption {
    Example1 = "Flex1",
    Example2 = "Flex2",
    Example3 = "Grid1",
}

export default function ExerciseLayoutPage() {
    const [selectedExample, setSelectedExample] = useState<LayoutExampleOption>(LayoutExampleOption.Example1);

    const showExample = (example: LayoutExampleOption) => {
        setSelectedExample(example);
    };

    const LayoutComponent = () => {
        switch (selectedExample) {
            case LayoutExampleOption.Example1:
                return <LayoutExample1/>;
            case LayoutExampleOption.Example2:
                return <LayoutExample2/>;
            case LayoutExampleOption.Example3:
                return <LayoutExample3/>;
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold mb-6 text-center">
                Layout Exercise
            </h1>
            <h2 className="text-2xl font-semibold mb-4 text-center">
                Please select a layout example:
            </h2>
            <div className="flex flex-row flex-wrap justify-center">
                {Object.values(LayoutExampleOption).map((example: LayoutExampleOption) => {
                    return (
                        <div key={example} className="section-container rounded-lg p-4">
                            <button onClick={() => showExample(example)}
                                    className="text-blue-600 bg-white hover:bg-blue-600 hover:text-white px-4 py-2 rounded-md shadow-md transition-colors duration-300">
                                {example}
                            </button>
                        </div>
                    )
                })}
            </div>
            <div className="section-container rounded-lg p-4">
                <h2 className="text-2xl font-bold mb-4">Selected Layout Example:</h2>
                <LayoutComponent/>
            </div>
        </div>
    );
}


function LayoutExample1() {
    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-row w-[500px] gap-5">
                <div className="flex flex-grow bg-red-500 justify-center items-center">
                    Column 1
                </div>
                <div className="flex flex-grow-2 flex-col">
                    <div className="flex flex-1 bg-green-500 p-5 justify-center">
                        Column 2.1
                    </div>
                    <div className="flex flex-1 bg-blue-500 p-5">
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-1 bg-red-500 justify-center">
                                Column 2.2
                            </div>
                            <div className="flex flex-row gap-5">
                                <div className="flex flex-1 bg-amber-200 justify-center py-8">
                                    Row 3.1
                                </div>
                                <div className="flex flex-1 bg-amber-300 py-8">Row 3.2</div>
                                <div className="flex flex-1 bg-amber-400 py-8">Row 3.3</div>
                            </div>
                            <div className="flex flex-row gap-5">
                                <div className="flex flex-1 bg-amber-200 justify-center py-8">
                                    Row 3.1
                                </div>
                                <div className="flex flex-1 bg-amber-300 py-8">Row 3.2</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function LayoutExample2() {
    return (
        <div className="flex flex-col gap-10">
            {/* Left Section */}
            <div className="flex flex-row">
                <div className="flex bg-red-500 p-5">Column 1</div>
                <div className="flex bg-green-500 p-5 items-center">Column 2</div>
                <div className="flex bg-blue-500 p-5">Column 3</div>
                <div className="flex flex-col">
                    <div className="flex bg-amber-200 p-5">Column 4.1</div>
                    <div className="flex bg-amber-300 p-5">Column 4.2</div>
                    <div className="flex bg-amber-400 p-5">Column 4.3</div>
                </div>
            </div>

            {/* Right Section */}
            <div className="flex flex-row w-[500px] gap-5">
                <div className="flex flex-grow bg-red-500 justify-center items-center">
                    Column 1
                </div>
                <div className="flex flex-grow-2 flex-col">
                    <div className="flex flex-1 bg-green-500 p-5 justify-center">
                        Column 2.1
                    </div>
                    <div className="flex flex-1 bg-blue-500 p-5">
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-1 bg-red-500 justify-center py-8">
                                Row 3.1
                            </div>
                            <div className="flex flex-row gap-5">
                                <div className="flex flex-1 bg-amber-200 justify-center py-8">
                                    Row 3.2
                                </div>
                                <div className="flex flex-1 bg-amber-300 py-8">Row 3.3</div>
                                <div className="flex flex-1 bg-amber-400 py-8">Row 3.4</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface RowData {
    id: number;
    name: string;
    firstName: string;
    lastName: string;
    sex: string;
    birthDate: Date;
    workingAt: string;
    finance: string;
    city: string;
    country: string;
    street: string;
    buildingNumber: string;
}

function generateRandomRows(numberOfRows: number): RowData[] {
    return Array.from({length: numberOfRows}, (_, idx: number) => ({
        id: idx + 1,
        name: `Row ${idx + 1}`,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        sex: faker.person.sex(),
        birthDate: faker.date.birthdate(),
        workingAt: faker.company.name(),
        finance: faker.finance.amount(),
        city: faker.location.city(),
        country: faker.location.county(),
        street: faker.location.street(),
        buildingNumber: faker.location.buildingNumber(),
    }));
}

function LayoutExample3() {
    const rows: RowData[] = generateRandomRows(10);

    return (
        <div className="overflow-x-auto">
            <div className="grid grid-cols-10fr-8fr-10fr-10fr-10fr-10fr-11fr-11fr-10fr-14fr gap-2">
                {/* Column Headers */}
                <div className="bg-gray-200 py-2 px-4">ID</div>
                <div className="bg-gray-200 py-2 px-4">Name</div>
                <div className="bg-gray-200 py-2 px-4">First Name</div>
                <div className="bg-gray-200 py-2 px-4">Last Name</div>
                <div className="bg-gray-200 py-2 px-4">Sex</div>
                <div className="bg-gray-200 py-2 px-4">Birth Date</div>
                <div className="bg-gray-200 py-2 px-4">Working At</div>
                <div className="bg-gray-200 py-2 px-4">Finance</div>
                <div className="bg-gray-200 py-2 px-4">City</div>
                <div className="bg-gray-200 py-2 px-4">Country</div>
                <div className="bg-gray-200 py-2 px-4">Street</div>
                <div className="bg-gray-200 py-2 px-4">Building Number</div>

                {/* Rows */}
                {rows.map(row => (
                    <React.Fragment key={row.id}>
                        <div className="bg-white py-2 px-4">{row.id}</div>
                        <div className="bg-white py-2 px-4">{row.name}</div>
                        <div className="bg-white py-2 px-4">{row.firstName}</div>
                        <div className="bg-white py-2 px-4">{row.lastName}</div>
                        <div className="bg-white py-2 px-4">{row.sex}</div>
                        <div className="bg-white py-2 px-4">{row.birthDate.toLocaleDateString()}</div>
                        <div className="bg-white py-2 px-4">{row.workingAt}</div>
                        <div className="bg-white py-2 px-4">{row.finance}</div>
                        <div className="bg-white py-2 px-4">{row.city}</div>
                        <div className="bg-white py-2 px-4">{row.country}</div>
                        <div className="bg-white py-2 px-4">{row.street}</div>
                        <div className="bg-white py-2 px-4">{row.buildingNumber}</div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}
