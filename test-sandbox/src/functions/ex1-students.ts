import {Student} from "../interfaces";

export const aliceStudent: Student = {name: "Alice", grades: {"Math": 90, "Science": 80, "History": 70}};
export const bobStudent: Student = {name: "Bob", grades: {"Math": 100, "Science": 100, "History": 100}};
export const charlieStudent: Student = {name: "Charlie", grades: {"Math": 50, "Science": 60, "History": 70}};
export const davidStudent: Student = {name: "David", grades: {"Math": 70, "Science": 80, "History": 90}};
export const eveStudent: Student = {name: "Eve", grades: {"Math": 80, "Science": 70, "History": 60}};

export function studentAverage(student: Student ): number {
    let sum = 0;
    let count = 0;
    for (const grade of Object.values(student.grades)) {
        sum += grade;
        count++;
    }
    return sum / count;
}

export function studentWithBiggestGradeAverage(students: Student[]): Student | null {
    if (students.length === 0) {
        return null;
    }

    let maxAverage = studentAverage(students[0]);
    let studentWithMaxAverage = students[0];
    for (let i = 1; i < students.length; i++) {
        const average = studentAverage(students[i]);
        if (average > maxAverage) {
            maxAverage = average;
            studentWithMaxAverage = students[i];
        }
    }

    return studentWithMaxAverage;
}

export function findStudentsWithGradeHigherThan(students: Student[], grade: number): Student[] {
    const studentsWithHigherGrade: Student[] = [];
    for (const student of students) {
        let hasHigherGrade = false;
        for (const studentGrade of Object.values(student.grades)) {
            if (studentGrade > grade) {
                hasHigherGrade = true;
                break;
            }
        }
        if (hasHigherGrade) {
            studentsWithHigherGrade.push(student);
        }
    }

    return studentsWithHigherGrade;
}
