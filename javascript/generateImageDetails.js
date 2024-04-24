// Function to get query parameters from URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Function to render image details
function renderImageDetails(image) {
    const detailsDiv = document.getElementById('image-details');

    // Create HTML content based on the image type
    let htmlContent = `<img src="${image.src}" alt="${image.alt}" style="max-width: 100%;">`;

    if (image.type === 'portraits') {
        htmlContent += `
            <div id="camera-information-container">
                <div id="camera-settings">
                    <p>${image.cameraSettings}</p>
                    <p>${image.imageResolution}</p>
                </div>
                <div id="color-dots-container">
                    <div class="color-dot-item" style="background-color: ${image.colors[0]};"></div>
                    <div class="color-dot-item" style="background-color: ${image.colors[1]};"></div>
                </div>
            </div>
        `;

        if (image.description01) {
            htmlContent += `
                <div id="paragraph-container">
                    <h2>A BTS Story</h2>
                    <p>${image.description01}</p> </br> 
                    <p>${image.description02}</p> </br> 
                    <p>${image.description03}</p>
                </div>
            `;
        }
        

    } else if (image.type === 'artists') {
        htmlContent += `
            <div id="camera-information-container">
                <div id="camera-settings">
                    <p>${image.cameraSettings}</p>
                    <p>${image.imageResolution}</p>
                </div>
                <div id="color-dots-container">
                    <div class="color-dot-item" style="background-color: ${image.colors[0]};"></div>
                    <div class="color-dot-item" style="background-color: ${image.colors[1]};"></div>
                </div>
            </div>

            <h2>${image.name}</h2>
            <p>${image.project}</p>
        `;

    } else if (image.type === 'brands') {
        htmlContent += `
            <div id="camera-information-container">
                <div id="camera-settings">
                    <p>${image.cameraSettings}</p>
                    <p>${image.imageResolution}</p>
                </div>
                <div id="color-dots-container">
                    <div class="color-dot-item" style="background-color: ${image.colors[0]};"></div>
                    <div class="color-dot-item" style="background-color: ${image.colors[1]};"></div>
                </div>
            </div>

            <h2>${image.name}</h2>
            <p>${image.project}</p>
        `;
    }

    if (image.review) {
            htmlContent += `
            <div id="review-container">
                <h3>Feedback</h3>
                <div id="review">
                    <p>${image.review}</p>
                </div>
            </div>
            `;
        }

    // Add the content to the div
    detailsDiv.innerHTML = htmlContent;
}

// Main function to fetch data and render image details
function main() {
    const id = getQueryParam('id');

    // Fetch JSON data from file
    fetch('./json/imageDetails.json')
        .then(response => response.json())
        .then(data => {
            // Find the image object by ID
            const image = data.images.find(image => image.id == id);

            // Render the image details
            if (image) {
                renderImageDetails(image);
            } else {
                document.getElementById('imageDetails').innerHTML = 'Image not found';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('imageDetails').innerHTML = 'Error fetching data';
        });
}

// Run the main function on page load
window.onload = main;