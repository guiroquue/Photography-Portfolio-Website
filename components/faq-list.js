const faqList = document.getElementById("faq-items-container");
const faqCategoryButtons = document.querySelectorAll("[data-faq-category]");

function createFaqArticle(item, index) {
    const article = document.createElement("article");
    article.className = "faq-item";
    article.style.setProperty("--delay", `${index * 35}ms`);

    const question = document.createElement("button");
    question.type = "button";
    question.className = "faq-question";
    question.setAttribute("aria-expanded", "false");
    question.setAttribute("aria-controls", `faq-answer-${index}`);

    const questionText = document.createElement("span");
    questionText.textContent = item.question;

    const indicator = document.createElement("span");
    indicator.className = "faq-indicator";
    indicator.setAttribute("aria-hidden", "true");

    const answerPanel = document.createElement("div");
    answerPanel.id = `faq-answer-${index}`;
    answerPanel.className = "faq-answer-panel";

    const answer = document.createElement("p");
    answer.className = "faq-answer";
    answer.textContent = item.answer;

    const answerInner = document.createElement("div");
    answerInner.className = "faq-answer-inner";
    answerInner.appendChild(answer);
    answerPanel.appendChild(answerInner);

    question.append(questionText, indicator);
    question.addEventListener("click", () => {
        const isOpen = question.getAttribute("aria-expanded") === "true";
        question.setAttribute("aria-expanded", String(!isOpen));
        article.classList.toggle("open", !isOpen);
    });

    article.append(question, answerPanel);
    return article;
}

function renderFaqList(category = "All") {
    if (!faqList || !Array.isArray(window.faqItems)) {
        return;
    }

    const items = category === "All"
        ? window.faqItems
        : window.faqItems.filter((item) => item.category === category);

    const fragment = document.createDocumentFragment();
    const renderedCategories = new Set();
    let categoryGroup = null;

    items.forEach((item, index) => {
        if (!renderedCategories.has(item.category)) {
            categoryGroup = document.createElement("section");
            categoryGroup.className = "faq-category-group";

            const heading = document.createElement("h2");
            heading.className = "faq-category-title";
            heading.textContent = item.category;
            categoryGroup.appendChild(heading);
            fragment.appendChild(categoryGroup);
            renderedCategories.add(item.category);
        }

        categoryGroup.appendChild(createFaqArticle(item, index));
    });

    faqList.replaceChildren(fragment);
}

function setActiveCategoryButton(activeButton) {
    faqCategoryButtons.forEach((button) => {
        const isActive = button === activeButton;
        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });
}

function initFaqPage() {
    faqCategoryButtons.forEach((button) => {
        button.addEventListener("click", () => {
            setActiveCategoryButton(button);
            renderFaqList(button.dataset.faqCategory);
        });
    });

    renderFaqList("All");
}

initFaqPage();
