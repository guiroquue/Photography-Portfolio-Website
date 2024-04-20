// Fetch the header HTML file
fetch('./htmlGlobalElements/header.html')
.then(response => response.text())
.then(html => {
    // Replace the placeholder with the header content
    document.getElementById('header-placeholder').innerHTML = html;
})
.catch(error => console.error('Error fetching header:', error));

function toggleOverlay() {
    const overlay = document.getElementById('navigation-menu-overlay');
    
    if (overlay.style.right === '0px') {
        overlay.style.right = '-100%'; // Slide out the overlay to the right
    } else {
        overlay.style.right = '0'; // Slide in the overlay from the right
    }
}