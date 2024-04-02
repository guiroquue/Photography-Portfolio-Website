// Execute the following code once the DOM content is loaded
document.addEventListener("DOMContentLoaded", function () {
    // Get references to placeholder elements
    const headerPlaceholder = document.getElementById('header-placeholder');
    const sidebarPlaceholder = document.getElementById('navigation-sidebar-placeholder');
    
    // XMLHttpRequest to load header content
    const headerXhr = new XMLHttpRequest();
    headerXhr.open('GET', '/htmlElements/header.html', true);
    headerXhr.onreadystatechange = function () {
        if (headerXhr.readyState === 4 && headerXhr.status === 200) {
            headerPlaceholder.innerHTML = headerXhr.responseText; // Set header content
        }
    };
    headerXhr.send(); // Send XMLHttpRequest to load header content

    // XMLHttpRequest to load sidebar content
    const sidebarXhr = new XMLHttpRequest();
    sidebarXhr.open('GET', '/htmlElements/sidebar.html', true);
    sidebarXhr.onreadystatechange = function () {
        if (sidebarXhr.readyState === 4 && sidebarXhr.status === 200) {
            sidebarPlaceholder.innerHTML = sidebarXhr.responseText; // Set sidebar content
        }
    };
    sidebarXhr.send(); // Send XMLHttpRequest to load sidebar content
});

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        const slideIn = document.getElementById('slide-in-content-holder');
        slideIn.classList.add('active'); // Add 'active' class to slide in
    }, 1000); // Adjust the delay time (in milliseconds) as needed
});

function handleNavigation(event) {
    event.preventDefault(); // Prevent default navigation behavior
    const slideIn = document.getElementById('slide-in-content-holder');
    
    // Get the destination URL from the data-destination attribute
    var destination = event.currentTarget.dataset.destination;
    
    console.log('Clicked link:', event.target); // Debugging
    console.log('Destination:', destination); // Debugging
    
    // Remove 'active' class to trigger slide-out animation
    slideIn.classList.remove('active');
    slideIn.classList.add('active-out');
    
    // Wait for the animation to complete (adjust time according to CSS transition)
    setTimeout(function() {
        // Navigate to the new page
        window.location.href = destination;
    }, 1200); // Assuming the slide-out animation duration is 0.5s (500 milliseconds)
}

function toggleMobileNavMenu() {
    const mobileSideMenuSlide = document.getElementById('mobile-side-navigation-container');
    if (mobileSideMenuSlide.classList.contains('active')) {
        mobileSideMenuSlide.classList.remove('active'); // Remove 'active' class to slide out
    } else {
        mobileSideMenuSlide.classList.add('active'); // Add 'active' class to slide in
    }
}
