document.addEventListener('DOMContentLoaded', function() {
    // Get the filter tabs and grid containers
    const tabs = document.querySelectorAll('.filter-tab');
    const amountOfItems = document.getElementById('amount-of-items');
    const workShowcaseLink = document.getElementById('work-showcase-container');
    let activeGrid = document.querySelector('.grid-container.portraits');
    let activeTab = tabs[0];

    // Initialize the default tab and grid
    activeTab.classList.add('active');
    activeGrid.classList.add('active');
    activeGrid.style.display = 'grid';
    activeGrid.style.opacity = '1';
    amountOfItems.textContent = '20 Portraits';
    // Set initial href attribute
    workShowcaseLink.href = '#portraits';

    // Function to switch tabs and grids
    function switchTab(selectedTab, selectedGrid, amountText, hrefValue) {
        if (activeGrid) {
            // Fade out the current active grid
            activeGrid.style.opacity = '0';

            // Once the fade-out effect is complete (300ms delay), proceed to hide it and fade in the new grid
            setTimeout(() => {
                activeGrid.style.display = 'none';
                activeGrid.classList.remove('active');
                
                // Switch to the new tab and grid
                activeTab.classList.remove('active');
                activeTab = selectedTab;
                activeTab.classList.add('active');
                
                selectedGrid.style.display = 'grid';
                selectedGrid.classList.add('active');
                
                // Start the fade-in effect
                setTimeout(() => {
                    selectedGrid.style.opacity = '1';
                }, 10);
                
                // Update the amount of items text
                amountOfItems.textContent = amountText;
                
                // Update the active grid reference
                activeGrid = selectedGrid;
                
                // Update the href attribute of the work showcase link
                workShowcaseLink.href = hrefValue;
            }, 100);
        }
    }

    // Add event listeners to the tabs
    tabs.forEach((tab) => {
        tab.addEventListener('click', function() {
            if (tab !== activeTab) {
                const selectedGridClass = tab.textContent.trim().toLowerCase();
                const selectedGrid = document.querySelector(`.grid-container.${selectedGridClass}`);
                
                let amountText;
                let hrefValue;

                // Determine the amount of items text and href value based on the selected grid class
                switch (selectedGridClass) {
                    case 'portraits':
                        amountText = '20 Portraits';
                        hrefValue = '#portraits'; // Change href value
                        break;
                    case 'artists':
                        amountText = '1 Artists';
                        hrefValue = '#artists'; // Change href value
                        break;
                    case 'brands':
                        amountText = '2 Brands';
                        hrefValue = '#brands'; // Change href value
                        break;
                    default:
                        amountText = '';
                        hrefValue = '#';
                        break;
                }
                
                // Switch the tab and grid
                switchTab(tab, selectedGrid, amountText, hrefValue);
            }
        });
    });
});