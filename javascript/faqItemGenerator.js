// Function to create FAQ items
function createFAQItem(question, answer) {
    const faqItem = document.createElement('div');
    faqItem.classList.add('faq-item');
    faqItem.onclick = function() {
        toggleAnswer(faqItem.querySelector('button'), faqItem.querySelector('.faq-answer'));
    };

    const faqInfo = document.createElement('div');
    faqInfo.classList.add('faq-info');
    faqInfo.innerHTML = `<h3>${question}</h3><button><img src="./assets/images/icons/arrowDown.png"></button>`;
    faqItem.appendChild(faqInfo);

    const faqAnswer = document.createElement('div');
    faqAnswer.classList.add('faq-answer');
    faqAnswer.style.display = 'none'; // Initially hide the answer
    faqAnswer.innerHTML = `<p>${answer}</p>`;
    faqItem.appendChild(faqAnswer);

    return faqItem;
}

// Function to create FAQ sections based on selected category
function createFAQSections(faqData, activeCategory = 'All') {
    const faqContainer = document.getElementById('faq-container');
    faqContainer.innerHTML = ''; // Clear the existing content

    // Filter and group FAQs by category
    const categories = faqData.reduce((acc, faq) => {
        if (!acc[faq.category]) {
            acc[faq.category] = [];
        }
        acc[faq.category].push(faq);
        return acc;
    }, {});

    // Create FAQ sections based on the active category
    if (activeCategory === 'All') {
        // Display all categories
        for (const [categoryName, faqs] of Object.entries(categories)) {
            createCategorySection(categoryName, faqs, faqContainer);
        }
    } else if (categories[activeCategory]) {
        // Display only the selected category
        createCategorySection(activeCategory, categories[activeCategory], faqContainer);
    }

    fadeIn()
}

// Function to create a section for a category
function createCategorySection(categoryName, faqs, container) {
    const section = document.createElement('div');
    section.id = categoryName.toLowerCase().replace(/\s+/g, '-');
    section.innerHTML = `<h2>${categoryName}</h2>`;

    faqs.forEach(faq => {
        const faqItem = createFAQItem(faq.question, faq.answer);
        section.appendChild(faqItem);
    });

    container.appendChild(section);
}

// Function to handle tab clicks
function handleTabClick(event) {
    fadeOut()

    const tabItems = document.querySelectorAll('.tab-item');
    const selectedCategory = event.target.innerText;

    // Update active tab
    tabItems.forEach(tab => tab.classList.remove('active'));
    event.target.closest('.tab-item').classList.add('active');

    // Fetch FAQ data and create sections based on selected category
    fetchFAQData(selectedCategory);
}

// Function to toggle the answer visibility
function toggleAnswer(button, answer) {
    const isVisible = answer.style.display === 'block';
    answer.style.display = isVisible ? 'none' : 'block';
    button.querySelector('img').style.transform = isVisible ? 'rotate(0deg)' : 'rotate(180deg)';
}

// Function to fetch FAQ data and filter based on category
function fetchFAQData(activeCategory = 'All') {
    fetch('../json/faqQuestionsAnswers.json') // Replace 'path/to/faqs.json' with the actual path to the JSON file
        .then(response => response.json())
        .then(data => {
            createFAQSections(data, activeCategory);
        })
        .catch(error => {
            console.error('Error fetching FAQ data:', error);
        });
}

// Add event listeners to tabs to handle clicks
document.querySelectorAll('.tab-item').forEach(tab => {
    tab.addEventListener('click', handleTabClick);
});

// Function to fade out all image-item elements
function fadeOut() {
    const faqContainer = document.getElementById('faq-container');
    faqContainer.classList.remove('fade-in');
    faqContainer.classList.add('fade-out');
}

// Function to fade in all faq-item elements
function fadeIn() {
    const faqContainer = document.getElementById('faq-container');

    faqContainer.classList.remove('fade-out');
    faqContainer.classList.add('fade-in');
}

fadeOut()

// Fetch FAQ data and create sections when the page loads
window.addEventListener('DOMContentLoaded', () => fetchFAQData());
