$(document).ready(function () {

    const cartDownload = sessionStorage.getItem("cartDownload");
    if (cartDownload) {
        console.log("cartDownload found in sessionStorage:", cartDownload);
    } else {
        console.log("No cartDownload found in sessionStorage.");
    }
});