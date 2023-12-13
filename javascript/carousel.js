const slides = document.querySelectorAll('.slide');
const indicators = document.querySelector('.indicators');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let index = 0;

function showSlide(n) {
    if (n < 0) {
        index = slides.length - 1;
    } else if (n >= slides.length) {
        index = 0;
    } else {
        index = n;
    }

    slides.forEach(slide => {
        slide.style.display = 'none';
    });

    slides[index].style.display = 'block';

    const dots = document.querySelectorAll('.indicator');
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

function slidePrev() {
    showSlide(index - 1);
}

function slideNext() {
    showSlide(index + 1);
}

prevBtn.addEventListener('click', slidePrev);
nextBtn.addEventListener('click', slideNext);

slides.forEach((slide, i) => {
    const dot = document.createElement('span');
    dot.classList.add('indicator');
    dot.addEventListener('click', () => showSlide(i));
    indicators.appendChild(dot);
});

showSlide(index);
