import { calculateTotal, calculateAverage, getGrade, getStatus } from './studentUtils.js';

const studentsDB = [
  { name: "Abdullah", rollNumber: "BSCS-010", department: "Computer Science", semester: 6, assignment: 18, midterm: 25, finalExam: 42 },
  { name: "Ali", rollNumber: "BSCS-011", department: "Computer Science", semester: 6, assignment: 15, midterm: 20, finalExam: 35 },
  { name: "Sara", rollNumber: "BSCS-012", department: "Computer Science", semester: 6, assignment: 10, midterm: 15, finalExam: 20 },
  { name: "Zainab", rollNumber: "BSCS-013", department: "Computer Science", semester: 6, assignment: 19, midterm: 28, finalExam: 45 },
  { name: "Umer", rollNumber: "BSCS-014", department: "Computer Science", semester: 6, assignment: 12, midterm: 10, finalExam: 15 }
];

function findStudent(rollNumber) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const student = studentsDB.find(s => s.rollNumber === rollNumber);
      if (student) resolve(student);
      else reject("Student not found in the database.");
    }, 1000);
  });
}

function calculateResult(student) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const total = calculateTotal(student.assignment, student.midterm, student.finalExam);
      const average = calculateAverage(total, 3);
      const grade = getGrade(total);
      const status = getStatus(total);
      resolve({ ...student, total, average, grade, status });
    }, 1000);
  });
}

const partAOutput = document.getElementById("partAOutput");
partAOutput.innerHTML = "<span class='text-warning fw-bold'>Searching...</span>";

findStudent("BSCS-010")
  .then(student => calculateResult(student))
  .then(result => {
    partAOutput.innerHTML = `<span class="text-success fw-bold">Found:</span> ${result.name} (${result.rollNumber}) | Total: ${result.total} | Grade: ${result.grade}`;
  })
  .catch(error => {
    partAOutput.innerHTML = `<span class="text-danger fw-bold">${error}</span>`;
  })
  .finally(() => {
    partAOutput.innerHTML += `<br><small class="text-muted">Promise chain execution completed.</small>`;
  });

async function showResult(rollNumber) {
  const output = document.getElementById("searchOutput");
  output.innerHTML = "<span class='text-warning fw-bold'>Searching...</span>";

  try {
    const student = await findStudent(rollNumber);
    const result = await calculateResult(student);
    
    const badgeClass = result.status === "Pass" ? "bg-success" : "bg-danger";
    
    output.innerHTML = `
      <div class="card p-3 shadow-sm border-0 mt-2" style="width: 20rem; background-color: #f8f9fa;">
        <div class="card-body">
          <h5 class="card-title text-dark">${result.name} <small class="text-muted">(${result.rollNumber})</small></h5>
          <p class="card-text mb-1"><strong>Total Marks:</strong> ${result.total}</p>
          <p class="card-text mb-1"><strong>Average:</strong> ${result.average}</p>
          <p class="card-text mb-1"><strong>Grade:</strong> ${result.grade}</p>
          <p class="card-text mb-0"><strong>Status:</strong> <span class="badge ${badgeClass}">${result.status}</span></p>
        </div>
      </div>
    `;
  } catch (error) {
    output.innerHTML = `<div class="alert alert-danger mt-2">${error}</div>`;
  } finally {
    output.innerHTML += `<small class="text-muted d-block mt-2">Search finished.</small>`;
  }
}

document.getElementById("searchBtn").addEventListener("click", () => {
  const rollInput = document.getElementById("rollInput").value.trim();
  if (rollInput) showResult(rollInput);
});

async function loadAllResults() {
  const allOutput = document.getElementById("allResultsOutput");
  const summaryOutput = document.getElementById("summaryOutput");
  
  allOutput.innerHTML = "<span class='text-warning fw-bold'>Processing all results concurrently...</span>";
  summaryOutput.innerHTML = "";

  try {
    const resultPromises = studentsDB.map(student => calculateResult(student));
    const allResults = await Promise.all(resultPromises);

    let passedCount = 0;
    let failedCount = 0;
    let cardsHTML = `<div class="d-flex flex-wrap gap-3 mt-3">`;

    allResults.forEach(result => {
      if (result.status === "Pass") passedCount++;
      else failedCount++;

      const badgeClass = result.status === "Pass" ? "bg-success" : "bg-danger";
      cardsHTML += `
        <div class="card p-3 shadow-sm border-0" style="width: 15rem; background-color: #f8f9fa;">
          <div class="card-body">
            <h6 class="card-title text-dark">${result.name}</h6>
            <p class="card-text small text-muted mb-2">${result.rollNumber}</p>
            <p class="card-text mb-1">Total: <strong>${result.total}</strong></p>
            <span class="badge ${badgeClass}">${result.status}</span>
          </div>
        </div>
      `;
    });
    cardsHTML += `</div>`;

    summaryOutput.innerHTML = `
      <div class="alert alert-info mt-3 mb-0">
        <strong>Summary:</strong> Total Students: ${allResults.length} | Passed: ${passedCount} | Failed: ${failedCount}
      </div>
    `;
    
    allOutput.innerHTML = cardsHTML;

  } catch (error) {
    allOutput.innerHTML = `<div class="alert alert-danger">Failed to load results.</div>`;
  }
}

document.getElementById("loadAllBtn").addEventListener("click", loadAllResults);