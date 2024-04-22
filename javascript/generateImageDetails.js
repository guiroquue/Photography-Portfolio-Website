// Function to update HTML with image details
function updateImageDetails() {
    // Get the ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get('id'), 10);

    // Fetch the JSON data from the URL
    fetch('./json/imageDetails.json')
        .then(response => response.json())  // Convert the response to JSON
        .then(data => {
            // Find the image details based on the ID
            const imageDetails = data.images.find(image => image.id === id);

            // Check if image details were found
            if (imageDetails) {
                // Update image information
                document.querySelector('#image-information-container img').src = imageDetails.src;
                document.querySelector('#image-information-container img').alt = imageDetails.alt;
                document.querySelector('#image-details-01').textContent = imageDetails.cameraDetails01;
                document.querySelector('#image-details-02').textContent = imageDetails.cameraDetails02;

                // Update color dots
                const colorDotsContainer = document.querySelector('.color-dots');
                // Clear previous dots
                colorDotsContainer.innerHTML = '';
                // Add new color dots
                imageDetails.colors.forEach(color => {
                    const dotElement = document.createElement('div');
                    dotElement.className = 'color-dot-item';
                    dotElement.style.backgroundColor = color;
                    colorDotsContainer.appendChild(dotElement);
                });

                if (imageDetails.name === undefined) {
                    document.querySelector('#name-container').style.display = 'none';
                    document.querySelector('#project-details').style.display = 'none';
                } else {
                    document.querySelector('#name').textContent = imageDetails.name;
                    document.querySelector('#project-details').textContent = imageDetails.project;

                    if (imageDetails.logosrc === undefined) {
                        document.querySelector('#name-container img').style.display = 'none';
                    } else {
                        document.querySelector('#name-container img').src = imageDetails.logosrc;
                        document.querySelector('#name-container img').alt = imageDetails.logoalt;
                    }
                }

                // Update paragraphs
                document.querySelector('#paragrapht-01').textContent = imageDetails.paragraph01;
                document.querySelector('#paragrapht-02').textContent = imageDetails.paragraph02;
                document.querySelector('#paragrapht-03').textContent = imageDetails.paragraph03;

                const paragraphContainer = document.querySelector('#paragraph-container');
                if (imageDetails.paragraph01 === "paragraph 1") {
                    paragraphContainer.style.display = 'none';
                }

                // Update comment
                document.querySelector('#comment').textContent = imageDetails.comment;

                const reviewContainer = document.querySelector('#review-container');
                if (imageDetails.review === "no review") {
                    reviewContainer.style.display = 'none';
                }

            } else {
                // If no image details were found, display an error message
                document.querySelector('#image-information-container img').src = '';
                document.querySelector('#image-information-container img').alt = 'No Image Found';
                document.querySelector('#image-details-01').textContent = 'Image details not found';
                document.querySelector('#image-details-02').textContent = 'Image details not found';
                document.querySelector('#paragrapht-01').textContent = 'paragraph 1';
                document.querySelector('#paragrapht-02').textContent = 'paragraph 2';
                document.querySelector('#paragrapht-03').textContent = 'paragraph 3';
                document.querySelector('#comment').textContent = 'no comment';
                document.querySelector('#review').textContent = 'no review';
            }
        })
        .catch(error => {
            console.error('Error fetching JSON data:', error);
            // Handle errors (e.g., display an error message)
            document.querySelector('#image-information-container img').src = '';
            document.querySelector('#image-information-container img').alt = 'No Image Found';
            document.querySelector('#image-details-01').textContent = 'Image details not found';
            document.querySelector('#image-details-02').textContent = 'Image details not found';
            document.querySelector('#paragrapht-01').textContent = 'paragraph 1';
            document.querySelector('#paragrapht-02').textContent = 'paragraph 2';
            document.querySelector('#paragrapht-03').textContent = 'paragraph 3';
            document.querySelector('#comment').textContent = 'no comment';
            document.querySelector('#review').textContent = 'no review';
        });
}

// Call the function when the page loads
window.addEventListener('load', updateImageDetails);