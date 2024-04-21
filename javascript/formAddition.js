document.addEventListener('DOMContentLoaded', function() {
    // Get all the tab items and the form
    const tabItems = document.querySelectorAll('.tab-item');
    const form = document.querySelector('form');
    const messageTextarea = document.querySelector('textarea[name="message"]');
    let activeTabText = 'Individual'; // Default to the first tab

    // Add event listeners to each tab item
    tabItems.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabItems.forEach(t => t.classList.remove('active'));
            
            // Add active class to the clicked tab
            tab.classList.add('active');
            
            // Update the activeTabText variable with the text of the active tab
            activeTabText = tab.querySelector('p').textContent;
        });
    });

    // Add event listener to the form submission
    form.addEventListener('submit', function(event) {
        // Append the active tab text to the message
        messageTextarea.value = `${messageTextarea.value}\n\nI'm a/an ${activeTabText}`;
    });
});