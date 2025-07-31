// script.js
document.getElementById('registration-form').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent default form submission

  // Get form values
  const name = document.querySelector('input[placeholder="Full Name"]').value.trim();
  const email = document.querySelector('input[placeholder="Email Address"]').value.trim();
  const phone = document.querySelector('input[placeholder="Phone Number"]').value.trim();

  // Prepare data for SheetDB
  const data = {
    data: {
      Name: name,
      Email: email,
      Phone: phone
    }
  };

  // Your SheetDB API endpoint (replace with your actual SheetDB URL)
  const sheetDBEndpoint = 'https://sheetdb.io/api/v1/0ew259heac18f';

  // Send data to SheetDB
  fetch(sheetDBEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(result => {
      if (result.created !== undefined) {
        alert('🎉 Registration successful! Thank you for joining Bliss Conference.');
        document.getElementById('registration-form').reset(); // Clear form
      } else {
        throw new Error('SheetDB response error');
      }
    })
    .catch(error => {
      console.error('Error submitting form:', error);
      alert('❌ Oops! Something went wrong. Please try again later.\n\nIf the problem persists, contact support.');
    });
});