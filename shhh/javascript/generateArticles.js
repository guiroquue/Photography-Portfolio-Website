// Function to create article elements based on the article data
function createArticleElement(article) {
    // Create an article element and set its class based on whether the article is a video or an image
    const articleElement = document.createElement('article');
    articleElement.className = article.video ? 'video-article-container' : 'image-article-container';
    
    // Add the article type as a class for filtering purposes
    articleElement.classList.add(article.type.toLowerCase());

    // Add an `onclick` event to the article element to redirect to the article page with the ID in the URL
    articleElement.onclick = () => {
        window.location.href = `./article.html?id=${article.id}`;
    };
    
    // Add video placeholder if the article is a video
    if (article.video) {
        const videoPlaceholder = document.createElement('div');
        videoPlaceholder.className = 'video-placeholder-container';
        articleElement.appendChild(videoPlaceholder);
    }
    
    // If the article has an image, create an image container and add the image
    if (article.image) {
        const imageContainer = document.createElement('div');
        imageContainer.className = 'image-container';
        
        const img = document.createElement('img');
        img.src = article.image;
        img.alt = 'Image Not Found';
        imageContainer.appendChild(img);
        
        articleElement.appendChild(imageContainer);
    }
    
    // Add a tags container and set its text content based on the article's tags
    const tagsContainer = document.createElement('div');
    tagsContainer.className = 'content-tags-container';
    tagsContainer.textContent = article.tags.join(' · ');
    articleElement.appendChild(tagsContainer);
    
    // Create and append the headline description container
    const headlineContainer = document.createElement('div');
    headlineContainer.className = 'article-headline-description-container';
    
    // Add the article title and description
    const h3 = document.createElement('h3');
    h3.textContent = article.title;
    headlineContainer.appendChild(h3);
    
    const p = document.createElement('p');
    p.textContent = article.description;
    headlineContainer.appendChild(p);
    
    // Append the headline container to the article element
    articleElement.appendChild(headlineContainer);
    
    // Add the credit tag if an author is specified
    if (article.author) {
        const creditTag = document.createElement('p');
        creditTag.className = 'credit-tag';
        creditTag.textContent = `By ${article.author}`;
        articleElement.appendChild(creditTag);
    }
    
    return articleElement;
}

// Fetch JSON data and create articles dynamically
fetch('./json/articles.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('article-container');
        
        // Filter the articles based on the "show" property and create elements for those that should be displayed
        data.forEach(article => {
            if (article.show) {
                const articleElement = createArticleElement(article);
                container.appendChild(articleElement);
            }
        });
    })
    .catch(error => console.error('Error fetching JSON:', error));

// Flag to track whether filtering is in progress
let filteringInProgress = false;

// Function to handle the filter tab click events
function handleFilterTabClick(selectedFilter) {
    const container = document.getElementById('article-container');
    
    // Check if filtering is already in progress
    if (filteringInProgress) {
        return; // Ignore new filter requests if filtering is in progress
    }
    
    // Set filteringInProgress flag to true
    filteringInProgress = true;

    // Fade out the article container
    container.style.opacity = 0;

    // Delay to allow fade-out effect and filter articles
    setTimeout(() => {
        // Get all article elements within the article container
        const articles = container.querySelectorAll('article');
        
        // Filter articles based on the selected filter
        articles.forEach((article) => {
            if (selectedFilter === 'all') {
                // If the selected filter is "All," show all articles
                article.style.display = 'block';
            } else {
                // Otherwise, filter articles based on the selected filter
                if (article.classList.contains(selectedFilter.trim())) {
                    article.style.display = 'block';
                } else {
                    article.style.display = 'none';
                }
            }
        });

        // After filtering is complete, fade the article container back in
        setTimeout(() => {
            container.style.opacity = 1;
            // Reset filteringInProgress flag
            filteringInProgress = false;
        }, 100); // Adjust the duration for fade-in as needed
    }, 100); // Adjust the duration for fade-out as needed
}

// Set the "All" filter as the active filter and display all articles when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Find the "All" filter tab and set it as active
    const filterItems = document.querySelectorAll('.filter-item');
    filterItems.forEach((filterItem) => {
        const filterText = filterItem.querySelector('p').textContent.toLowerCase().trim();
        if (filterText === 'all') {
            filterItem.classList.add('active');
            // Handle the "All" filter selection
            handleFilterTabClick('all');
        }
    });
});

// Add event listeners to filter tabs
document.querySelectorAll('.filter-item').forEach((filterItem) => {
    filterItem.addEventListener('click', (event) => {
        // Check if filtering is already in progress
        if (filteringInProgress) {
            return; // Ignore the click event if filtering is in progress
        }

        // Get the selected filter from the clicked tab and trim whitespace
        const selectedFilter = event.target.textContent.toLowerCase().trim();

        // Update active filter item
        document.querySelectorAll('.filter-item').forEach((item) => {
            item.classList.remove('active');
        });
        filterItem.classList.add('active');

        // Handle the selected filter tab click event
        handleFilterTabClick(selectedFilter);
    });
});
