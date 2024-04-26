// Function to fetch the header HTML file and replace the placeholder
function loadHeader() {
    const headerPlaceholder = document.getElementById('header-placeholder');

    // Fetch the header HTML file with caching control and timeout
    fetch('./htmlElements/header.html', {
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

// Function to toggle the navigation menu
function toggleMenu() {
    const sideMenu = document.getElementById('side-menu');
    sideMenu.classList.toggle('open');
}