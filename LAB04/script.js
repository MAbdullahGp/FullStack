



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