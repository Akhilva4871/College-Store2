document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission

    // Get form data
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Send login request to the backend
    fetch("http://localhost:5000/api/login", {  // Replace with the appropriate backend URL
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // If login is successful, store the admin status and redirect to the dashboard
            sessionStorage.setItem("isAdmin", "true");  // Storing admin status in sessionStorage
            window.location.href = "admin-dashboard.html";  // Redirect to admin dashboard
        } else {
            alert(data.message);  // If login fails, show error message
        }
    })
    .catch(error => {
        console.error("Error during login:", error);
        alert("An error occurred. Please try again.");
    });
});
