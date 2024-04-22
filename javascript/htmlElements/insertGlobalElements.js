// Function to fetch the header HTML file and replace the placeholder
function loadHeader() {
    const headerPlaceholder = document.getElementById('header-placeholder');

    // Fetch the header HTML file with caching control and timeout
    fetch('./htmlGlobalElements/header.html', {
        cache: 'default', // Allow caching by the browser
        // Adding a timeout value (e.g., 5 seconds)
        timeout: 5000 // Adjust the timeout value as needed
    })
        .then(response => {
            // Check if the response is successful
            if (!response.ok) {
                throw new Error('Network response was not OK');
            }
            return response.text();
        })
        .then(html => {
            // Replace the placeholder with the header content
            headerPlaceholder.innerHTML = html;
        })
        .catch(error => {
            console.error('Error fetching header:', error);
            // Optional: Display a fallback message or handle the error as needed
            headerPlaceholder.innerHTML = 'Header could not be loaded';
        });
}

// Call the function to load the header
loadHeader();

// Function to toggle the overlay navigation menu
function toggleOverlay() {
    const overlay = document.getElementById('navigation-menu-overlay');

    // Toggle the overlay's position based on its current state
    if (overlay.style.right === '0px') {
        overlay.style.right = '-100%'; // Slide out the overlay to the right
    } else {
        overlay.style.right = '0'; // Slide in the overlay from the right
    }
}
