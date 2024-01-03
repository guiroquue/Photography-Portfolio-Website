const cardsContainer = document.querySelector('.cards-container');
const prevButton = document.querySelector('.previous-slide');
const nextButton = document.querySelector('.next-slide');

let cardIndex = 0;
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;

function showCard(index) {
  const cardWidth = document.querySelector('.card').offsetWidth;
  cardsContainer.style.transform = `translateX(-${index * cardWidth}px)`;
}

function slidePrev() {
  cardIndex = Math.max(cardIndex - 1, 0);
  showCard(cardIndex);
}

function slideNext() {
  const cards = document.querySelectorAll('.card');
  cardIndex = Math.min(cardIndex + 1, cards.length - 1);
  showCard(cardIndex);
}

prevButton.addEventListener('click', slidePrev);
nextButton.addEventListener('click', slideNext);

cardsContainer.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
});

cardsContainer.addEventListener('touchmove', (e) => {
  touchEndX = e.touches[0].clientX;
  touchEndY = e.touches[0].clientY;
});

cardsContainer.addEventListener('touchend', (e) => {
  const sensitivity = 50; // Adjust this value for swipe sensitivity
  const deltaX = touchEndX - touchStartX;
  const deltaY = touchEndY - touchStartY;
  if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > sensitivity) {
    if (deltaX > 0) {
      slidePrev();
    } else {
      slideNext();
    }
  }
});
