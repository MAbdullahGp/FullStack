
console.log("=== HOISTING DEMONSTRATION ===");


console.log("Accessing var before declaration:", studentRole); 
var studentRole = "Undergraduate";

try {
    console.log("Accessing let before declaration:", systemStatus);
} catch (error) {
    console.log("Error caught for let variable:", error.message);
}
let systemStatus = "Active";



let studentList = [
    {
        name: "Ali Raza",
        regNo: "2022-CS-101",
        program: "BS Computer Science",
        semester: "4th",
        cgpa: 3.85,
        attendance: 92,
        assignmentMarks: 18, 
        midtermMarks: 27,    
        finalExamMarks: 46   
    },
    {
        name: "Usman Ahmed",
        regNo: "2022-CS-112",
        program: "BS Software Engineering",
        semester: "4th",
        cgpa: 3.10,
        attendance: 82,
        assignmentMarks: 14,
        midtermMarks: 21,
        finalExamMarks: 36
    },
    {
        name: "Sana Malik",
        regNo: "2022-CS-135",
        program: "BS Information Technology",
        semester: "4th",
        cgpa: 3.60,
        attendance: 68,
        assignmentMarks: 17,
        midtermMarks: 25,
        finalExamMarks: 42
    },
    {
        name: "Hamza Khan",
        regNo: "2022-CS-140",
        program: "BS Computer Science",
        semester: "4th",
        cgpa: 1.80, 
        attendance: 52,
        assignmentMarks: 8,
        midtermMarks: 12,
        finalExamMarks: 22
    }
];



function loadStudent(index) {
    let student = studentList[index];

   
    let maxMarks = 20 + 30 + 50; 
    let totalMarks = student.assignmentMarks + student.midtermMarks + student.finalExamMarks;
    let percentage = (totalMarks / maxMarks) * 100;

  
    let grade = "";
    if (percentage >= 80) {
        grade = "A";
    } else if (percentage >= 70 && percentage < 80) {
        grade = "B";
    } else if (percentage >= 60 && percentage < 70) {
        grade = "C";
    } else if (percentage >= 50 && percentage < 60) {
        grade = "D";
    } else {
        grade = "F";
    }

    let passStatus = "";
    if (percentage >= 50) {
        passStatus = "Passed";
    } else {
        passStatus = "Failed";
    }

    let scholarship = "Not Eligible";

    if (student.cgpa >= 3.8 && student.attendance >= 85 && percentage >= 80) {
        scholarship = "Gold Scholarship";
    } else if (student.cgpa >= 3.2 && student.attendance >= 80 && percentage >= 70) {
        scholarship = "Silver Scholarship";
    } else if (student.cgpa >= 3.0 && student.attendance >= 75 && percentage >= 60) {
        scholarship = "Bronze Scholarship";
    } else {
        scholarship = "Not Eligible";
    }

    if (!(scholarship === "Not Eligible")) {
        console.log(student.name + " qualified for a scholarship!");
    }

    let academicStatus = "Good Standing";

    if (student.cgpa < 2.0 || student.attendance < 60 || percentage < 50) {
        academicStatus = "Critical";
    } else if (student.cgpa < 2.5 || student.attendance < 75) {
        academicStatus = "Academic Warning";
    } else {
        academicStatus = "Good Standing";
    }

    let outputContainer = document.getElementById("report-container");
    let badgeStyle = passStatus === "Passed" ? "badge-passed" : "badge-failed";

    outputContainer.innerHTML = `
        <div class="row">
            <!-- Student Information Box -->
            <div class="col-md-6 mb-3">
                <div class="report-box h-100">
                    <h6 class="text-primary fw-bold mb-3">Student Details</h6>
                    <p class="mb-1"><span class="report-label">Name:</span> ${student.name}</p>
                    <p class="mb-1"><span class="report-label">Reg No:</span> ${student.regNo}</p>
                    <p class="mb-1"><span class="report-label">Program:</span> ${student.program}</p>
                    <p class="mb-1"><span class="report-label">Semester:</span> ${student.semester}</p>
                    <p class="mb-1"><span class="report-label">CGPA:</span> ${student.cgpa}</p>
                    <p class="mb-0"><span class="report-label">Attendance:</span> ${student.attendance}%</p>
                </div>
            </div>

            <!-- Assessment Marks Box -->
            <div class="col-md-6 mb-3">
                <div class="report-box h-100">
                    <h6 class="text-primary fw-bold mb-3">Assessment Breakdown</h6>
                    <p class="mb-1"><span class="report-label">Assignment:</span> ${student.assignmentMarks} / 20</p>
                    <p class="mb-1"><span class="report-label">Midterm:</span> ${student.midtermMarks} / 30</p>
                    <p class="mb-1"><span class="report-label">Final Exam:</span> ${student.finalExamMarks} / 50</p>
                    <hr class="my-2">
                    <p class="mb-1"><span class="report-label">Total Marks:</span> ${totalMarks} / ${maxMarks}</p>
                    <p class="mb-0"><span class="report-label">Percentage:</span> ${percentage.toFixed(1)}%</p>
                </div>
            </div>
        </div>

        <!-- Academic Evaluation Summary Box -->
        <div class="report-box text-center mt-2">
            <h6 class="text-primary fw-bold mb-3">Academic Evaluation</h6>
            <div class="row">
                <div class="col-6 col-md-3 mb-2">
                    <span class="d-block text-muted small">Grade</span>
                    <strong class="fs-5">${grade}</strong>
                </div>
                <div class="col-6 col-md-3 mb-2">
                    <span class="d-block text-muted small">Pass / Fail</span>
                    <div><span class="${badgeStyle}">${passStatus}</span></div>
                </div>
                <div class="col-6 col-md-3 mb-2">
                    <span class="d-block text-muted small">Academic Status</span>
                    <strong>${academicStatus}</strong>
                </div>
                <div class="col-6 col-md-3 mb-2">
                    <span class="d-block text-muted small">Scholarship</span>
                    <strong>${scholarship}</strong>
                </div>
            </div>
        </div>
    `;
}
loadStudent(0);