const cardsContainer = document.querySelector('.cards-container');
const prevButton = document.querySelector('.previous-slide');
const nextButton = document.querySelector('.next-slide');

let cardIndex = 0;

// Retrieve the flag for visited main page from localStorage
const hasVisitedMainPage = localStorage.getItem('visitedMainPage');

function storeCardIndex() {
  localStorage.setItem('cardIndex', cardIndex.toString());
  console.log(cardIndex)
}

function showCard(index) {
  const cardWidth = document.querySelector('.card').offsetWidth;
  cardsContainer.style.transform = `translateX(-${index * cardWidth}px)`;
}

function slidePrev() {
  cardIndex = Math.max(cardIndex - 1, 0);
  showCard(cardIndex);
  storeCardIndex();
}

function slideNext() {
  const cards = document.querySelectorAll('.card');
  cardIndex = Math.min(cardIndex + 1, cards.length - 1);
  showCard(cardIndex);
  storeCardIndex();
}

// Check if the user has visited the main page before
if (hasVisitedMainPage) {
  // Get the stored cardIndex value from localStorage
  const storedCardIndex = localStorage.getItem('cardIndex');
  // If a stored value exists, set cardIndex to that value
  if (storedCardIndex !== null) {
    cardIndex = parseInt(storedCardIndex, 10);
  }
  showCard(cardIndex)
  
} else {
  // If the user hasn't visited the main page before, set cardIndex to 0
  cardIndex = 0;
  // Update the flag to indicate that the main page has been visited
  localStorage.setItem('visitedMainPage', 'true');
}

prevButton.addEventListener('click', slidePrev);
nextButton.addEventListener('click', slideNext);

function modifyCardAndSendValue(clickedCard, projectID) {

  const card = clickedCard; // Get the specific clicked card
  const pola = card.querySelector('.pola');
  const h3Element = pola.querySelector('h3');
  const pElement = pola.querySelector('p');

  const footer = document.querySelector('.footer-container');
  // Add a class to trigger the transition
  pola.classList.add('removeBorderAndShadow');
  h3Element.classList.add('removeTextShadow');
  pElement.classList.add('removeTextShadow');

  footer.style.transition = 'opacity 0.8s ease';
  footer.style.opacity = '0';

  setTimeout(() => {
      card.style.transition = 'transform 0.9s ease';
      card.style.transform = 'translateY(120%)';
  }, 800);

  localStorage.setItem('projectID', projectID);

  // Create an iframe element
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none'; // Hide the iframe from view
  iframe.src = '/viewshoot.html';

  // Append the iframe to the document body to start preloading
  document.body.appendChild(iframe);

  // Listen for the load event on the iframe
  iframe.addEventListener('load', function() {
      // Remove the iframe after it's loaded (optional)
      document.body.removeChild(iframe);

      setTimeout(() => {
          window.location.href = '/viewshoot.html';
      }, 1700);
  });
}

