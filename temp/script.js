



// JavaScript statement
let message = "JavaScript is working correctly";
// Display result on webpage
document.getElementById("syntaxOutput").textContent =
    message;

var studentName = "Ali";
let semester = 5;
const university = "Air University";


// Display variables
document.getElementById("variableOutput").innerHTML =
    "Student Name: " + studentName +
    "<br>Semester: " + semester +
    "<br>University: " + university;

/* =========================================
   3. HOISTING
========================================= */

// var is hoisted
console.log(hoistedVariable);

var hoistedVariable = "var is hoisted";


/*
   let is also hoisted internally,
   but it cannot be accessed before
   its declaration.

   The following code would produce
   a ReferenceError:

   console.log(letVariable);
   let letVariable = 10;
*/


document.getElementById("hoistingOutput").innerHTML =
    "Using var: <strong>" +
    hoistedVariable +
    "</strong>" +
    "<br><br>" +
    "The declaration of var is hoisted, " +
    "so it can be referenced before its declaration." +
    "<br><br>" +
    "let and const cannot be accessed before " +
    "their declaration.";


/* =========================================
   4. JAVASCRIPT OBJECT
========================================= */

// Create a student object

let student = {
    name: "Ahmed",
    age: 21,
    semester: 5,
    cgpa: 3.45,
    program: "BS Computer Science"
};
// Access object properties
document.getElementById("objectOutput").innerHTML =
    "Name: " + student.name +
    "<br>Age: " + student.age +
    "<br>Semester: " + student.semester +
    "<br>CGPA: " + student.cgpa +
    "<br>Program: " + student.program;

/* =========================================
   5. OPERATORS
========================================= */

// Variables

let a = 10;
let b = 3;


// Arithmetic operators

let addition = a + b;
let subtraction = a - b;
let multiplication = a * b;
let division = a / b;
let remainder = a % b;


// Comparison operators

let greater = a > b;
let equal = a === b;


// Logical operators

let logicalAnd = (a > 5 && b < 5);
let logicalOr = (a > 20 || b < 5);


document.getElementById("operatorOutput").innerHTML =

    "<strong>Arithmetic Operators</strong>" +

    "<br>" +
    a + " + " + b + " = " + addition +

    "<br>" +
    a + " - " + b + " = " + subtraction +

    "<br>" +
    a + " × " + b + " = " + multiplication +

    "<br>" +
    a + " / " + b + " = " + division +

    "<br>" +
    a + " % " + b + " = " + remainder +

    "<br><br>" +

    "<strong>Comparison Operators</strong>" +

    "<br>" +
    a + " > " + b + " = " + greater +

    "<br>" +
    a + " === " + b + " = " + equal +

    "<br><br>" +

    "<strong>Logical Operators</strong>" +

    "<br>" +
    "(a > 5 && b < 5) = " + logicalAnd +

    "<br>" +
    "(a > 20 || b < 5) = " + logicalOr;


/* =========================================
   6. CONDITIONS
========================================= */

let marks = 78;

let grade;
let status;


// if / else if / else

if (marks >= 80) {

    grade = "A";

}
else if (marks >= 70) {

    grade = "B";

}
else if (marks >= 60) {

    grade = "C";

}
else if (marks >= 50) {

    grade = "D";

}
else {

    grade = "F";

}


// Determine pass/fail

if (marks >= 50) {

    status = "Passed";

}
else {

    status = "Failed";

}


// Display result

document.getElementById("conditionOutput").innerHTML =

    "Student Marks: " + marks +
    "<br>Grade: " + grade +
    "<br>Status: " + status;


/* =========================================
   7. COMBINED STUDENT RESULT
========================================= */

// Student object

let resultStudent = {

    name: "Sara",
    assignment: 18,
    midterm: 22,
    finalExam: 42

};


// Calculate total using arithmetic operator

let total =
    resultStudent.assignment +
    resultStudent.midterm +
    resultStudent.finalExam;


// Determine grade using conditions

let resultGrade;

if (total >= 80) {

    resultGrade = "A";

}
else if (total >= 70) {

    resultGrade = "B";

}
else if (total >= 60) {

    resultGrade = "C";

}
else if (total >= 50) {

    resultGrade = "D";

}
else {

    resultGrade = "F";

}


// Display complete result

document.getElementById("resultOutput").innerHTML =

    "Student: " + resultStudent.name +

    "<br>Assignment: " +
    resultStudent.assignment +

    "<br>Midterm: " +
    resultStudent.midterm +

    "<br>Final Exam: " +
    resultStudent.finalExam +

    "<br><strong>Total Marks: " +
    total +
    "</strong>" +

    "<br><strong>Grade: " +
    resultGrade +
    "</strong>";



/* =====================================================
   LAB 04
   1. ARRAYS
===================================================== */

let lab04Students = [
    "Ali",
    "Ahmed",
    "Sara",
    "Ayesha"
];

document.getElementById("arrayOutput").innerHTML =

    "Students: " +
    lab04Students.join(", ") +

    "<br><br>" +

    "First Student: " +
    lab04Students[0] +

    "<br>" +

    "Second Student: " +
    lab04Students[1] +

    "<br>" +

    "Total Students: " +
    lab04Students.length;




   /* =====================================================
   2. ARRAY METHODS
===================================================== */

let lab04Courses = [
    "Web Development",
    "Database Systems",
    "Artificial Intelligence"
];


// Add an item
lab04Courses.push("Computer Vision");


// Check whether an item exists
let lab04HasAI =
    lab04Courses.includes(
        "Artificial Intelligence"
    );


// Display result
document.getElementById(
    "arrayMethodsOutput"
).innerHTML =

    "Courses: " +
    lab04Courses.join(", ") +

    "<br><br>" +

    "Total Courses: " +
    lab04Courses.length +

    "<br><br>" +

    "Artificial Intelligence exists: " +
    lab04HasAI;

/* =====================================================
   3. FOR LOOP
===================================================== */

let lab04ForLoopResult = "";

for (
    let i = 0;
    i < lab04Students.length;
    i++
) {

    lab04ForLoopResult +=

        "Student " +
        (i + 1) +
        ": " +
        lab04Students[i] +
        "<br>";
}


document.getElementById(
    "forLoopOutput"
).innerHTML =
    lab04ForLoopResult;


/* =====================================================
   4. FOR...OF LOOP
===================================================== */

let lab04ForOfResult = "";

for (
    let lab04Student of lab04Students
) {

    lab04ForOfResult +=
        lab04Student +
        "<br>";
}


document.getElementById(
    "forOfOutput"
).innerHTML =
    lab04ForOfResult;



/* =====================================================
   5. FOR...IN LOOP
===================================================== */

let lab04StudentInfo = {

    name: "Ahmed",
    age: 21,
    department: "Computer Science",
    semester: 6

};


let lab04ForInResult = "";


for (
    let lab04Key in lab04StudentInfo
) {

    lab04ForInResult +=

        lab04Key +
        ": " +
        lab04StudentInfo[lab04Key] +
        "<br>";
}


document.getElementById(
    "forInOutput"
).innerHTML =
    lab04ForInResult;





/* =====================================================
   6. FOREACH
===================================================== */

let lab04ForEachResult = "";


lab04Students.forEach(
    function(student, index) {

        lab04ForEachResult +=

            (index + 1) +
            ". " +
            student +
            "<br>";

    }
);


document.getElementById(
    "forEachOutput"
).innerHTML =
    lab04ForEachResult;



/* =====================================================
   7. FUNCTIONS
===================================================== */

function lab04CalculateTotal(
    assignment,
    midterm,
    finalExam
) {

    let total =
        assignment +
        midterm +
        finalExam;

    return total;
}


let lab04StudentTotal =
    lab04CalculateTotal(
        18,
        22,
        42
    );


document.getElementById(
    "functionOutput"
).innerHTML =

    "Assignment Marks: 18" +

    "<br>" +

    "Midterm Marks: 22" +

    "<br>" +

    "Final Exam Marks: 42" +

    "<br><br>" +

    "<strong>Total Marks: " +
    lab04StudentTotal +
    "</strong>";



/* =====================================================
   8. ARROW FUNCTIONS
===================================================== */

const lab04CalculateAverage =
    (mark1, mark2, mark3) => {

        return (
            mark1 +
            mark2 +
            mark3
        ) / 3;

    };


let lab04Average =
    lab04CalculateAverage(
        18,
        22,
        42
    );


document.getElementById(
    "arrowOutput"
).innerHTML =

    "Marks: 18, 22, 42" +

    "<br>" +

    "Average: " +

    lab04Average.toFixed(2);




/* =====================================================
   9. ES6 CLASS
===================================================== */

class Lab04Student {

    constructor(
        name,
        semester,
        cgpa
    ) {

        this.name = name;
        this.semester = semester;
        this.cgpa = cgpa;

    }


    getStatus() {

        if (this.cgpa >= 2.0) {

            return "Active";

        }
        else {

            return "Academic Warning";

        }

    }

}


let lab04StudentRecord =
    new Lab04Student(
        "Ahmed",
        6,
        3.45
    );


document.getElementById(
    "classOutput"
).innerHTML =

    "Name: " +
    lab04StudentRecord.name +

    "<br>" +

    "Semester: " +
    lab04StudentRecord.semester +

    "<br>" +

    "CGPA: " +
    lab04StudentRecord.cgpa +

    "<br>" +

    "Status: " +
    lab04StudentRecord.getStatus();

/* =====================================================
   10. OBJECT DESTRUCTURING
===================================================== */

const lab04StudentData = {

    name: "Sara",
    semester: 6,
    cgpa: 3.75

};


const {
    name: lab04Name,
    semester: lab04Semester,
    cgpa: lab04CGPA
} = lab04StudentData;


document.getElementById(
    "destructuringOutput"
).innerHTML =

    "Name: " +
    lab04Name +

    "<br>" +

    "Semester: " +
    lab04Semester +

    "<br>" +

    "CGPA: " +
    lab04CGPA;




/* =====================================================
   11. TERNARY OPERATOR
===================================================== */

const lab04Marks = 78;


const lab04Status =
    lab04Marks >= 50
        ? "Passed"
        : "Failed";


document.getElementById(
    "ternaryOutput"
).innerHTML =

    "Marks: " +
    lab04Marks +

    "<br>" +

    "Status: " +
    lab04Status;



/* =====================================================
   12. MAP(), FILTER() AND FIND()
===================================================== */

const lab04MarksList = [
    45,
    55,
    72,
    81,
    38
];

const lab04UpdatedMarks =
    lab04MarksList.map(
        mark => mark + 5
    );

const lab04PassedMarks =
    lab04MarksList.filter(
        mark => mark >= 50
    );

const lab04FirstHighMark =
    lab04MarksList.find(
        mark => mark >= 70
    );


document.getElementById(
    "advancedArrayOutput"
).innerHTML =

    "Original Marks: " +
    lab04MarksList.join(", ") +

    "<br><br>" +

    "After map() (+5): " +
    lab04UpdatedMarks.join(", ") +

    "<br><br>" +

    "Passed Marks using filter(): " +
    lab04PassedMarks.join(", ") +

    "<br><br>" +

    "First Mark >= 70 using find(): " +
    lab04FirstHighMark;



/* =====================================================
   12. FINAL STUDENT PERFORMANCE DASHBOARD
===================================================== */

const lab04StudentRecords = [

    {
        name: "Ali",
        semester: 6,
        marks: 82
    },

    {
        name: "Ahmed",
        semester: 5,
        marks: 67
    },

    {
        name: "Sara",
        semester: 6,
        marks: 91
    },

    {
        name: "Ayesha",
        semester: 4,
        marks: 48
    }

];


/* =====================================================
   GRADE CALCULATION FUNCTION
===================================================== */

function lab04CalculateGrade(marks) {

    if (marks >= 80) {

        return "A";

    }
    else if (marks >= 70) {

        return "B";

    }
    else if (marks >= 60) {

        return "C";

    }
    else if (marks >= 50) {

        return "D";

    }
    else {

        return "F";

    }

}

/* =====================================================
   STATUS USING ARROW FUNCTION + TERNARY
===================================================== */

const lab04GetStatus =
    marks =>
        marks >= 50
            ? "Passed"
            : "Failed";





/* =====================================================
   CREATE DASHBOARD
===================================================== */

let lab04DashboardOutput = "";

lab04StudentRecords.forEach(
    student => {

        const {
            name: lab04Name,
            semester: lab04Semester,
            marks: lab04StudentMarks
        } = student;


        const lab04Grade =
            lab04CalculateGrade(
                lab04StudentMarks
            );


        const lab04StudentStatus =
            lab04GetStatus(
                lab04StudentMarks
            );


        lab04DashboardOutput +=

            "<div class='border rounded p-3 mb-3'>" +

                "<h5>" +
                    lab04Name +
                "</h5>" +

                "<p>" +

                    "<strong>Semester:</strong> " +
                    lab04Semester +

                    "<br>" +

                    "<strong>Marks:</strong> " +
                    lab04StudentMarks +

                    "<br>" +

                    "<strong>Grade:</strong> " +
                    lab04Grade +

                    "<br>" +

                    "<strong>Status:</strong> " +
                    lab04StudentStatus +

                "</p>" +

            "</div>";

    }
);



/* =====================================================
   DISPLAY DASHBOARD
===================================================== */

document.getElementById(
    "studentDashboardOutput"
).innerHTML =
    lab04DashboardOutput;


// code starts here 


// 1. Array of at least 6 student objects
const task1Students = [
    { name: "Ali", rollNumber: "BSCS-001", department: "Computer Science", semester: 6, cgpa: 3.45 },
    { name: "Ahmed", rollNumber: "BSCS-002", department: "Computer Science", semester: 5, cgpa: 2.80 },
    { name: "Sara", rollNumber: "BSCS-003", department: "Software Engineering", semester: 6, cgpa: 3.90 },
    { name: "Ayesha", rollNumber: "BSCS-004", department: "Data Science", semester: 4, cgpa: 1.85 },
    { name: "Hamza", rollNumber: "BSCS-005", department: "Cyber Security", semester: 5, cgpa: 2.30 },
    { name: "Zainab", rollNumber: "BSCS-006", department: "Artificial Intelligence", semester: 3, cgpa: 3.10 }
];

// 2. Function to determine academic status
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

// 3. Arrow function + Ternary operator for next semester eligibility
const checkEligibility = cgpa => (cgpa >= 2.00 ? "Eligible" : "Academic Warning");

// 4. forEach() + Object Destructuring + DOM Display
let task1OutputHtml = "";

task1Students.forEach(student => {
    // Destructuring object properties
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


// task one code ends here 



//task two code starts here 

/* =====================================================
   LAB 04 — TASK 2: Course Registration System
===================================================== */

// 1. Initial array of courses
let task2Courses = [
    "Web Development",
    "Database Systems",
    "Artificial Intelligence",
    "Computer Networks",
    "Software Engineering",
    "Data Structures"
];

// 2. Array manipulations: push() and pop()
task2Courses.push("Cloud Computing"); // Adds a course
task2Courses.pop();                   // Removes the last added course

// 3. Check course availability using includes()
let isAIAvailable = task2Courses.includes("Artificial Intelligence");

// 4. Function to calculate total registered courses
function countRegisteredCourses(courses) {
    return courses.length;
}

// 5. Arrow function + Ternary operator for Full-Time / Part-Time status
const getStudyStatus = total => (total >= 4 ? "Full-Time" : "Part-Time");

// 6. Demonstrate for...of loop
let forOfCourses = [];
for (let course of task2Courses) {
    forOfCourses.push(course);
}

// 7. Demonstrate forEach() to construct the HTML list
let courseListItems = "<ol class='mb-3'>";
task2Courses.forEach(course => {
    courseListItems += `<li>${course}</li>`;
});
courseListItems += "</ol>";

// 8. Calculations and DOM display
let totalCoursesCount = countRegisteredCourses(task2Courses);
let studentStudyStatus = getStudyStatus(totalCoursesCount);

document.getElementById("task2Output").innerHTML = `
    <h5>Available Courses</h5>
    ${courseListItems}
    <p class="mb-1"><strong>Total Registered Courses:</strong> ${totalCoursesCount}</p>
    <p class="mb-1"><strong>Artificial Intelligence Available:</strong> ${isAIAvailable ? "Yes" : "No"}</p>
    <p class="mb-0"><strong>Student Status:</strong> ${studentStudyStatus}</p>
`;

// task 3 code starts here 
/* =====================================================
   LAB 04 — TASK 3: Exam and Result Processing System
===================================================== */

// 1. Array of at least 5 student records with marks
const task3Students = [
    { name: "Sara", rollNumber: "BSCS-023", assignment: 18, midterm: 22, finalExam: 42 },
    { name: "Bilal", rollNumber: "BSCS-011", assignment: 10, midterm: 12, finalExam: 20 },
    { name: "Fatima", rollNumber: "BSCS-045", assignment: 20, midterm: 24, finalExam: 48 },
    { name: "Usman", rollNumber: "BSCS-019", assignment: 15, midterm: 18, finalExam: 32 },
    { name: "Hassan", rollNumber: "BSCS-033", assignment: 8, midterm: 10, finalExam: 15 }
];

// 2. Regular function to calculate total marks
function calculateExamTotal(assignment, midterm, finalExam) {
    return assignment + midterm + finalExam;
}

// 3. Arrow function to calculate average marks
const calculateExamAverage = total => total / 3;

// 4. Regular function to determine grade
function determineExamGrade(total) {
    if (total >= 80) return "A";
    if (total >= 70) return "B";
    if (total >= 60) return "C";
    if (total >= 50) return "D";
    return "F";
}

// 5. forEach() loop with destructuring and ternary operator
let task3OutputHtml = "";

task3Students.forEach(student => {
    // Destructure marks and details
    const { name, rollNumber, assignment, midterm, finalExam } = student;

    const total = calculateExamTotal(assignment, midterm, finalExam);
    const average = calculateExamAverage(total);
    const grade = determineExamGrade(total);

    // Ternary operator for Pass/Fail status
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

// 6. Traditional for loop to calculate pass/fail counts
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



// code starts here 
/* =====================================================
   LAB 04 — TASK 4: Student Performance Dashboard
===================================================== */

// 1. ES6 Class
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

// Instantiate at least 6 student objects
const task4Students = [
    new Task4Student("Ali", "BSCS-001", "Computer Science", 6, 3.45, 82),
    new Task4Student("Ahmed", "BSCS-002", "Computer Science", 5, 2.80, 67),
    new Task4Student("Sara", "BSCS-003", "Software Engineering", 6, 3.90, 91),
    new Task4Student("Ayesha", "BSCS-004", "Data Science", 4, 1.85, 48),
    new Task4Student("Hamza", "BSCS-005", "Cyber Security", 5, 2.30, 58),
    new Task4Student("Zainab", "BSCS-006", "Artificial Intelligence", 3, 3.10, 74)
];

// 2. Function to calculate grade
function calculateDashboardGrade(marks) {
    if (marks >= 80) return "A";
    if (marks >= 70) return "B";
    if (marks >= 60) return "C";
    if (marks >= 50) return "D";
    return "F";
}

// 3. Arrow function + Ternary operator for status
const getDashboardStatus = cgpa => (cgpa >= 2.0 ? "Eligible" : "Academic Warning");

// 4. for...in loop to inspect properties of a student object
let studentProperties = [];
for (let key in task4Students[0]) {
    studentProperties.push(key);
}
document.getElementById("task4Inspector").innerHTML = 
    `<strong>Object Properties (via for...in):</strong> ${studentProperties.join(", ")}`;

// 5. Array method: collect unique departments using includes() and push()
let uniqueDepartments = [];
task4Students.forEach(student => {
    if (!uniqueDepartments.includes(student.department)) {
        uniqueDepartments.push(student.department);
    }
});

// 6. forEach() loop + destructuring to display student cards
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

// 7. for...of loop to compute pass and fail counts
let task4Passed = 0;
let task4Failed = 0;

for (let student of task4Students) {
    if (student.marks >= 50) {
        task4Passed++;
    } else {
        task4Failed++;
    }
}

// Display final statistics
document.getElementById("task4Stats").innerHTML = `
    <strong>Total Students:</strong> ${task4Students.length} &nbsp;|&nbsp; 
    <strong>Passed Students:</strong> ${task4Passed} &nbsp;|&nbsp; 
    <strong>Failed Students:</strong> ${task4Failed}
`;