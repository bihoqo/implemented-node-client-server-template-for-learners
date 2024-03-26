import {
    aliceStudent,
    bobStudent,
    charlieStudent,
    davidStudent,
    eveStudent, findStudentsWithGradeHigherThan,
    studentAverage, studentWithBiggestGradeAverage
} from "./functions/ex1-students";

async function main(): Promise<void> {
    const res1_1 = studentAverage(aliceStudent);
    const res1_2 = studentAverage(bobStudent);
    const res1_3 = studentAverage(charlieStudent);
    const res1_4 = studentAverage(davidStudent);
    const res1_5 = studentAverage(eveStudent);

    console.log("studentAverage results:");
    console.log("1: ", res1_1);
    console.log("2: ", res1_2);
    console.log("3: ", res1_3);
    console.log("4: ", res1_4);
    console.log("5: ", res1_5);

    const res2_1 = studentWithBiggestGradeAverage([aliceStudent, bobStudent, charlieStudent, davidStudent, eveStudent]);
    const res2_2 = studentWithBiggestGradeAverage([aliceStudent, charlieStudent]);
    const res2_3 = studentWithBiggestGradeAverage([davidStudent]);
    const res2_4 = studentWithBiggestGradeAverage([]);

    console.log("studentWithBiggestGradeAverage results:");
    console.log("1: ", res2_1);
    console.log("2: ", res2_2);
    console.log("3: ", res2_3);
    console.log("4: ", res2_4);

    const res3_1 = findStudentsWithGradeHigherThan([aliceStudent, bobStudent, charlieStudent, davidStudent, eveStudent], 85);

    console.log("findStudentsWithGradeHigherThan results:");
    console.log("1: ", res3_1);
}

main();
