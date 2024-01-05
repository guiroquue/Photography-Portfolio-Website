

//HAMBURGER MENU LOGIC
document.querySelector('.hamburger-menu').addEventListener('click', function() {
    const isActive = overlay.classList.contains('active');

    if (isActive == true) {
        setTimeout(() => {
            document.querySelector('.overlay').classList.toggle('active');
        }, 200);
    } else {
        document.querySelector('.overlay').classList.toggle('active');
    }
});

document.getElementById('hamburgerMenu').addEventListener('click', function() {
    const isActive = overlay.classList.contains('active');
    const footer = document.querySelector('.footer-container');

    if (isActive) {
        this.classList.toggle('active');
        enableScroll()

        if (window.location.href.includes('/Commercial.html') || window.location.href.includes('/about.html') || window.location.href.includes('/viewshoot.html') || window.location.href.includes('/prints.html')) {
            setTimeout(function() {
                if (footer) {
                    footer.style.transition = 'opacity 0.2s ease-in-out';
                    footer.style.position = 'relative';
                    footer.style.opacity = '1';
                }
            }, 100);
        }
    } else {
        this.classList.toggle('active');
        smoothScrollToTop();
        disableScroll()

        if (window.location.href.includes('/Commercial.html') || window.location.href.includes('/about.html') || window.location.href.includes('/viewshoot.html') || window.location.href.includes('/prints.html')) {
            footer.style.opacity = '0';
        
            setTimeout(function() {
                if (footer) {
                    footer.style.transition = 'opacity 1s ease-in-out';
                    footer.style.position = 'absolute';
                    footer.style.opacity = '1';
                }
            }, 200);
        }
        
    }
    
});


function toggleOverlay() {
    const overlay = document.querySelector('.overlay');
    const isActive = overlay.classList.contains('active');
    
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const isMenuActive = hamburgerMenu.classList.contains('active');

    const itemsInOverlay = document.querySelector('.items-in-overlay');

    const footer = document.querySelector('.footer-container');

    if (window.innerWidth >= 768 && isActive) {
        overlay.classList.remove('active');

        if (window.location.href.includes('/Commercial.html') || window.location.href.includes('/about.html') || window.location.href.includes('/viewshoot.html')  || window.location.href.includes('/prints.html')) {
            footer.style.position = 'relative';
            enableScroll()
        }
    }

    if (window.innerWidth >= 768 && isMenuActive) {
        hamburgerMenu.classList.remove('active');
        itemsInOverlay.style.transition = 'opacity 0.15s ease';
        itemsInOverlay.classList.remove('visible'); 
    }
}

// Disable scrolling
function disableScroll() {
    document.body.style.overflow = 'hidden';
}
  
// Enable scrolling
function enableScroll() {
    document.body.style.overflow = ''; // Reset to default value
}

// Function to smoothly scroll to the top
function smoothScrollToTop() {
    const currentPosition = window.scrollY || document.documentElement.scrollTop;

    if (currentPosition > 0) {
        window.requestAnimationFrame(smoothScrollToTop);
        window.scrollTo(0, currentPosition - currentPosition / 8);
    }
}


window.addEventListener('resize', toggleOverlay);
toggleOverlay();


const overlay = document.querySelector('.hamburger-menu');

const prevCarouselButton = document.querySelector('.previous-slide');
const nextCarouselButton = document.querySelector('.next-slide');

function toggleButtonsVisibility() {
    if (overlay.classList.contains('active')) {
        prevCarouselButton.style.opacity = '0';
        nextCarouselButton.style.opacity = '0';
        prevCarouselButton.style.pointerEvents = 'none'; 
        nextCarouselButton.style.pointerEvents = 'none'; 
    } else {
        prevCarouselButton.style.opacity = '1';
        nextCarouselButton.style.opacity = '1';
        prevCarouselButton.style.pointerEvents = 'auto';
        nextCarouselButton.style.pointerEvents = 'auto'; 
    }
}

overlay.addEventListener('click', toggleButtonsVisibility);
toggleButtonsVisibility();

document.querySelector('.hamburger-menu').addEventListener('click', function() {
    const isActive = overlay.classList.contains('active');
    const itemsInOverlay = document.querySelector('.items-in-overlay');

    if (isActive == true) {
        setTimeout(() => {
            itemsInOverlay.style.transition = 'opacity 0.5s ease';
            itemsInOverlay.classList.add('visible');
        }, 350);
    } else {
        setTimeout(() => {
        itemsInOverlay.style.transition = 'opacity 0.5s ease';
        itemsInOverlay.classList.remove('visible'); 
    }, 50);
    }
});

window.addEventListener('load', function() {
    const loadingOverlay = document.querySelector('.loading-overlay');
    const overlay = document.querySelector('.overlay');
    const headerContainer = document.querySelector('#header-container');
    const slider = document.querySelector('.slider');
    const footerContainer = document.querySelector('.footer-container');
    
    let hasVisitedMainPage = localStorage.getItem('visitedMainPage');

    if (window.location.href.includes('/Commercial.html') || window.location.href.includes('/about.html') || window.location.href.includes('/viewshoot.html') || window.location.href.includes('/faq.html') || window.location.href.includes('/prints.html')) {
        setTimeout(() => {
            loadingOverlay.classList.add('loaded');
        }, 400);
    } else {
        if (hasVisitedMainPage) {
            setTimeout(() => {
                loadingOverlay.classList.add('loaded');
            }, 400);

            setTimeout(() => {
    
                overlay.style.opacity = '1';
                overlay.style.transform = 'translateY(0)';
                headerContainer.style.opacity = '1';
                headerContainer.style.transform = 'translateY(0)';
        
                slider.style.opacity = '1';
                slider.style.transform = 'translateY(0)';
            }, 100); 
            
            setTimeout(() => {
                // Slide up footer after a delay
                footerContainer.style.opacity = '1';
                footerContainer.style.transform = 'translateY(0)';
            }, 800);
        } else {
            setTimeout(() => {
                loadingOverlay.classList.add('loaded');
            }, 2000);
            localStorage.setItem('visitedMainPage', true);

            setTimeout(() => {
    
                overlay.style.opacity = '1';
                overlay.style.transform = 'translateY(0)';
                headerContainer.style.opacity = '1';
                headerContainer.style.transform = 'translateY(0)';
        
                slider.style.opacity = '1';
                slider.style.transform = 'translateY(0)';
            }, 2500); 
            
            setTimeout(() => {
                // Slide up footer after a delay
                footerContainer.style.opacity = '1';
                footerContainer.style.transform = 'translateY(0)';
            }, 3200);
        }
    }
});