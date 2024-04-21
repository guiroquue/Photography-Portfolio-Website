// Define the state object to keep track of active filters
let filterState = {
    clientType: 'all', // Can be 'all', 'portrait', 'artist', 'brand'
    review: false // Can be true or false
};

// Define the filter tabs and the image grid container
let filterTabs;
let imageGrid;

// Initialize the images array
let images = [];

// Function to display images in the image grid
function displayImages(images) {
    imageGrid.innerHTML = ''; // Clear the image grid

    images.forEach(image => {
        // Create a div element for the image item
        const imageItem = document.createElement('div');
        imageItem.classList.add('image-item');

        // Create the image element
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt;

        // Create the image info div
        const imageInfo = document.createElement('div');
        imageInfo.classList.add('image-info');

        // Create the "Learn More" link
        const learnMoreLink = document.createElement('a');
        learnMoreLink.href = `./imageDetails.html?id=${image.id}`;
        learnMoreLink.textContent = 'Learn More';
        learnMoreLink.classList.add('learn-more-link');

        // Add the "Learn More" link to the image info div
        imageInfo.appendChild(learnMoreLink);

        // Add the image and image info to the image item
        imageItem.appendChild(imageInfo);

        // Add the image and image info to the image item
        imageItem.appendChild(img);

        // Add the image item to the image grid
        imageGrid.appendChild(imageItem);

        fadeIn()
    });
}

function filterImages() {
    // Filter images based on clientType
    let filteredImages;

    if (filterState.clientType === 'all') {
        // If filterState.clientType is 'all', return all images
        filteredImages = images;
    } else {
        // Otherwise, filter images based on clientType
        filteredImages = images.filter(image => image.client === filterState.clientType);
    }

    // Apply review filter if review is true
    if (filterState.review) {
        filteredImages = filteredImages.filter(image => image.review === 'yes');
    }

    // Display filtered images
    displayImages(filteredImages);
}

// Function to handle tab activation
function handleTabActivation(tab, filterType) {
    fadeOut();

    if (filterType === 'w/ Review') {
        // Toggle the review filter independently
        filterState.review = !filterState.review;
        // Toggle the 'active' class only for the w/ Review tab
        tab.classList.toggle('active');
    } else {
        // Set the client type to the chosen filter
        filterState.clientType = filterType.toLowerCase();

        // Deactivate all tabs except the current one and the 'w/ Review' tab if it's active
        filterTabs.forEach(t => {
            // Preserve the state of the 'w/ Review' tab
            if (filterState.review && t.textContent.trim() === 'w/ Review') {
                return; // Skip deactivation of 'w/ Review' tab
            }
            // Deactivate other tabs and activate the current tab
            if (t.textContent.trim() === filterType) {
                t.classList.add('active');
            } else {
                t.classList.remove('active');
            }
        });
    }

    // Apply the filters and update the images
    filterImages();
}

// Wait for the DOM to be fully loaded before initializing the filter tabs and image grid
document.addEventListener('DOMContentLoaded', () => {
    // Select the filter tabs and the image grid container
    filterTabs = document.querySelectorAll('.tab-item');
    imageGrid = document.querySelector('.image-grid');

    // Fetch the image data from the JSON file
    fetch('./json/imageDetails.json')
        .then(response => response.json())
        .then(data => {
            // Initialize the images array
            images = data.images;

            // Initial display of all images
            displayImages(images);

            // Add event listeners to the filter tabs
            filterTabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    const filterType = this.textContent.trim();
                    handleTabActivation(this, filterType);
                });
            });

            // Activate the 'All' tab initially
            const allTab = Array.from(document.querySelectorAll('.tab-item p')).find(tab => tab.textContent.trim() === 'All');
            if (allTab) {
                allTab.parentElement.classList.add('active');
            }
        })
        .catch(error => console.error('Error fetching images data:', error));
});

// Function to fade out all image-item elements
function fadeOut() {
    const imageItems = document.querySelectorAll('.image-item');

    // Iterate through each image-item element and apply the fade-out effect
    imageItems.forEach(imageItem => {
        if (imageItem) {
            // Apply the fade-out transition and opacity changes
            imageItem.classList.remove('fade-in');
            imageItem.classList.add('fade-out');
        }
    });
}

// Function to fade in all image-item elements
function fadeIn() {
    const imageItems = document.querySelectorAll('.image-item');

    // Iterate through each image-item element and apply the fade-in effect
    imageItems.forEach(imageItem => {
        if (imageItem) {
            // Apply the fade-in transition and opacity changes
            imageItem.classList.remove('fade-out');
            imageItem.classList.add('fade-in');
        }
    });
}

fadeOut()

setTimeout(() => {
    const reachOutContainer = document.querySelector('.reach-out-interact-container');
    reachOutContainer.style.display = 'block';
}, 1000);
