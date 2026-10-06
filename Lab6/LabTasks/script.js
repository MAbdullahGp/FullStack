/* TASK 1: COURSE PLANNER */
let courses = [];

function addCourse() {
    let input = document.getElementById("courseInput");
    let text = input.value.trim();
    if (text === "") return;
    courses.push({ name: text, completed: false });
    input.value = "";
    renderCourses();
}

function toggleCourse(index) {
    courses[index].completed = !courses[index].completed;
    renderCourses();
}

function deleteCourse(index) {
    courses.splice(index, 1);
    renderCourses();
}

function clearCourses() {
    courses = [];
    renderCourses();
}

function highlightLongest() {
    renderCourses(true);
}

function renderCourses(shouldHighlight = false) {
    let list = document.getElementById("courseList");
    list.innerHTML = "";
    let completedCount = 0;
    let maxLen = 0;

    if (shouldHighlight && courses.length > 0) {
        maxLen = Math.max(...courses.map(c => c.name.length));
    }

    courses.forEach((c, i) => {
        if (c.completed) completedCount++;
        let isLongest = shouldHighlight && c.name.length === maxLen && maxLen > 0;

        let li = document.createElement("li");
        li.className = `list-group-item d-flex justify-content-between align-items-center ${isLongest ? 'longest-course' : ''}`;
        
        let span = document.createElement("span");
        span.innerText = c.name;
        span.style.cursor = "pointer";
        if (c.completed) span.className = "completed-course";
        span.onclick = () => toggleCourse(i);

        let btn = document.createElement("button");
        btn.className = "btn btn-danger btn-sm";
        btn.innerText = "Delete";
        btn.onclick = () => deleteCourse(i);

        li.appendChild(span);
        li.appendChild(btn);
        list.appendChild(li);
    });

    document.getElementById("totalCourses").innerText = courses.length;
    document.getElementById("completedCourses").innerText = completedCount;
}


/* TASK 2: ID CARD GENERATOR */
function updateCard() {
    let name = document.getElementById("cardName").value.trim();
    let roll = document.getElementById("cardRoll").value.trim();
    let dept = document.getElementById("cardDept").value.trim();
    let sem = document.getElementById("cardSem").value.trim();
    let color = document.getElementById("cardBg").value;

    document.getElementById("previewName").innerText = name || "---";
    document.getElementById("previewRoll").innerText = roll || "---";
    document.getElementById("previewDept").innerText = dept || "---";
    document.getElementById("previewSem").innerText = sem || "---";
    document.getElementById("idCard").style.backgroundColor = color;
}


/* TASK 3: REGISTRATION FORM & REALTIME PASSWORD CHECKER */
function checkPasswordStrength() {
    let password = document.getElementById("password").value;
    let strengthText = document.getElementById("passwordStrength");

    if (password.length === 0) {
        strengthText.innerText = "";
        return;
    }

    // Dynamic strength check logic
    let hasLetters = /[a-zA-Z]/.test(password);
    let hasNumbers = /[0-9]/.test(password);
    let hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length >= 8 && hasLetters && hasNumbers && hasSpecial) {
        strengthText.innerText = "Strong";
        strengthText.style.color = "green";
    } else if (password.length >= 6 && ((hasLetters && hasNumbers) || (hasLetters && hasSpecial))) {
        strengthText.innerText = "Medium";
        strengthText.style.color = "orange";
    } else {
        strengthText.innerText = "Weak";
        strengthText.style.color = "red";
    }
}

function checkEmail() {
    let email = document.getElementById("email").value.trim();
    let emailError = document.getElementById("emailError");
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        emailError.innerText = "";
        return;
    }

    if (!emailPattern.test(email)) {
        emailError.innerText = "Invalid Email format";
    } else if (!email.endsWith("@gmail.com")) {
        emailError.innerText = "Only Gmails are allowed";
    } else {
        emailError.innerText = "";
    }
}

function validateForm() {
    let age = document.getElementById("regAge").value;
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let confirmPassword = document.getElementById("confirmPassword").value.trim();
    let error = document.getElementById("error");

    error.innerText = "";
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (age === "" || email === "" || password === "" || confirmPassword === "") {
        error.innerText = "Please fill out all fields";
        return false;
    }

    if (age < 17 || age > 60) {
        error.innerText = "Age must be between 17 and 60";
        return false;
    }

    if (!emailPattern.test(email)) {
        error.innerText = "Please Enter a valid email address";
        return false;
    }

    if (!email.endsWith("@gmail.com")) {
        error.innerText = "Only Gmail addresses are allowed";
        return false;
    }

    if (!/\d/.test(password)) {
        error.innerText = "Password must contain at least one number";
        return false;
    }

    if (password !== confirmPassword) {
        error.innerText = "Password do not match";
        return false;
    }

    showPopupMessage("Form Submitted Successfully!!");
    return false;
}

function confirmReset() {
    let confirmChoice = confirm("Are you sure you want to clear the form?");
    if (confirmChoice) {
        document.getElementById("emailError").innerText = "";
        document.getElementById("passwordStrength").innerText = "";
        document.getElementById("error").innerText = "";
    }
    return confirmChoice;
}

function showPopupMessage(message) {
    const popup = document.getElementById("popupMessage");
    popup.innerText = message;
    popup.style.display = "block";

    setTimeout(() => {
        popup.style.display = "none";
    }, 2500);
}


/* TASK 4: STUDENT MANAGEMENT DASHBOARD */
let students = [];

function saveStudent() {
    let index = parseInt(document.getElementById("editIndex").value);
    let name = document.getElementById("dashName").value.trim();
    let roll = document.getElementById("dashRoll").value.trim();
    let dept = document.getElementById("dashDept").value;
    let cgpa = parseFloat(document.getElementById("dashCgpa").value);

    let studentObj = { name, roll, dept, cgpa };

    if (index === -1) {
        students.push(studentObj);
    } else {
        students[index] = studentObj;
        document.getElementById("editIndex").value = "-1";
        document.getElementById("dashBtn").innerText = "Add Student";
        document.getElementById("dashBtn").className = "btn btn-success w-100";
    }

    document.getElementById("dashName").value = "";
    document.getElementById("dashRoll").value = "";
    document.getElementById("dashDept").value = "";
    document.getElementById("dashCgpa").value = "";

    renderDashboard();
    return false;
}

function editStudent(i) {
    let s = students[i];
    document.getElementById("dashName").value = s.name;
    document.getElementById("dashRoll").value = s.roll;
    document.getElementById("dashDept").value = s.dept;
    document.getElementById("dashCgpa").value = s.cgpa;

    document.getElementById("editIndex").value = i;
    document.getElementById("dashBtn").innerText = "Update Student";
    document.getElementById("dashBtn").className = "btn btn-warning w-100";
}

function deleteStudent(i) {
    students.splice(i, 1);
    renderDashboard();
}

function renderDashboard() {
    let tbody = document.getElementById("studentTable");
    let search = document.getElementById("searchBox").value.toLowerCase();
    let filter = document.getElementById("filterDept").value;
    let sort = document.getElementById("sortCgpa").value;

    let filtered = students.filter(s => {
        let matchesSearch = s.name.toLowerCase().includes(search) || s.roll.toLowerCase().includes(search);
        let matchesDept = filter === "All" || s.dept === filter;
        return matchesSearch && matchesDept;
    });

    if (sort === "asc") filtered.sort((a, b) => a.cgpa - b.cgpa);
    if (sort === "desc") filtered.sort((a, b) => b.cgpa - a.cgpa);

    tbody.innerHTML = "";
    filtered.forEach(s => {
        let originalIndex = students.indexOf(s);
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${s.name}</td>
            <td>${s.roll}</td>
            <td>${s.dept}</td>
            <td>${s.cgpa.toFixed(2)}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editStudent(${originalIndex})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteStudent(${originalIndex})">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    document.getElementById("totalStudents").innerText = students.length;
    let sumCgpa = students.reduce((acc, curr) => acc + curr.cgpa, 0);
    let avg = students.length > 0 ? (sumCgpa / students.length).toFixed(2) : "0.00";
    document.getElementById("avgCgpa").innerText = avg;
}