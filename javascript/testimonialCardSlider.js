const faqItems = document.querySelectorAll('.testimonial-item');
const totalItems = document.querySelector('.total');

const prevButton = document.querySelector('.previous-question');
const nextButton = document.querySelector('.next-question');

let currentItem = 0;

totalItems.textContent = faqItems.length;


function showItem(index) {
    const currentItemElement = faqItems[currentItem];
    currentItemElement.style.opacity = 0;

    setTimeout(() => {
        faqItems.forEach(item => {
            item.classList.remove('active');
            item.style.display = 'none';
        });

        const nextItemElement = faqItems[index];
        nextItemElement.style.display = 'block';
        nextItemElement.style.opacity = 0;

        setTimeout(() => {
        nextItemElement.style.opacity = 1;
        nextItemElement.classList.add('active');
        }, 80);

        updateCounter(index);
    }, 500);

    currentItem = index;
}

function updateCounter(index) {
    const counter = document.querySelector('.counter');
    counter.textContent = `${index + 1} / ${faqItems.length}`;
}

prevButton.addEventListener('click', () => {
    const previousItem = (currentItem === 0) ? faqItems.length - 1 : currentItem - 1;
    showItem(previousItem);
});

nextButton.addEventListener('click', () => {
    const nextItem = (currentItem === faqItems.length - 1) ? 0 : currentItem + 1;
    showItem(nextItem);
});

showItem(currentItem);