function handleResize() {
    const windowWidth = window.innerWidth;
    const headerLinks = document.getElementById('headerLinks');
    const hamburgerMenu = document.getElementById('hamburgerMenu');

    if (windowWidth <= 1200) {
        headerLinks.style.display = 'none';
        hamburgerMenu.style.display = 'block';
    } else {
        headerLinks.style.display = 'block';
        headerLinks.style.position = 'static';
        hamburgerMenu.style.display = 'none';
    }
}

// Select all images with a specific class
const images = document.querySelectorAll('.secondDisplayImages');
const images2 = document.querySelectorAll('.firstDisplayImages');

function toggleImages() {
    // Check window width
    const windowWidth = window.innerWidth;

    // Define the threshold width to hide images
    const thresholdWidth = 1200; // For example, adjust this as needed

    // Loop through the images and toggle their visibility based on window width
    images.forEach(image => {
        if (windowWidth <= thresholdWidth) {
            image.style.display = 'none'; // Hide images
        } else {
            image.style.display = 'block'; // Show images
        }
    });

    images2.forEach(image => {
        if (windowWidth <= thresholdWidth) {
            image.style.display = 'block'; // Hide images
        } else {
            image.style.display = 'none'; // Show images
        }
    });
}


function toggleMenu() {
    const headerLinks = document.getElementById('headerLinks');
    const overlay = document.getElementById('overlay');

    const body = document.body;

    if (headerLinks.style.display === 'none' || headerLinks.style.display === '') {
        headerLinks.style.display = 'block';
        headerLinks.style.position = 'absolute';
        headerLinks.style.top = '50%';
        headerLinks.style.left = '50%';
        headerLinks.style.transform = 'translate(-50%, -50%)';

        body.style.overflow = 'hidden';

        overlay.style.display = 'block';
        overlay.style.pointerEvents = 'auto';
    } else {
        headerLinks.style.display = 'block';
        headerLinks.style.display = 'none';

        headerLinks.style.top = '0%';
        headerLinks.style.left = '0%';
        headerLinks.style.transform = 'translate(0%, 0%)';

        body.style.overflow = 'auto';

        overlay.style.display = 'none';
        overlay.style.pointerEvents = 'none';
    }
}

// Call the function when the window is resized
window.addEventListener('resize', handleResize);

// Call the function once when the page initially loads
window.addEventListener('load', handleResize);

// Call toggleImages() initially and add event listener for window resize
toggleImages(); // To set visibility initially based on window width
window.addEventListener('resize', toggleImages); // To handle changes on window resize
