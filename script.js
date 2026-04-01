
if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
}
let items = JSON.parse(localStorage.getItem("items")) || [];



function previewImage() {
    let file = document.getElementById("image").files[0];

    if (!file) return;

    let reader = new FileReader();

    reader.onload = function (e) {
        let preview = document.getElementById("preview");
        preview.src = e.target.result;
        preview.style.display = "block";
    };

    reader.readAsDataURL(file);
}



function addItem() {

    let name = document.getElementById("name").value.trim();
    let desc = document.getElementById("desc").value.trim();
    let location = document.getElementById("location").value.trim();
    let contact = document.getElementById("contact").value.trim();
    let type = document.getElementById("type").value;
    let category = document.getElementById("category").value;
    let value = parseInt(document.getElementById("value").value) || 0;
    
    let file = document.getElementById("image").files[0];

    if (!name || !desc || !location || !contact) {
        alert("⚠ Please fill all fields!");
        return;
    }

    if (file) {
        let reader = new FileReader();

        reader.onload = function (e) {
            saveItem(e.target.result);
        };

        reader.readAsDataURL(file);

    } else {
        saveItem("");
    }

   function saveItem(imageData) {

    
    let earnedPoints = calculatePoints(value, type);

 

    
    let item = {
        name,
        desc,
        location,
        contact,
        type,
        category,
        image: imageData,
        date: new Date().toISOString(),
        claimed: false,
        value,
        points: earnedPoints
    };

    items.push(item);
    localStorage.setItem("items", JSON.stringify(items));

    displayItems(items);
    updateStats();
    updateUserStats();
    clearForm();

    showToast(`🎉 +${earnedPoints} points earned!`);
    alert("✅ Item submitted successfully!");
} 
}




function displayItems(data) {
    
    let container = document.getElementById("items");
    container.innerHTML = "";
    

    if (data.length === 0) {
        container.innerHTML = "<p>No items found</p>";
        return;
    }
    

    data.forEach((item) => {

        
        let originalIndex = items.findIndex(i => i.date === item.date);

        container.innerHTML += `
            <div class="card">
                
                ${item.image ? `<img src="${item.image}" alt="item image">` : ""}

                <h3>${item.name}</h3>
                <span class="badge ${item.type.toLowerCase()}">${item.type}</span>

                <p>${item.desc}</p>
                <p>📍 ${item.location}</p>
                <p>📂 ${item.category}</p>
                <p>📅 ${new Date(item.date).toLocaleString()}</p>
                <p>📞 ${item.contact}</p>
                <p>💎 Value: ₹${item.value || 0}</p>
<p>⭐ Points Earned: ${item.points || 0}</p>

                <button onclick="markClaimed(${originalIndex})">
                    ${item.claimed ? "✅ Claimed" : "Claim"}
                </button>
            </div>
        `;
    });
    
}




function searchItem() {
    let input = document.getElementById("search");

    if (!input) return;

    let query = input.value.toLowerCase().trim();

    if (!query) {
        displayItems(items);
        return;
    }

    let keywords = query.split(" ");

    let filtered = items.filter(item => {

        
        let name = String(item.name || "").toLowerCase();
        let desc = String(item.desc || "").toLowerCase();
        let location = String(item.location || "").toLowerCase();
        let category = String(item.category || "").toLowerCase();
        let type = String(item.type || "").toLowerCase();

        let fullText = name + " " + desc + " " + location + " " + category + " " + type;

        return keywords.every(word => fullText.includes(word));
    });

    displayItems(filtered);
}



function markClaimed(index) {

    
    if (items[index].claimed) {
        alert("Already claimed!");
        return;
    }

    
    items[index].claimed = true;

    
    let earnedPoints = items[index].points || 0;

    
    userPoints += earnedPoints;
    localStorage.setItem("points", userPoints);

    
    localStorage.setItem("items", JSON.stringify(items));

    
    displayItems(items);
    updateStats();
    updateUserStats();

    
    showToast(`🎉 +${earnedPoints} points received!`);
}



function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("desc").value = "";
    document.getElementById("location").value = "";
    document.getElementById("contact").value = "";
    document.getElementById("image").value = "";

    let preview = document.getElementById("preview");
    preview.style.display = "none";
    preview.src = "";
}

document.getElementById("search").addEventListener("input", searchItem);
function toggleTheme() {
    document.body.classList.toggle("dark");
}

displayItems(items);
function filterItems(type) {
    let filtered = items;

    if (type === "Lost" || type === "Found") {
        filtered = items.filter(item => item.type === type);
    } 
    else if (type === "unclaimed") {
        filtered = items.filter(item => !item.claimed);
    }

    displayItems(filtered);
}
let currentQuery = "";

function highlight(text, query) {
    if (!query) return text;

    let regex = new RegExp(`(${query})`, "gi");
    return text.replace(regex, `<mark>$1</mark>`);
}
function updateStats() {
    document.getElementById("total").innerText = items.length;
    document.getElementById("lostCount").innerText = items.filter(i => i.type === "Lost").length;
    document.getElementById("foundCount").innerText = items.filter(i => i.type === "Found").length;
}
displayItems(items);
updateStats();
function showToast(msg) {
    let toast = document.getElementById("toast");
    toast.innerText = msg;
    toast.style.display = "block";

    setTimeout(() => {
        toast.style.display = "none";
    }, 2000);
}

function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "login.html";
}
document.getElementById("user").innerText =
    "👋 Welcome, " + localStorage.getItem("username");
    
    let userPoints = parseInt(localStorage.getItem("points")) || 0;
    function calculatePoints(value, type) {
    if (type !== "Found") return 0;

    if (value < 500) return 10;
    if (value < 2000) return 30;
    if (value < 10000) return 70;
    return 150;
}
function getBadge(points) {
    if (points < 50) return "🙂 Beginner";
    if (points < 150) return "👍 Honest Helper";
    if (points < 300) return "🌟 Trusted Member";
    if (points < 600) return "🏆 Campus Hero";
    return "👑 Legend of Integrity";
}
function updateUserStats() {
    let points = parseInt(localStorage.getItem("points")) || 0;

    document.getElementById("points").innerText =
        "💰 Points: " + points;

    document.getElementById("badge").innerText =
        "🎖 Badge: " + getBadge(points);
}

updateUserStats();
   
