function displayMessage(elementId, message, isError = false) {
  const container = document.getElementById(elementId);
  const colorClass = isError ? "text-danger fw-bold" : "text-dark";
  container.innerHTML += `<p class="${colorClass}">${message}</p>`;
}

function verifyStudent(roll, callback) {
  setTimeout(() => {
    callback(`Student ${roll} verified`);
  }, 1000);
}

function loadExamPaper(callback) {
  setTimeout(() => {
    callback("Exam paper loaded");
  }, 1500);
}

function submitAnswers(callback) {
  setTimeout(() => {
    callback("Answers submitted");
  }, 2000);
}

function generateResult(callback) {
  setTimeout(() => {
    callback("Result generated: 82 marks");
  }, 1000);
}

function verifyStudentErrorFirst(roll, callback) {
  setTimeout(() => {
    if (!roll || roll.trim() === "") {
      callback("Roll number is required", null);
    } else {
      callback(null, `Student ${roll} verified`);
    }
  }, 1000);
}

displayMessage("partAOutput", "Exam workflow started...");
verifyStudent("BSCS-001", (msg1) => {
  displayMessage("partAOutput", msg1);
  loadExamPaper((msg2) => {
    displayMessage("partAOutput", msg2);
    submitAnswers((msg3) => {
      displayMessage("partAOutput", msg3);
      generateResult((msg4) => {
        displayMessage("partAOutput", msg4);
        // Callback Hell: The deeply nested structure creates a pyramid shape, making it hard to read, scale, and maintain.
      });
    });
  });
});

displayMessage("partBValidOutput", "Exam workflow started...");
verifyStudentErrorFirst("BSCS-001", (err, data) => {
  if (err) {
    displayMessage("partBValidOutput", err, true);
    return;
  }
  displayMessage("partBValidOutput", data);
  loadExamPaper((msg2) => {
    displayMessage("partBValidOutput", msg2);
    submitAnswers((msg3) => {
      displayMessage("partBValidOutput", msg3);
      generateResult((msg4) => {
        displayMessage("partBValidOutput", msg4);
      });
    });
  });
});

displayMessage("partBInvalidOutput", "Exam workflow started...");
verifyStudentErrorFirst("", (err, data) => {
  if (err) {
    displayMessage("partBInvalidOutput", err, true);
    return;
  }
  displayMessage("partBInvalidOutput", data);
  loadExamPaper((msg2) => {
    displayMessage("partBInvalidOutput", msg2);
    submitAnswers((msg3) => {
      displayMessage("partBInvalidOutput", msg3);
      generateResult((msg4) => {
        displayMessage("partBInvalidOutput", msg4);
      });
    });
  });
});