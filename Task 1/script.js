// Objective 3: Add Basic JavaScript for Interactivity

// Wait for the HTML document to fully load before running the script
document.addEventListener('DOMContentLoaded', function() {
    
    // Select the button element by its ID
    const alertBtn = document.getElementById('alert-button');
    
    // Ensure the button exists before attaching the event listener
    if (alertBtn) {
        // Add a click event listener that triggers the required alert message
        alertBtn.addEventListener('click', function() {
            alert('Hello! Welcome to my Internship Task 1 submission. Thank you for reviewing my work!');
        });
    }
    
});
