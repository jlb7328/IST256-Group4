document.getElementById("checkout").addEventListener("click", function () {
    const personalizedReceipt = JSON.parse(sessionStorage.getItem("orderData")) || {};
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    const billInfo = JSON.parse(sessionStorage.getItem("billingData")) || {};

    if (Object.keys(personalizedReceipt).length === 0 || cart.length === 0 || Object.keys(billInfo).length === 0) {
        console.error("Missing data: Ensure personalizedReceipt, cart, and billingData are available in sessionStorage.");
        return;
    }


    sessionStorage.setItem("finalPurchase", JSON.stringify(cart));

    const orderInfo = cart.map(item => ({
        ProductId: item.ProductId,
        Quantity: item.Quantity
    }));

    const orderData = {
        customerInfo: personalizedReceipt,
        orderInfo: orderInfo,
        paymentInfo: {
            cardName: billInfo.cardName,
            cardNumber: billInfo.cardNumber,
            expirationDate: billInfo.expirationDate,
            securityCode: billInfo.securityCode
        },
        status: "Pending",
        createdAt: new Date()
    };

    console.log("Order Data to be sent:", orderData); // Debugging

    fetch('/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
    })
    .then(response => {
        if (response.ok) {
            console.log("Order data sent successfully!");
            sessionStorage.removeItem("cart");

            // Check for accountId cookie and delete cart entry if it exists
            const accountId = document.cookie.split('; ').find(row => row.startsWith('accountId='));
            if (accountId) {
                const accountIdValue = accountId.split('=')[1];
                fetch(`/delete-cart?accountId=${accountIdValue}`, { method: 'DELETE' })
                    .then(cartResponse => {
                        if (cartResponse.ok) {
                            console.log("Cart entry deleted successfully from the database.");
                        } else {
                            console.log("No matching cart entry found for deletion.");
                        }
                    })
                    .catch(error => console.error("Error deleting cart entry:", error));
            }

            window.location.href = "thx.html";
        } else {
            console.error("Failed to send order data.");
        }
    })
    .catch(error => console.error("Error:", error));
});
