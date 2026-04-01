function signup() {
    let username = document.getElementById("username").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;
    let confirm = document.getElementById("confirm").value;

    
    if (!username || !email || !password || !confirm) {
        alert("⚠ Please fill all fields");
        return;
    }

    if (password !== confirm) {
        alert("❌ Passwords do not match");
        return;
    }

    // store user
    let user = {
        username,
        email,
        password
    };

    localStorage.setItem("user", JSON.stringify(user));

    alert("✅ Account created successfully!");

    
    window.location.href = "login.html";
}