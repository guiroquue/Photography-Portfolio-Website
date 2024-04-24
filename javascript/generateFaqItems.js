// Load the JSON file containing FAQ data
fetch('./json/faqQuestionsAnswers.json')
.then(response => response.json())
    .then(data => {
        // Initialize the FAQ items container
        const faqItemsContainer = document.getElementById('faq-items-container');
        
        // Function to generate FAQ items based on the selected category
        function displayFAQItems(category) {
            // Clear the current FAQ items
            faqItemsContainer.innerHTML = '';

            // Filter the data based on the selected category
            const filteredData = category === 'All' ? data : data.filter(item => item.category === category);

            // Track the displayed categories
            const displayedCategories = new Set();

            // Generate the HTML for each FAQ item
            filteredData.forEach(item => {
                // Check if the current category has been displayed
                if (!displayedCategories.has(item.category)) {
                    // Create an h2 element for the category
                    const categoryHeading = document.createElement('h2');
                    categoryHeading.innerText = item.category;
                    faqItemsContainer.appendChild(categoryHeading);

                    // Add the category to the set of displayed categories
                    displayedCategories.add(item.category);
                }

                // Create a div element for the FAQ item
                const faqItem = document.createElement('div');
                faqItem.classList.add('faq-item');

                // Create a div element for the FAQ info
                const faqInfo = document.createElement('div');
                faqInfo.classList.add('faq-info');
                
                // Create an h3 element for the question
                const question = document.createElement('h3');
                question.classList.add('question');
                question.innerHTML = item.question;
                
                // Create an img element for the arrow icon
                const arrowIcon = document.createElement('img');
                arrowIcon.src = './assets/icons/arrowDownIcon.svg';
                arrowIcon.alt = 'Image Not Found';
                arrowIcon.style.width = '30px';
                arrowIcon.style.height = '30px';
                arrowIcon.style.transition = 'transform 0.3s'; // Smooth transition for rotation
                
                // Append the arrow icon after the question
                faqInfo.appendChild(question);
                faqInfo.appendChild(arrowIcon);
                
                // Create a p element for the answer and hide it initially
                const answer = document.createElement('p');
                answer.classList.add('answer');
                answer.innerHTML = item.answer;
                answer.style.display = 'none'; // Hide the answer initially

                // Append the FAQ info and answer to the FAQ item
                faqItem.appendChild(faqInfo);
                faqItem.appendChild(answer);

                // Add click event listener to toggle the answer visibility and rotate the arrow icon
                faqItem.addEventListener('click', () => {
                    // Toggle the visibility of the answer
                    answer.style.display = answer.style.display === 'none' ? 'block' : 'none';
                    
                    // Rotate the arrow icon 90 degrees if answer is visible, otherwise reset rotation
                    if (answer.style.display === 'block') {
                        arrowIcon.style.transform = 'rotate(180deg)';
                    } else {
                        arrowIcon.style.transform = 'rotate(0deg)';
                    }
                });

                // Append the FAQ item to the FAQ items container
                faqItemsContainer.appendChild(faqItem);
            });
        }


        // Function to handle filter tab clicks
        function handleFilterClick(event) {
            // Remove the 'active' class from all tabs
            const filterTabs = document.querySelectorAll('.filter-tab-item');
            filterTabs.forEach(tab => tab.classList.remove('active'));

            // Add the 'active' class to the clicked tab
            event.currentTarget.classList.add('active');

            // Get the category from the clicked tab
            const category = event.currentTarget.innerText;

            // Apply fade-out effect to the FAQ items container
            faqItemsContainer.classList.add('fade-out');

            // After a short delay, display the FAQ items and apply fade-in effect
            setTimeout(() => {
                // Display the FAQ items for the selected category
                displayFAQItems(category);

                // Remove the fade-out class and add fade-in effect
                faqItemsContainer.classList.remove('fade-out');
                faqItemsContainer.classList.add('fade-in');

                // Remove the fade-in class after the animation ends
                setTimeout(() => {
                    faqItemsContainer.classList.remove('fade-in');
                }, 50); // Adjust this time based on your preference for the fade-in duration
            }, 50); // Adjust this time based on your preference for the fade-out duration
        }

        // Set up filter tabs
        function setUpFilterTabs() {
            const filterTabsContainer = document.getElementById('filter-tabs-container');
            const filterTabs = filterTabsContainer.querySelectorAll('.filter-tab-item');

            // Add click event listeners to each filter tab
            filterTabs.forEach(tab => {
                tab.addEventListener('click', handleFilterClick);
            });

            // Set the "All" tab as active initially
            filterTabs.forEach(tab => {
                if (tab.textContent.trim().toLowerCase() === 'all') {
                    tab.classList.add('active');
                }
            });
        }

        // Set up the filter tabs
        setUpFilterTabs();

        // Set the initial state: "All" filter selected
        displayFAQItems('All');
    })
    .catch(error => console.error('Error loading FAQ data:', error));