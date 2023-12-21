function handleResize() {
    const windowWidth = window.innerWidth;
    const headerLinks = document.getElementById('headerLinks');
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    
    if (windowWidth >= 20) {
        headerLinks.style.display = 'none';
        hamburgerMenu.style.display = 'block';
        
    } else {
        headerLinks.style.display = 'block';
        headerLinks.style.position = 'static';
        hamburgerMenu.style.display = 'none';
    }
}


function toggleMenu() {
    const headerLinks = document.getElementById('headerLinks');
    const overlay = document.getElementById('overlay');

    const body = document.body;

    if (headerLinks.style.display === 'none' || headerLinks.style.display === '') {
        
        headerLinks.style.display = 'block';
        headerLinks.style.position = 'absolute';
        headerLinks.style.top = '50%';
        headerLinks.style.left = '50%';
        headerLinks.style.transform = 'translate(-50%, -50%)';
        

        body.style.overflow = 'hidden';
        

        overlay.style.display = 'block';
        overlay.style.pointerEvents = 'auto';

    } else {
        headerLinks.style.display = 'block';
        headerLinks.style.display = 'none';

        headerLinks.style.position = 'static';
        headerLinks.style.top = '0%';
        headerLinks.style.left = '0%';
        headerLinks.style.transform = 'translate(0%, 0%)';

        body.style.overflow = 'auto';

        overlay.style.display = 'none';
        overlay.style.pointerEvents = 'none';
    }
}

function sendValue(projectID) {
    console.log('Sending value:');
    localStorage.setItem('projectID', projectID);
    window.location.href = '/viewProject.html';
    
} 


// Call the function when the window is resized
window.addEventListener('resize', handleResize);

// Call the function once when the page initially loads
window.addEventListener('load', handleResize);


