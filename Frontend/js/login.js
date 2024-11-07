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
    .then(response => response.json())  // Parse the response to JSON
    .then(data => {
        if (data.success) {
            alert(data.message);  // Show the login success message in an alert
            sessionStorage.setItem("isAdmin", "true");  // Store admin status in sessionStorage
    
            // Add a small delay before redirecting (to ensure alert finishes first)
            setTimeout(() => {
                window.location.href = "dashboard.html";  // Redirect to admin dashboard page
            }, 1000);  // 1000ms = 1 second delay
        } else {
            alert(data.message);  // If login fails, show an error message
        }
    })
    
    
    .catch(error => {
        console.error("Error during login:", error);
        alert("An error occurred. Please try again.");
    });
});
