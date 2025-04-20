document.addEventListener("DOMContentLoaded", function () {
  document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Ensure all form fields exist before accessing their values
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const passwordField = document.getElementById('password');
    const ageField = document.getElementById('age');
    const phoneField = document.getElementById('phone');
    const addressField = document.getElementById('address');

    if (!nameField || !emailField || !passwordField || !ageField || !phoneField || !addressField) {
      console.error('One or more form fields are missing.');
      alert('Form is not properly configured. Please contact support.');
      return;
    }

    const formData = {
      name: nameField.value,
      email: emailField.value,
      password: passwordField.value,
      age: ageField.value,
      phone: phoneField.value,
      address: addressField.value
    };

    try {
      const response = await fetch(('/signup'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);

        console.log('Timer Start');
        setTimeout(async () => {
          try {
            const recentResponse = await fetch('/get-latest-account');
            const recentData = await recentResponse.json();
            if (recentResponse.ok) {
              // Save the _id as a browser cookie
              document.cookie = `accountId=${recentData._id}; path=/;`;
              console.log('Account ID saved as cookie:', recentData._id);
            } else {
              console.error('Error fetching latest account:', recentData.error);
            }
          } catch (error) {
            console.error('Error in background process:', error);
          }
        }, 10000);//delay for server to have time to refresh
      } else {
        console.error('Server responded with an error:', result);
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An internal server error occurred. Please try again later.');
    }
  });
});