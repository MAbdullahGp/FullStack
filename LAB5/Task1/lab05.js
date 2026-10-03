const coreCourses = ["Web Development", "Database Systems", "Data Structures"];
const electiveCourses = ["Artificial Intelligence", "Computer Networks", "Cloud Computing"];

const student = {
  name: "Ali",
  rollNumber: "BSCS-001",
  department: "Computer Science",
  semester: 6
};

const cgpas = [2.8, 3.1, 3.75, 3.4, 2.9];

const allCourses = [...coreCourses, ...electiveCourses];
const allCoursesCopy = [...allCourses];
allCoursesCopy.push("Software Engineering");

const updatedStudent = {
  ...student,
  semester: 7,
  cgpa: 3.45
};

function enrollStudent(name, ...courses) {
  return `${name} enrolled in ${courses.length} course(s): ${courses.join(", ")}`;
}

const calculateAverageCGPA = (...cgpasList) => {
  let total = 0;
  for (const cgpa of cgpasList) {
    total += cgpa;
  }
  return (total / cgpasList.length).toFixed(2);
};

const highestCGPA = Math.max(...cgpas);

function getStudentInfo(name, department = "Computer Science") {
  return `Department (default): ${department}`;
}

const task1HTML = `
  <p><strong>Core Courses:</strong> ${coreCourses.join(", ")}</p>
  <p><strong>Elective Courses:</strong> ${electiveCourses.join(", ")}</p>
  <br>
  <p><strong>All Courses (${allCourses.length}):</strong> ${allCourses.join(", ")}</p>
  <p><strong>Copy after adding a course (${allCoursesCopy.length}):</strong> ${allCoursesCopy.join(", ")}<br>
  <em>Original still has ${allCourses.length} courses</em></p>
  <br>
  <p><strong>Original Student:</strong> ${student.name}, Semester ${student.semester}</p>
  <p><strong>Updated Student:</strong> ${updatedStudent.name}, Semester ${updatedStudent.semester}, CGPA ${updatedStudent.cgpa}</p>
  <br>
  <p>${enrollStudent(updatedStudent.name, "Web Development", "Database Systems", "Artificial Intelligence")}</p>
  <br>
  <p><strong>Average CGPA:</strong> ${calculateAverageCGPA(...cgpas)}</p>
  <p><strong>Highest CGPA:</strong> ${highestCGPA}</p>
  <p>${getStudentInfo(updatedStudent.name)}</p>
`;

document.getElementById("task1Output").innerHTML = task1HTML;