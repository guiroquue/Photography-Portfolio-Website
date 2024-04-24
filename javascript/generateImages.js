// Define the container element and JSON file path
const container = document.getElementById('image-grid');
const jsonFilePath = './json/imageDetails.json'; // Replace with your JSON file path

// Initialize an object to keep track of active filters
const activeFilters = {
    type: 'all', // Initially set to 'all' to show all images
    review: false // Initially set to false
};

// Function to fetch JSON data and create image items
async function fetchDataAndCreateImageItems(jsonFilePath) {
    try {
        // Fetch the JSON data from the specified file path
        const response = await fetch(jsonFilePath);
        const data = await response.json();

        // Store the data for later use
        window.imageData = data;

        // Create image items using the data
        createImageItems(data.images);

        // Set up event listeners for filter tabs
        setUpFilterTabs();

        // Activate the default filter ("All") initially
        filterImages();
    } catch (error) {
        console.error('Failed to fetch data or create image items:', error);
    }
}

// Function to create image items
function createImageItems(images) {
    // Clear the container
    container.innerHTML = '';

    // Iterate over each image in the JSON data
    images.forEach(image => {
        // Create an image item div element
        const imageItem = document.createElement('div');
        // Add a class based on the image type
        imageItem.classList.add(image.type);

        // Check if there's a review and add a class if necessary
        if (image.review) {
            imageItem.classList.add('has-review');
        }

        // Create an anchor element
        const link = document.createElement('a');
        link.href = `../imageDetails.html?id=${image.id}`;
        link.textContent = 'Learn more';

        // Create an image element
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt;
        // Add lazy loading to the image
        img.setAttribute('loading', 'lazy');

        // Append the image and anchor to the image item
        imageItem.appendChild(link);
        imageItem.appendChild(img);

        // Append the image item to the container
        container.appendChild(imageItem);
    });
}

// Function to set up event listeners for filter tabs
function setUpFilterTabs() {
    const filterTabsContainer = document.getElementById('filter-tabs-container');
    const filterTabs = filterTabsContainer.querySelectorAll('.filter-tab-item');

    // Add click event listeners to each filter tab
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const filterType = tab.textContent.trim().toLowerCase();

            // Apply fade-out effect to the image grid
            container.classList.add('fade-out');

            // After a short delay, update filters and apply fade-in effect
            setTimeout(() => {
                // Toggle the active state of the clicked filter tab
                if (filterType === 'w/ review') {
                    // Toggle review filter and update active class
                    activeFilters.review = !activeFilters.review;
                    tab.classList.toggle('active');
                } else {
                    // If not 'w/ review', change the type filter and set the active class
                    // Deactivate the previous type filter tab
                    filterTabs.forEach(t => {
                        const tabType = t.textContent.trim().toLowerCase();
                        if (tabType !== 'w/ review' && tabType !== filterType) {
                            t.classList.remove('active');
                        }
                    });
                    
                    // Activate the clicked type filter tab
                    tab.classList.add('active');

                    // Update activeFilters.type based on clicked tab
                    activeFilters.type = filterType;
                }

                // Filter images based on the active filters
                filterImages();

                // Apply fade-in effect to the image grid
                container.classList.remove('fade-out');
                container.classList.add('fade-in');

                // Remove fade-in class after animation ends
                setTimeout(() => {
                    container.classList.remove('fade-in');
                }, 50);
            }, 50);
        });
    });

    // Set the "All" tab as active initially
    filterTabs.forEach(tab => {
        if (tab.textContent.trim().toLowerCase() === 'all') {
            tab.classList.add('active');
        }
    });
}

// Function to filter images based on active filters
function filterImages() {
    // Get all image items
    const imageItems = container.querySelectorAll('div');

    // Filter images based on active filters
    imageItems.forEach(item => {
        const matchesType = activeFilters.type === 'all' || item.classList.contains(activeFilters.type);
        const matchesReview = !activeFilters.review || item.classList.contains('has-review');

        // Show or hide the item based on the filter criteria
        item.style.display = matchesType && matchesReview ? 'block' : 'none';
    });
}

// Call the function to fetch data and create image items
fetchDataAndCreateImageItems(jsonFilePath);