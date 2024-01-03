

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

        if (window.location.href.includes('/Commercial.html') || window.location.href.includes('/about.html') || window.location.href.includes('/viewshoot.html')) {
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

        if (window.location.href.includes('/Commercial.html') || window.location.href.includes('/about.html') || window.location.href.includes('/viewshoot.html')) {
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

        if (window.location.href.includes('/Commercial.html') || window.location.href.includes('/about.html') || window.location.href.includes('/viewshoot.html')) {
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

    setTimeout(() => {
        loadingOverlay.classList.add('loaded');
    }, 500);
});

function sendValue(projectID) {
    localStorage.setItem('projectID', projectID);
    window.location.href = '/viewshoot.html';
}