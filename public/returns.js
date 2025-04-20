console.log("Script loaded");

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("shipping-form").addEventListener("submit", async function(event) {
        event.preventDefault();

        try {
            // Send payment data to the server
            const response = await fetch('/return', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                console.log("Return data sent successfully");
                alert("Return data submitted successfully!");
            } else {
                console.error("Failed to send Return data");
                alert("Failed to submit Return data. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        }
    });
});