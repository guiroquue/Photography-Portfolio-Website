async function updateImages() {
    const storedProjectID = localStorage.getItem('projectID');
    const gridContainer = document.querySelector('.grid-container');
    const modelHeading = document.querySelector('h1');
    const nameElement = modelHeading.querySelector('p:last-child');

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
    nameElement.textContent = projectName;

    async function loadImageAndAppend(index) {
        const imagePath = `/assets/images/${storedProjectID}/img (${index}).JPG`;

        return new Promise((resolve) => {
            const tempImg = new Image();
            tempImg.onload = function () {
                const pTag = document.createElement('p');
                pTag.textContent = `${index}`;
                pTag.style.margin = '0';
                pTag.style.fontSize = '20px';
                gridContainer.appendChild(pTag);

                const img = document.createElement('img');
                img.src = imagePath;
                img.classList.add(`img-${index}`);
                gridContainer.appendChild(img);

                resolve(); // Resolve the promise when the image and pTag are appended
            };
            tempImg.src = imagePath;
        });
    }

    for (let index = 1; index <= 50; index++) {
        await loadImageAndAppend(index);
    }
    const elementsToAnimate = document.querySelectorAll('.animated-fade-in');
    elementsToAnimate.forEach(element => {
        element.classList.add('animated-fade-in');
    });
}

window.addEventListener('load', updateImages);

window.addEventListener('load', function() {
    const gridContainer = document.querySelector('.animated-slide');
    setTimeout(() => {
        gridContainer.classList.add('animated-slide');
    }, 1500);
    
});



document.addEventListener("DOMContentLoaded", function() {
    const pageLinks = document.querySelectorAll('.page-link');

    pageLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default link behavior (navigating to a new page)

            const gridContainer = document.querySelector('.animated-slide');
            if (gridContainer) {
                gridContainer.classList.remove('animated-slide');
                gridContainer.classList.add('animated-slide-reverse'); // Add the reverse animation class
            }


            const elementsToAnimate = document.querySelectorAll('.animated-fade-in');
            elementsToAnimate.forEach(element => {
                element.classList.remove('animated-fade-in');
                element.classList.add('animated-fade-out');
            });

            // Trigger the reverse animations first
            // Then navigate to the new page after the animations complete
            setTimeout(function() {
                window.location.href = link.href; // Redirect to the target page
            }, 2000);
        });
    });
});

