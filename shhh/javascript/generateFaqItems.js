// Function to fetch JSON data and initialize the FAQ display
function fetchFAQDataAndInitialize() {
    // Fetch JSON data
    fetch('./json/faqQuestionsAnswers.json')
        .then(response => response.json())
        .then(data => {
            // Initialize filter tabs and display all FAQ items initially
            setUpFilterTabs(data);
            displayFAQItems('All', data);
        })
        .catch(error => {
            console.error('Error loading FAQ data:', error);
            // Add error handling as needed (e.g., display an error message to the user)
        });
}

// Function to display FAQ items based on the selected category
function displayFAQItems(category, data) {
    const faqItemswrapper = document.getElementById('faq-items-container');
    faqItemswrapper.innerHTML = ''; // Clear current FAQ items

    // Filter data based on the selected category
    const filteredData = category === 'All' ? data : data.filter(item => item.category === category);

    // Set to track displayed categories (to avoid duplicate category headers)
    const displayedCategories = new Set();

    // Generate HTML for each FAQ item
    filteredData.forEach(item => {
        // Check if category header needs to be displayed
        if (!displayedCategories.has(item.category)) {
            // Create category header and add to wrapper
            const categoryHeader = document.createElement('h2');
            categoryHeader.textContent = item.category;
            faqItemswrapper.appendChild(categoryHeader);

            // Mark category as displayed
            displayedCategories.add(item.category);
        }

        // Create FAQ item and add to wrapper
        const faqItem = createFAQItem(item);
        faqItemswrapper.appendChild(faqItem);
    });
}

// Function to create a single FAQ item
function createFAQItem(item) {
    const faqItem = document.createElement('div');
    faqItem.classList.add('faq-item');

    // Create FAQ question element and append to FAQ item
    const questionElement = createQuestionElement(item.question);
    faqItem.appendChild(questionElement);

    // Create FAQ answer element and append to FAQ item
    const answerElement = createAnswerElement(item.answer);
    faqItem.appendChild(answerElement);

    // Add click event listener to FAQ item
    faqItem.addEventListener('click', () => {
        // Toggle answer visibility
        const isAnswerVisible = answerElement.style.display === 'block';
        answerElement.style.display = isAnswerVisible ? 'none' : 'block';

        // Toggle arrow rotation
        const arrowIcon = questionElement.querySelector('.arrow-icon');
        arrowIcon.style.transform = isAnswerVisible ? 'rotate(0deg)' : 'rotate(180deg)';
    });

    return faqItem;
}

// Function to create the FAQ question element
function createQuestionElement(question) {
    const questionwrapper = document.createElement('div');
    questionwrapper.classList.add('faq-question');

    const questionText = document.createElement('h3');
    questionText.textContent = question;

    // Arrow icon for toggling answer visibility
    const arrowIcon = document.createElement('img');
    arrowIcon.src = './assets/icons/arrowDownIcon.svg';
    arrowIcon.alt = 'Arrow Icon';
    arrowIcon.classList.add('arrow-icon');

    // Append question text and arrow icon to the question wrapper
    questionwrapper.appendChild(questionText);
    questionwrapper.appendChild(arrowIcon);

    return questionwrapper;
}

// Function to create the FAQ answer element
function createAnswerElement(answer) {
    const answerElement = document.createElement('p');
    answerElement.classList.add('faq-answer');
    answerElement.textContent = answer;

    // Initially hide the answer
    answerElement.style.display = 'none';

    return answerElement;
}

// Function to handle filter tab clicks
function handleFilterClick(event, data) {
    // Remove the 'active' class from all tabs
    const filterTabs = document.querySelectorAll('.filter-item');
    filterTabs.forEach(tab => tab.classList.remove('active'));

    // Add the 'active' class to the clicked tab
    event.currentTarget.classList.add('active');

    // Get the selected category
    const category = event.currentTarget.textContent.trim();

    // Reference the FAQ items wrapper
    const faqItemscontainer = document.getElementById('faq-items-container');

    // Apply the fade-out effect by adding the 'fade-out' class
    faqItemscontainer.style.opacity = 0;

    // After a delay to allow the fade-out effect to complete, display the FAQ items and apply the fade-in effect
    setTimeout(() => {
        // Display the FAQ items for the selected category
        displayFAQItems(category, data);

        // Remove the fade-in class after a short delay (equal to the CSS transition duration)
        setTimeout(() => {
            faqItemscontainer.style.opacity = 1;
        }, 100); // Adjust this time based on the CSS transition duration
    }, 100); // Adjust this time based on the CSS transition duration
}


// Function to set up filter tabs with click event listeners
function setUpFilterTabs(data) {
    const filterTabswrapper = document.getElementById('filter-tabs-wrapper');
    
    // Add click event listeners to each filter tab
    const filterTabs = filterTabswrapper.querySelectorAll('.filter-item');
    filterTabs.forEach(tab => {
        tab.addEventListener('click', (event) => handleFilterClick(event, data));
    });

    // Set the 'All' tab as active initially
    filterTabs.forEach(tab => {
        if (tab.textContent.trim().toLowerCase() === 'all') {
            tab.classList.add('active');
        }
    });
}

// Initialize the FAQ display
fetchFAQDataAndInitialize();
