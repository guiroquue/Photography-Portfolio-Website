function startCountAnimation(targetElement, finalValue, duration) {
    let currentValue = 0;
    const iterations = Math.ceil(duration / 50);
    const increment = finalValue / iterations;

    let iterationCount = 0;
    const interval = setInterval(() => {
        currentValue += increment;
        iterationCount++;
        if (iterationCount === iterations) {
            currentValue = finalValue;
            clearInterval(interval);
        }
        targetElement.textContent = Math.round(currentValue);
    }, 50);
}

window.addEventListener('load', function() {
    const followersElement = document.getElementById('followers');
    const photoshootsElement = document.getElementById('photoshoots');
    const clientsElement = document.getElementById('clients');
    const countriesElement = document.getElementById('countries');

    const maxDuration = 3000; // Set the maximum duration among all animations

    startCountAnimation(followersElement, 250, maxDuration);
    startCountAnimation(photoshootsElement, 19, maxDuration);
    startCountAnimation(clientsElement, 3, maxDuration);
    startCountAnimation(countriesElement, 1, maxDuration);
});