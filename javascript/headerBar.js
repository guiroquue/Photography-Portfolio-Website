const navSlide = () => {
  const hamburger = document.querySelector('.hamburger-menu');
  const nav = document.querySelector('.overlay');
  const closeBtn = document.querySelector('.close-btn');

  const navLinks = document.getElementsByClassName('nav-links');

  hamburger.addEventListener('click', () => {
    nav.classList.add('active');
    const navLinks = document.querySelector('.nav-links');

    closeBtn.style.display = 'block';
    navLinks.style.display = '';
  });

  closeBtn.addEventListener('click', () => {
    nav.classList.remove('active');
    const navLinks = document.querySelector('.nav-links');

    closeBtn.style.display = 'none';
    navLinks.style.display = 'none';
  });
};

navSlide();


function handleWindowSize() {
  const minWidth = 768;
  const closeBtn = document.querySelector('.close-btn');
  const nav = document.querySelector('.overlay');

  // Check the current window width
  const currentWidth = window.innerWidth;

  const navLinks = document.querySelector('.nav-links');

  if (currentWidth <= minWidth) {
    navLinks.style.display = 'none';
  } else {
    navLinks.style.display = '';
    closeBtn.style.display = 'none';
    nav.classList.remove('active');
  }
}

window.addEventListener('resize', handleWindowSize);

handleWindowSize();



function sendValue(projectID) {
  localStorage.setItem('projectID', projectID);
  window.location.href = '/viewshoot.html';
}