
const task1Students = [
    { name: "Ali", rollNumber: "BSCS-001", department: "Computer Science", semester: 6, cgpa: 3.45 },
    { name: "Ahmed", rollNumber: "BSCS-002", department: "Computer Science", semester: 5, cgpa: 2.80 },
    { name: "Sara", rollNumber: "BSCS-003", department: "Software Engineering", semester: 6, cgpa: 3.90 },
    { name: "Ayesha", rollNumber: "BSCS-004", department: "Data Science", semester: 4, cgpa: 1.85 },
    { name: "Hamza", rollNumber: "BSCS-005", department: "Cyber Security", semester: 5, cgpa: 2.30 },
    { name: "Zainab", rollNumber: "BSCS-006", department: "Artificial Intelligence", semester: 3, cgpa: 3.10 }
];

function getAcademicStatus(cgpa) {
    if (cgpa >= 3.00) {
        return "Excellent";
    } else if (cgpa >= 2.50) {
        return "Good";
    } else if (cgpa >= 2.00) {
        return "Satisfactory";
    } else {
        return "Academic Warning";
    }
}

const checkEligibility = cgpa => (cgpa >= 2.00 ? "Eligible" : "Academic Warning");

let task1OutputHtml = "";

task1Students.forEach(student => {
    const { name, rollNumber, department, semester, cgpa } = student;

    const status = getAcademicStatus(cgpa);
    const eligibility = checkEligibility(cgpa);

    task1OutputHtml += `
        <div class="border rounded p-3 mb-3 bg-light">
            <h5 class="text-primary">${name}</h5>
            <p class="mb-0">
                <strong>Roll No:</strong> ${rollNumber}<br>
                <strong>Department:</strong> ${department}<br>
                <strong>Semester:</strong> ${semester}<br>
                <strong>CGPA:</strong> ${cgpa.toFixed(2)}<br>
                <strong>Status:</strong> ${status}<br>
                <strong>Eligibility:</strong> ${eligibility}
            </p>
        </div>
    `;
});

document.getElementById("task1Output").innerHTML = task1OutputHtml;


//task2 code starts here 

let task2Courses = [
    "Web Development",
    "Database Systems",
    "Artificial Intelligence",
    "Computer Networks",
    "Software Engineering",
    "Data Structures"
];


task2Courses.push("Cloud Computing"); 
task2Courses.pop();                   


let isAIAvailable = task2Courses.includes("Artificial Intelligence");

function countRegisteredCourses(courses) {
    return courses.length;
}

const getStudyStatus = total => (total >= 4 ? "Full-Time" : "Part-Time");


let forOfCourses = [];
for (let course of task2Courses) {
    forOfCourses.push(course);
}


let courseListItems = "<ol class='mb-3'>";
task2Courses.forEach(course => {
    courseListItems += `<li>${course}</li>`;
});
courseListItems += "</ol>";

let totalCoursesCount = countRegisteredCourses(task2Courses);
let studentStudyStatus = getStudyStatus(totalCoursesCount);

document.getElementById("task2Output").innerHTML = `
    <h5>Available Courses</h5>
    ${courseListItems}
    <p class="mb-1"><strong>Total Registered Courses:</strong> ${totalCoursesCount}</p>
    <p class="mb-1"><strong>Artificial Intelligence Available:</strong> ${isAIAvailable ? "Yes" : "No"}</p>
    <p class="mb-0"><strong>Student Status:</strong> ${studentStudyStatus}</p>
`;

const task3Students = [
    { name: "Sara", rollNumber: "BSCS-023", assignment: 18, midterm: 22, finalExam: 42 },
    { name: "Bilal", rollNumber: "BSCS-011", assignment: 10, midterm: 12, finalExam: 20 },
    { name: "Fatima", rollNumber: "BSCS-045", assignment: 20, midterm: 24, finalExam: 48 },
    { name: "Usman", rollNumber: "BSCS-019", assignment: 15, midterm: 18, finalExam: 32 },
    { name: "Hassan", rollNumber: "BSCS-033", assignment: 8, midterm: 10, finalExam: 15 }
];

function calculateExamTotal(assignment, midterm, finalExam) {
    return assignment + midterm + finalExam;
}


const calculateExamAverage = total => total / 3;


function determineExamGrade(total) {
    if (total >= 80) return "A";
    if (total >= 70) return "B";
    if (total >= 60) return "C";
    if (total >= 50) return "D";
    return "F";
}

let task3OutputHtml = "";

task3Students.forEach(student => {
const { name, rollNumber, assignment, midterm, finalExam } = student;

    const total = calculateExamTotal(assignment, midterm, finalExam);
    const average = calculateExamAverage(total);
    const grade = determineExamGrade(total);


    const status = total >= 50 ? "Passed" : "Failed";

    task3OutputHtml += `
        <div class="border rounded p-3 mb-2 bg-light">
            <h6 class="text-dark fw-bold mb-1">Student: ${name} (${rollNumber})</h6>
            <div class="small">
                Assignment: ${assignment} | Midterm: ${midterm} | Final Exam: ${finalExam}<br>
                <strong>Total:</strong> ${total} | 
                <strong>Average:</strong> ${average.toFixed(2)} | 
                <strong>Grade:</strong> ${grade} | 
                <strong>Status:</strong> ${status}
            </div>
        </div>
    `;
});

document.getElementById("task3Output").innerHTML = task3OutputHtml;


let task3PassedCount = 0;
let task3FailedCount = 0;

for (let i = 0; i < task3Students.length; i++) {
    const total = calculateExamTotal(
        task3Students[i].assignment,
        task3Students[i].midterm,
        task3Students[i].finalExam
    );

    if (total >= 50) {
        task3PassedCount++;
    } else {
        task3FailedCount++;
    }
}

document.getElementById("task3Stats").innerHTML = `
    <strong>Total Students:</strong> ${task3Students.length} &nbsp;|&nbsp; 
    <strong>Passed Students:</strong> ${task3PassedCount} &nbsp;|&nbsp; 
    <strong>Failed Students:</strong> ${task3FailedCount}
`;



class Task4Student {
    constructor(name, rollNumber, department, semester, cgpa, marks) {
        this.name = name;
        this.rollNumber = rollNumber;
        this.department = department;
        this.semester = semester;
        this.cgpa = cgpa;
        this.marks = marks;
    }
}

const task4Students = [
    new Task4Student("Ali", "BSCS-001", "Computer Science", 6, 3.45, 82),
    new Task4Student("Ahmed", "BSCS-002", "Computer Science", 5, 2.80, 67),
    new Task4Student("Sara", "BSCS-003", "Software Engineering", 6, 3.90, 91),
    new Task4Student("Ayesha", "BSCS-004", "Data Science", 4, 1.85, 48),
    new Task4Student("Hamza", "BSCS-005", "Cyber Security", 5, 2.30, 58),
    new Task4Student("Zainab", "BSCS-006", "Artificial Intelligence", 3, 3.10, 74)
];

function calculateDashboardGrade(marks) {
    if (marks >= 80) return "A";
    if (marks >= 70) return "B";
    if (marks >= 60) return "C";
    if (marks >= 50) return "D";
    return "F";
}

const getDashboardStatus = cgpa => (cgpa >= 2.0 ? "Eligible" : "Academic Warning");

let studentProperties = [];
for (let key in task4Students[0]) {
    studentProperties.push(key);
}
document.getElementById("task4Inspector").innerHTML = 
    `<strong>Object Properties (via for...in):</strong> ${studentProperties.join(", ")}`;

let uniqueDepartments = [];
task4Students.forEach(student => {
    if (!uniqueDepartments.includes(student.department)) {
        uniqueDepartments.push(student.department);
    }
});

let task4CardsHtml = "";

task4Students.forEach(student => {
    const { name, rollNumber, department, semester, cgpa, marks } = student;
    const grade = calculateDashboardGrade(marks);
    const status = getDashboardStatus(cgpa);

    task4CardsHtml += `
        <div class="border rounded p-3 mb-3 bg-light">
            <h5 class="mb-1 text-primary">Student: ${name}</h5>
            <p class="mb-0">
                <strong>Roll No:</strong> ${rollNumber}<br>
                <strong>Department:</strong> ${department}<br>
                <strong>Semester:</strong> ${semester}<br>
                <strong>CGPA:</strong> ${cgpa.toFixed(2)}<br>
                <strong>Marks:</strong> ${marks}<br>
                <strong>Grade:</strong> ${grade}<br>
                <strong>Status:</strong> ${status}
            </p>
        </div>
    `;
});

document.getElementById("task4Output").innerHTML = task4CardsHtml;

let task4Passed = 0;
let task4Failed = 0;

for (let student of task4Students) {
    if (student.marks >= 50) {
        task4Passed++;
    } else {
        task4Failed++;
    }
}

document.getElementById("task4Stats").innerHTML = `
    <strong>Total Students:</strong> ${task4Students.length} &nbsp;|&nbsp; 
    <strong>Passed Students:</strong> ${task4Passed} &nbsp;|&nbsp; 
    <strong>Failed Students:</strong> ${task4Failed}
`;