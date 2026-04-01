function togglePassword() {
    let pass = document.getElementById("password");
    pass.type = pass.type === "password" ? "text" : "password";
}

function login() {
    let username = document.getElementById("username").value.trim();

    if (!username) {
        alert("Enter username");
        return;
    }

    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("username", username);   

    window.location.href = "index.html";
}

function login() {
    let username = document.querySelector("input[type='text']").value.trim();
    let password = document.getElementById("password").value;

    let storedUser = JSON.parse(localStorage.getItem("user"));

    console.log("Trying login:", username);

    if (storedUser && username === storedUser.username && password === storedUser.password) {
        
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("username", username);

        alert("✅ Login successful!");
        window.location.href = "index.html";
        return;
    }

    if (username === "admin" && password === "1234") {

        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("username", "Admin");

        alert("👑 Admin Login Successful!");
        window.location.href = "index.html";
        return;
    }

  
    alert("❌ Invalid Username or Password");
}