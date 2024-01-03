const cardsContainer = document.querySelector('.cards-container');
const prevButton = document.querySelector('.previous-slide');
const nextButton = document.querySelector('.next-slide');

let cardIndex = 0;
let touchStartX = 0;
let touchEndX = 0;

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
});

cardsContainer.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].clientX;
  handleGesture();
});

function handleGesture() {
  const sensitivity = 20; // Adjust this value for swipe sensitivity
  if (touchEndX < touchStartX - sensitivity) {
    slideNext();
  } else if (touchEndX > touchStartX + sensitivity) {
    slidePrev();
  }
}
