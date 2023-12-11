let userDataList = [];

function renderUserData() {
  let tableHTML = "";

  userDataList.forEach((userData) => {
    if (
      userData.name &&
      userData.email &&
      userData.password &&
      userData.dob &&
      userData.terms
    ) {
      tableHTML += "<tr>";
      tableHTML += `<td>${userData.name}</td>`;
      tableHTML += `<td>${userData.email}</td>`;
      tableHTML += `<td>${userData.password}</td>`;
      tableHTML += `<td>${userData.dob}</td>`;
      tableHTML += `<td>${userData.terms}</td>`;
      tableHTML += "</tr>";
    }
  });

  document.getElementById("userDataBody").innerHTML = tableHTML;
}

function calculateUserAge(dateOfBirth) {
  const dob = new Date(dateOfBirth);
  const ageDifference = Date.now() - dob.getTime();
  const ageDate = new Date(ageDifference);
  const userAge = Math.abs(ageDate.getUTCFullYear() - 1970);

  return userAge;
}

function handleUserSubmission(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const terms = document.getElementById("terms").checked;

  const userAge = calculateUserAge(dob);

  if (userAge < 18 || userAge > 55) {
    alert("You must be between 18 and 55 years old to register.");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Invalid email address format.");
    return;
  }

  const userData = {
    name,
    email,
    password,
    dob,
    terms: terms ? "true" : "false",
  };

  userDataList.push(userData);
  localStorage.setItem("userDataList", JSON.stringify(userDataList));
  document.getElementById("registrationForm").reset();
  renderUserData();
}

document.addEventListener("DOMContentLoaded", () => {
  const storedUserData = localStorage.getItem("userDataList");
  if (storedUserData) {
    userDataList = JSON.parse(storedUserData);
    renderUserData();
  }
});

document
  .getElementById("registrationForm")
  .addEventListener("submit", handleUserSubmission);

document.getElementById("clearEntriesBtn").addEventListener("click", () => {
  userDataList = [];
  localStorage.removeItem("userDataList");
  renderUserData();
});
