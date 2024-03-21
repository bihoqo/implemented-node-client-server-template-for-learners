import {ChangeEvent, useState} from "react";
import clsx from "clsx";
import {faker} from "@faker-js/faker";

interface Student {
    name: string;
    age: number;
    grades: {
        math: number;
        english: number;
        science: number;
    };
}

interface Statistics {
    highestOverallGrade: Student | null;
    highestMathGrade: Student | null;
    highestEnglishGrade: Student | null;
    highestScienceGrade: Student | null;
    oldestStudent: Student | null;
    youngestStudent: Student | null;
}

export default function ExerciseStatisticsPage() {
    const [students, setStudents] = useState<Student[]>([]);
    const [studentInputForm, setStudentInputForm] = useState<Student>({
        name: "",
        age: 0,
        grades: {math: 0, english: 0, science: 0},
    });

    const studentInInputFormUnique = students.findIndex((student) => student.name === studentInputForm.name) === -1;
    const disabledAddButton = studentInputForm.name === "" || studentInputForm.age === 0;

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        const inputValue = parseInt(value);
        const newValue = isNaN(inputValue) ? 0 : Math.min(Math.max(0, inputValue), 100);

        setStudentInputForm((prev) => ({
            ...prev,
            [name]: name === 'age' ? parseInt(value) : value,
            grades: {
                ...prev.grades,
                [name]: newValue,
            },
        }));
    };

    const addStudent = (newStudent: Student) => {
        const existingStudentIndex = students.findIndex(student => student.name === newStudent.name);
        if (existingStudentIndex !== -1) {
            const updatedStudents = [...students];
            updatedStudents[existingStudentIndex] = newStudent;
            setStudents(updatedStudents);
        } else {
            setStudents([...students, newStudent]);
        }
        setStudentInputForm({ name: "", age: 0, grades: { math: 0, english: 0, science: 0 } }); // Reset form
    };

    const addStudentButtonClickHandler = () => {
        addStudent(studentInputForm);
        setStudentInputForm({name: "", age: 0, grades: {math: 0, english: 0, science: 0}}); // Reset form
    };

    const addRandomStudentButtonClickHandler = () => {
        const randomStudent: Student = {
            name: faker.person.fullName(),
            age: Math.floor(Math.random() * 18) + 12,
            grades: {
                math: Math.floor(Math.random() * 100),
                english: Math.floor(Math.random() * 100),
                science: Math.floor(Math.random() * 100),
            },
        };
        addStudent(randomStudent);
    };

    const editStudent = (index: number) => {
        const student = students[index];
        setStudentInputForm(student);
    }

    const deleteStudent = (index: number) => {
        const updatedStudents = [...students];
        updatedStudents.splice(index, 1);
        setStudents(updatedStudents);
    };


    return (
        <div className="max-w-4xl mx-auto p-5">
            <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">Add Student</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={studentInputForm.name}
                        onChange={handleInputChange}
                        placeholder="Name"
                        className="input input-bordered w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 bg-amber-100"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
                        Age
                    </label>
                    <input
                        type="number"
                        name="age"
                        id="age"
                        value={studentInputForm.age.toString()}
                        onChange={handleInputChange}
                        placeholder="Age"
                        className="input input-bordered w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 bg-amber-100"
                    />
                </div>
                {/* Repeat for each subject */}
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="math">
                        Math Grade
                    </label>
                    <input
                        type="number"
                        name="math"
                        id="math"
                        value={studentInputForm.grades.math.toString()}
                        onChange={handleInputChange}
                        placeholder="Math Grade"
                        className="input input-bordered w-full p-2 border  border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 bg-amber-100"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="english">
                        English Grade
                    </label>
                    <input
                        type="number"
                        name="english"
                        id="english"
                        value={studentInputForm.grades.english.toString()}
                        onChange={handleInputChange}
                        placeholder="English Grade"
                        className="input input-bordered w-full p-2 border  border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 bg-amber-100"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="science">
                        Science Grade
                    </label>
                    <input
                        type="number"
                        name="science"
                        id="science"
                        value={studentInputForm.grades.science.toString()}
                        onChange={handleInputChange}
                        placeholder="Science Grade"
                        className="input input-bordered w-full p-2 border  border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 bg-amber-100"
                    />
                </div>
            </div>
            <div className="flex flex-row gap-2">
                <button onClick={addStudentButtonClickHandler} disabled={disabledAddButton}
                        className={clsx("btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",
                            {"opacity-50": disabledAddButton})}>
                    {studentInInputFormUnique ? "Add Student" : "Update Student"}
                </button>
                <button onClick={addRandomStudentButtonClickHandler}
                        className={clsx("btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",)}>
                    Add Random Student
                </button>
            </div>

            <h2 className="text-2xl font-semibold text-center text-blue-600 my-6">Students</h2>
            <div className="flex flex-row flex-wrap gap-2">
                {students.map((student, index) => {
                    return <StudentCard key={student.name} student={student} editStudent={editStudent}
                                        deleteStudent={deleteStudent}
                                        index={index}/>
                })}
            </div>

            {/* Display statistics section... */}
            <StatisticsSection students={students}/>
        </div>
    );
}

interface StudentCardProps {
    student: Student;
    index: number;
    deleteStudent: (index: number) => void;
    editStudent: (index: number) => void;
}

export function StudentCard({student, index, editStudent, deleteStudent}: StudentCardProps) {
    return (
        <div className="border border-gray-200 p-4 rounded-lg shadow-md mb-4 relative bg-white">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-blue-600">{student.name}</h3>
            </div>
            <p className="mb-2 text-gray-700">Age: {student.age}</p>
            <p className="mb-2 text-gray-700">Math: {student.grades.math}</p>
            <p className="mb-2 text-gray-700">English: {student.grades.english}</p>
            <p className="mb-2 text-gray-700">Science: {student.grades.science}</p>
            <button
                className="w-full text-green-500 hover:text-green-700 focus:outline-none px-2 py-1 rounded bg-green-100"
                onClick={() => editStudent(index)}
            >
                Edit
            </button>
            <button
                className="w-full text-red-500 hover:text-red-700 focus:outline-none px-2 py-1 rounded bg-red-100 mt-2"
                onClick={() => deleteStudent(index)}
            >
                Delete
            </button>
        </div>
    );
}

function StatisticsSection({students = []}: { students: Student[] }) {

    function calculateAverageGrade(grades: { math: number; english: number; science: number }) {
        return (grades.math + grades.english + grades.science) / 3;
    }

    function calculateStatistics(): Statistics | undefined {
        if (students.length === 0) return undefined;

        // Default template for the statistics object
        const stats = {
            highestOverallGrade: null as Student | null,
            highestMathGrade: null as Student | null,
            highestEnglishGrade: null as Student | null,
            highestScienceGrade: null as Student | null,
            oldestStudent: null as Student | null,
            youngestStudent: null as Student | null
        };

        // Ensure there are students to calculate statistics for
        if (students.length === 0) return stats;

        // Initialize with the first student as a reference point
        stats.highestOverallGrade = students[0];
        stats.highestMathGrade = students[0];
        stats.highestEnglishGrade = students[0];
        stats.highestScienceGrade = students[0];
        stats.oldestStudent = students[0];
        stats.youngestStudent = students[0];

        let highestOverallGradeAvg = calculateAverageGrade(students[0].grades);

        students.forEach(student => {
            const avgGrade = calculateAverageGrade(student.grades);
            if (avgGrade > highestOverallGradeAvg) {
                stats.highestOverallGrade = student;
                highestOverallGradeAvg = avgGrade;
            }
            if (student.grades.math > stats.highestMathGrade!.grades.math) stats.highestMathGrade = student;
            if (student.grades.english > stats.highestEnglishGrade!.grades.english) stats.highestEnglishGrade = student;
            if (student.grades.science > stats.highestScienceGrade!.grades.science) stats.highestScienceGrade = student;
            if (student.age > stats.oldestStudent!.age) stats.oldestStudent = student;
            if (student.age < stats.youngestStudent!.age) stats.youngestStudent = student;
        });

        return stats;
    }

    const statistics = calculateStatistics();

    if (!statistics) return <div>No students added yet</div>
    return (
        <div className="border border-gray-200 p-4 rounded-lg shadow-md mb-6">
            <h2 className="text-lg font-semibold mb-4">Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Highest Overall Grade</h3>
                    <p>{statistics.highestOverallGrade!.name}</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Highest Math Grade</h3>
                    <p>{statistics.highestMathGrade!.name}</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Highest English Grade</h3>
                    <p>{statistics.highestEnglishGrade!.name}</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Highest Science Grade</h3>
                    <p>{statistics.highestScienceGrade!.name}</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Oldest Student</h3>
                    <p>{statistics.oldestStudent!.name}</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Youngest Student</h3>
                    <p>{statistics.youngestStudent!.name}</p>
                </div>
            </div>
        </div>
    );
}
