window.addEventListener('resize', function() {
    const windowWidth = window.innerWidth;

    const headerLinks = document.getElementById('headerLinks');

    if (windowWidth <= 1200) {
        headerLinks.style.display = 'none';
        hamburgerMenu.style.display = 'block';

    } else {
        headerLinks.style.display = 'block';
        headerLinks.style.position = 'static';
        hamburgerMenu.style.display = 'none';

    }
});

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

        headerLinks.style.top = '0%';
        headerLinks.style.left = '0%';
        headerLinks.style.transform = 'translate(0%, 0%)';

        body.style.overflow = 'auto';

        overlay.style.display = 'none';
        overlay.style.pointerEvents = 'none';
    }
}


window.dispatchEvent(new Event('resize'));

document.addEventListener('touchmove', function(event) {
    if (event.scale !== 1) { event.preventDefault(); }
}, { passive: false });

