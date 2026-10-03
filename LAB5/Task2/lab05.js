import formatStudentResult, { 
  DEPARTMENT_NAME as deptName, 
  calculateTotal, 
  calculateAverage, 
  getGrade, 
  getStatus 
} from './studentUtils.js';

const students = [
  { name: "Abdullah", rollNumber: "BSCS-010", assignment: 18, midterm: 25, finalExam: 42 },
  { name: "Ali", rollNumber: "BSCS-011", assignment: 15, midterm: 20, finalExam: 35 },
  { name: "Sara", rollNumber: "BSCS-012", assignment: 10, midterm: 15, finalExam: 20 },
  { name: "Zainab", rollNumber: "BSCS-013", assignment: 19, midterm: 28, finalExam: 45 }
];

let task2HTML = `<h4 class="text-primary mb-4">Department: ${deptName}</h4>`;
task2HTML += `<div class="d-flex flex-wrap gap-3">`;

students.forEach(student => {
  const { name, rollNumber, assignment, midterm, finalExam } = student;
  
  const total = calculateTotal(assignment, midterm, finalExam);
  const average = calculateAverage(total, 3);
  const grade = getGrade(total);
  const status = getStatus(total);
  
  const formattedResult = formatStudentResult(name, rollNumber, total);
  const badgeClass = status === "Pass" ? "bg-success" : "bg-danger";

  task2HTML += `
    <div class="card p-3 shadow-sm border-0" style="width: 18rem; background-color: #f8f9fa;">
      <div class="card-body">
        <h5 class="card-title text-dark">${formattedResult}</h5>
        <p class="card-text mb-1"><strong>Average:</strong> ${average}</p>
        <p class="card-text mb-1"><strong>Grade:</strong> ${grade}</p>
        <p class="card-text mb-0">
          <strong>Status:</strong> <span class="badge ${badgeClass}">${status}</span>
        </p>
      </div>
    </div>
  `;
});

task2HTML += `</div>`;

document.getElementById("task2Output").innerHTML = task2HTML;