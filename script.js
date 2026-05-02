function register() {
let username = document.getElementById("regUsername").value;
let password = document.getElementById("regPassword").value;

```
let users = JSON.parse(localStorage.getItem("users")) || [];

let exists = users.find(u => u.username === username);

if (exists) {
    document.getElementById("msg").innerText = "User already exists!";
    return;
}

users.push({ username, password });
localStorage.setItem("users", JSON.stringify(users));

document.getElementById("msg").innerText = "Registered Successfully!";
```

}

function login() {
let username = document.getElementById("username").value;
let password = document.getElementById("password").value;

```
// admin login
if (username === "admin" && password === "admin123") {
    window.location.href = "admin.html";
    return;
}

let users = JSON.parse(localStorage.getItem("users")) || [];

let valid = users.find(u => u.username === username && u.password === password);

if (valid) {
    window.location.href = "student.html";
} else {
    document.getElementById("error").innerText = "Invalid Login!";
}
```

}

function predict() {
let name = document.getElementById("name").value;
let hours = parseFloat(document.getElementById("hours").value);
let attendance = parseFloat(document.getElementById("attendance").value);
let marks = parseFloat(document.getElementById("marks").value);
let assignment = parseFloat(document.getElementById("assignment").value);

```
// simple formula
let score = (hours * 5) + (attendance * 0.3) + marks + (assignment * 0.2);

let grade = "";
let message = "";

if (score >= 80) {
    grade = "A";
    message = "Excellent Performance";
} else if (score >= 60) {
    grade = "B";
    message = "Good Performance";
} else if (score >= 40) {
    grade = "C";
    message = "Needs Improvement";
} else {
    grade = "Fail";
    message = "Work Hard!";
}

let result = {
    name, hours, attendance, marks, assignment, score, grade, message
};

// save current result
localStorage.setItem("currentResult", JSON.stringify(result));

// save all students
let all = JSON.parse(localStorage.getItem("students")) || [];
all.push(result);
localStorage.setItem("students", JSON.stringify(all));

window.location.href = "result.html";
```

}


function loadResult() {
let data = JSON.parse(localStorage.getItem("currentResult"));

```
document.getElementById("name").innerText = "Name: " + data.name;
document.getElementById("score").innerText = "Score: " + data.score.toFixed(2);
document.getElementById("grade").innerText = "Grade: " + data.grade;
document.getElementById("message").innerText = data.message;
```

}

function goBack() {
window.location.href = "student.html";
}


function loadStudents() {
let students = JSON.parse(localStorage.getItem("students")) || [];

```
let table = document.getElementById("studentTable");

table.innerHTML = "";

students.forEach(s => {
    let row = `
    <tr>
        <td>${s.name}</td>
        <td>${s.hours}</td>
        <td>${s.attendance}</td>
        <td>${s.marks}</td>
        <td>${s.score.toFixed(2)}</td>
        <td>${s.grade}</td>
    </tr>
    `;
    table.innerHTML += row;
});
```

}

function logout() {
window.location.href = "index.html";
}
