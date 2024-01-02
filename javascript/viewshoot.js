function updateImages() {
    const storedProjectID = localStorage.getItem('projectID');
    const gridContainer = document.querySelector('.grid-container');

    const nameMap = {
      // Map project IDs to names
        'project (1)': 'Eda',
        'project (2)': 'Orsen',
        'project (3)': 'Grace',
        'project (4)': 'Joana',
        'project (5)': 'Anton',
    
        'project (6)': 'Lilja',
        'project (7)': 'Natalia',
        'project (8)': 'Sunny',
        'project (9)': 'Anton',
        'project (10)': 'Antonio',
    
        'project (11)': 'Bia',
        'project (12)': 'Con',
        'project (13)': 'Haffi',
        'project (14)': 'Emma',
        'project (15)': 'Kai',
    
        'project (16)': 'Matti',
        'project (17)': 'Zuza',
        'project (18)': 'Nesli',
        'project (19)': 'Sara'
    };

    const projectName = nameMap[storedProjectID] || 'Default Name'; // Get the corresponding name or use a default name

    const modelHeading = document.querySelector('h1');
    const nameElement = modelHeading.querySelector('p:last-child');
    nameElement.textContent = projectName;

    for (let index = 0; index < 50; index++) {
        const imagePath = `/assets/images/${storedProjectID}/img (${index + 1}).JPG`;

        const tempImg = new Image();
        tempImg.onload = function () {
            const img = document.createElement('img');
            img.src = imagePath;
            img.classList.add(`img-${index + 1}`);
            img.setAttribute('loading', 'lazy'); // Add loading="lazy"
            gridContainer.appendChild(img);
        };
        tempImg.src = imagePath;
    }
}

window.addEventListener('load', updateImages);