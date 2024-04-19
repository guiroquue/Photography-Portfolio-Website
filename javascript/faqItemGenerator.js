// Fetch FAQ data from JSON file - for ease of creating new faq items
fetch('./json/faqQuestionsAnswers.json')
.then(response => response.json())
.then(data => {
    const faqContainer = document.getElementById('faq-container');

    data.forEach(item => {
        const faqItem = document.createElement('div');
        faqItem.classList.add('faq-item');

        const faqInfo = document.createElement('div');
        faqInfo.classList.add('faq-info');

        const question = document.createElement('h3');
        question.textContent = item.question;

        const button = document.createElement('button');
        const buttonImg = document.createElement('img');
        buttonImg.src = './assets/images/icons/arrowDown.png';
        button.appendChild(buttonImg);

        const faqAnswer = document.createElement('div');
        faqAnswer.classList.add('faq-answer');
        faqAnswer.innerHTML = `<p>${item.answer}</p>`;

        faqItem.appendChild(faqInfo);
        faqInfo.appendChild(question);
        faqInfo.appendChild(button);
        faqItem.appendChild(faqAnswer);

        faqItem.addEventListener('click', function() {
            toggleAnswer(this.querySelector('button'), this.querySelector('.faq-answer'));
        });

        faqContainer.appendChild(faqItem);
    });
})
.catch(error => console.error('Error fetching FAQ data:', error));

function toggleAnswer(button, answer) {
    answer.classList.toggle('show');
    button.classList.toggle('rotate');
}