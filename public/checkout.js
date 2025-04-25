console.log("Script loaded");

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    if (!form) {
        console.warn("Form element not found!!!");
        return;
    }
    form.addEventListener("submit", async function(event) {
        // Collect form data
        const formData = new FormData(event.target);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        try {
            // Send payment data to the server
            const response = await fetch('/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log("Shipping data sent successfully");
                alert("Ship data submitted successfully!");
            } else {
                console.error("Failed to send Ship data");
                alert("Failed to submit Ship data. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        }
    });
});