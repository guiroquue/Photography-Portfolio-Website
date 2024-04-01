// Function to set text according to the stored language
function setTextAccordingToStoredLanguage() {
    // Get the current language from local storage or default to 'en'
    let currentLanguage = localStorage.getItem('language') || 'en';

    // Call translateText function with the current language
    translateText(currentLanguage);
}

// Function to toggle language
window.toggleLanguage = function() {
    // Get the current language from local storage or default to 'en'
    let currentLanguage = localStorage.getItem('language') || 'en';
    
    // Toggle between 'en' and 'is' languages
    currentLanguage = currentLanguage === 'en' ? 'is' : 'en';

    // Store the updated language in local storage
    localStorage.setItem('language', currentLanguage);

    // Call translateText function with the updated language
    translateText(currentLanguage);
}

// Function to translate text based on the selected language
function translateText(currentLanguage) {
    translateGlobalElements(currentLanguage)

    let currentPage = window.location.pathname;

    if (currentPage = "/Commercial.html") {
        return
    } else if (currentPage = "/pricing.html") {
        return
    } else if (currentPage = "/about.html") {
        return
    } else if (currentPage = "/faq.html") {
        return
    } 
}

function translateGlobalElements(currentLanguage) {
    // Fetch translation data based on the current language
    fetch(`./pageTranslations/${currentLanguage}.json`)
    .then(response => response.json()) // Parse the response as JSON
    .then(data => {
        // Set text content for different elements based on the translation data
        document.getElementById("sidebar-portraits-link").textContent = data.sidebarPortraitsLink;
        document.getElementById("sidebar-commercial-link").textContent = data.sidebarCommercialLink;
        document.getElementById("sidebar-pricing-link").textContent = data.sidebarPricingLink;
        document.getElementById("sidebar-about-link").textContent = data.sidebarAboutLink;
        document.getElementById("sidebar-faq-link").textContent = data.sidebarFaqLink;

        document.getElementById("copyright-text").innerHTML  = data.copyrightText;
    })
    .catch(error => console.error('Error loading translation:', error)); // Handle errors
}

// Set text according to the stored language when the DOM content is loaded
document.addEventListener("DOMContentLoaded", setTextAccordingToStoredLanguage);