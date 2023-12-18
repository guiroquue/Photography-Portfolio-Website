

function updateImages() {
    const storedValue = localStorage.getItem('projectID');

    const allImages = document.querySelectorAll('img');
    let index = 0;
    allImages.forEach((img, index) => {
        img.src = `/assets/images/${storedValue}/img (${index + 1}).jpg`;
    }); 
};

window.addEventListener('load', updateImages());

