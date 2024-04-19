function learnMoreAboutRedirect(imageId) {
    window.location.href = "imageDetailsPage.html?imageId=" + imageId;
}

// Load the JSON file
fetch('./json/portraitsDetails.json')
.then(response => response.json())
.then(data => {
    // Get the image grid container
    const imageGrid = document.querySelector('.image-grid');

    // Iterate through each image entry
    data.images.forEach(image => {
        // Create a new div for the image item
        const imageItem = document.createElement('div');
        imageItem.classList.add('image-item');

        // Create the image info div
        const imageInfo = document.createElement('div');
        imageInfo.classList.add('image-info');

        // Create the color pixel info div
        const colorPixelInfo = document.createElement('div');
        colorPixelInfo.classList.add('color-pixel-info');

        // Add color dots
        image.colors.forEach(color => {
            const colorDot = document.createElement('div');
            colorDot.classList.add('color-dot');
            colorDot.style.backgroundColor = color;
            colorPixelInfo.appendChild(colorDot);
        });

        // Append the color pixel info to the image info
        imageInfo.appendChild(colorPixelInfo);

        // Create the "Learn more" button
        const learnMoreButton = document.createElement('button');
        learnMoreButton.textContent = 'Learn more';
        learnMoreButton.setAttribute('onclick', `learnMoreAboutRedirect(${image.id})`);
        imageInfo.appendChild(learnMoreButton);

        // Append the image info to the image item
        imageItem.appendChild(imageInfo);

        // Create the img element
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt;

        // Append the img element to the image item
        imageItem.appendChild(img);

        // Append the image item to the image grid
        imageGrid.appendChild(imageItem);
    });
})
.catch(error => console.error('Error loading JSON file:', error));