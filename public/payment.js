console.log("Script loaded");

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("form").addEventListener("submit", async function(event) {
        // Collect form data
        const formData = new FormData(event.target);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        try {
            // Send payment data to the server
            const response = await fetch('/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log("Payment data sent successfully");
                alert("Payment data submitted successfully!");
            } else {
                console.error("Failed to send payment data");
                alert("Failed to submit payment data. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        }
    });
});