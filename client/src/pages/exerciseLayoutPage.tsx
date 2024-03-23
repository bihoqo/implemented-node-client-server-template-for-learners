import React, {useState} from 'react';
import {faker} from "@faker-js/faker";
import {shortenId} from "../utils/strings.ts";

enum LayoutExampleOption {
    Example1 = "Flex1",
    Example2 = "Flex2",
    Example3 = "Grid1",
    Example4 = "Navbar",
    Example5 = "KeyValue",
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
            case LayoutExampleOption.Example4:
                return <LayoutExample4/>;
            case LayoutExampleOption.Example5:
                return <LayoutExample5/>;
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
    index: number;
    id: string;
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

function generateRowData(index: number = 0): RowData {
    return {
        index: index,
        id: faker.string.uuid(),
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
    };
}

function generateRandomRows(numberOfRows: number): RowData[] {
    return Array.from({length: numberOfRows}, (_, idx: number) => {
        return generateRowData(idx);
    });
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
                        <div className="bg-white py-2 px-4">{row.index}</div>
                        <div className="bg-white py-2 px-4">{row.id}</div>
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

function LayoutExample4() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Navbar */}
            <nav className="bg-gray-800 text-white py-4 px-8 flex justify-between items-center">
                <div className="text-2xl font-bold">Logo</div>
                <ul className="flex gap-6">
                    <li><a href="#" className="hover:underline">Home</a></li>
                    <li><a href="#" className="hover:underline">About</a></li>
                    <li><a href="#" className="hover:underline">Services</a></li>
                    <li><a href="#" className="hover:underline">Contact</a></li>
                </ul>
            </nav>

            {/* Main Content */}
            <div className="flex-1 bg-gray-200 p-8">
                <h1 className="text-3xl font-bold mb-6">Main Content</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus consectetur velit id ex volutpat,
                    nec feugiat magna finibus. Sed aliquet tellus sit amet nisl vehicula, eu viverra nisi posuere. Proin
                    eu felis id ipsum tempus efficitur. Mauris varius nibh sit amet justo facilisis, id facilisis justo
                    fermentum. Integer nec tellus ligula. Sed id commodo risus. Morbi nec massa at lorem condimentum
                    sodales ut eget purus. Donec at velit eget lacus gravida cursus. In vitae ipsum et velit congue
                    pretium ac nec nunc.</p>
            </div>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-4 px-8 text-center">
                &copy; 2024 Company Name. All rights reserved.
            </footer>
        </div>
    );
}

function LayoutExample5() {
    const [rowData, setRowData] = useState<RowData>(generateRowData());

    function refreshData() {
        setRowData(generateRowData());
    }

    const keyValueData = [
        {key: "ID", value: shortenId(rowData.id)},
        {key: "First Name", value: rowData.firstName},
        {key: "Last Name", value: rowData.lastName},
        {key: "Sex", value: rowData.sex},
        {key: "Birth Date", value: rowData.birthDate.toLocaleDateString()},
        {key: "Working At", value: rowData.workingAt},
        {key: "Finance", value: `$${rowData.finance}`},
        {key: "City", value: rowData.city},
        {key: "Country", value: rowData.country},
        {key: "Street", value: rowData.street},
        {key: "Building Number", value: rowData.buildingNumber},
    ];

    return (
        <div className="flex flex-col gap-4 justify-center w-[300px]">
            <div className="flex flex-col bg-[#0b0c13] w-full p-3 rounded-md shadow-2xl">
                {keyValueData.map((item, index) => {
                    return (
                        <span className="flex flex-row items-center justify-between gap-4" key={index}>
                            <span className="font-medium text-white/50 whitespace-nowrap">{item.key}</span>
                            <span className="font-semibold text-white whitespace-nowrap overflow-hidden overflow-ellipsis">{item.value}</span>
                        </span>
                    );
                })}
            </div>
            <button
                onClick={refreshData}
                className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md transition-colors duration-300 hover:bg-blue-600">
                Refresh Data
            </button>
        </div>
    );
}
