const cardsContainer = document.querySelector('.cards-container');
const prevButton = document.querySelector('.previous-slide');
const nextButton = document.querySelector('.next-slide');

let cardIndex = 0;

function showCard(index) {
  const cards = document.querySelectorAll('.card');
  cardsContainer.style.transform = `translateX(-${index * 100}%)`;
}

prevButton.addEventListener('click', () => {
  cardIndex = Math.max(cardIndex - 1, 0);
  showCard(cardIndex);
});

nextButton.addEventListener('click', () => {
  const cards = document.querySelectorAll('.card');
  cardIndex = Math.min(cardIndex + 1, cards.length - 1);
  showCard(cardIndex);
});

// Optional: Add swipe functionality using touch events

let touchStartX = 0;
let touchEndX = 0;

cardsContainer.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
});

cardsContainer.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].clientX;
  handleGesture();
});

function handleGesture() {
  if (touchEndX < touchStartX) {
    nextButton.click();
  } else if (touchEndX > touchStartX) {
    prevButton.click();
  }
}
