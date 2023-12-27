const slider = document.querySelector('.slider');
const slides = document.querySelector('.slides');
const images = document.querySelectorAll('.slides img');

let currentIndex = 1;
let slideWidth = images[0].clientWidth;

let canChangeSlide = true;
let debounceTimer;

function debounce() {
    canChangeSlide = true;
}

const cloneFirst = images[0].cloneNode(true);
const cloneSecond = images[1].cloneNode(true);
const cloneLast = images[images.length - 1].cloneNode(true);
const cloneSecondToLast = images[images.length - 2].cloneNode(true);

slides.appendChild(cloneFirst);
slides.appendChild(cloneSecond);
slides.insertBefore(cloneSecondToLast, images[0]);
slides.insertBefore(cloneLast, images[0]);


function goToSlide(index) {
    const offset = -slideWidth * index + slider.clientWidth / 2 - slideWidth / 2;
    slides.style.transform = `translateX(${offset}px)`;
    currentIndex = index;
}

function slideNext() {
    if (canChangeSlide) {
        if (currentIndex >= images.length + 1) {
            slides.style.transition = 'none';
            goToSlide(1);

            setTimeout(() => {
                slides.style.transition = 'transform 0.5s ease';
                goToSlide(2);
            }, 1);
        } else {
            slides.style.transition = 'transform 0.5s ease';
            goToSlide(currentIndex + 1);
        }

        canChangeSlide = false;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(debounce, 200);
    }
}

function slidePrev() {
    if (canChangeSlide) {
        if (currentIndex <= 1) {
            slides.style.transition = 'none';
            goToSlide(images.length + 1);

            setTimeout(() => {
                slides.style.transition = 'transform 0.5s ease';
                goToSlide(images.length);
            }, 1);
        } else {
            slides.style.transition = 'transform 0.5s ease';
            goToSlide(currentIndex - 1);
        }

        canChangeSlide = false;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(debounce, 200); 
    }
}

function handleResize() {
    slideWidth = images[0].clientWidth;
    goToSlide(currentIndex);
}


function fadeInImage(img) {
    img.style.opacity = '1';
  }
  
  // Combine original images and clones into one array
  const allImages = Array.from(images).concat(
    Array.from(slides.querySelectorAll('img'))
  );
  
  function handleImageFadeIn(images) {
    images.forEach((img) => {
      img.addEventListener('load', () => {
        fadeInImage(img);
      });
  
      // If the image is already cached and loaded
      if (img.complete) {
        fadeInImage(img);
      }
    });
  }
  
  // Apply the function to all images (original and clones)
  handleImageFadeIn(allImages);
  


window.addEventListener('resize', handleResize);

document.querySelector('.next').addEventListener('click', slideNext);
document.querySelector('.prev').addEventListener('click', slidePrev);

// Initial centering on page load
goToSlide(1);