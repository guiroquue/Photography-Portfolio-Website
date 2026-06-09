const galleryGrid = document.getElementById("image-grid");

function createWorkCard(image, index) {
    const card = document.createElement("article");
    card.className = "gallery-item";
    card.style.setProperty("--delay", `${index * 32}ms`);

    const link = document.createElement("a");
    const detailPage = window.sitePath ? window.sitePath("views/work.html") : "./views/work.html";
    link.href = `${detailPage}?id=${encodeURIComponent(image.id)}`;
    link.setAttribute("aria-label", `Open details for ${image.alt || "selected work"}`);

    const photo = document.createElement("img");
    photo.className = "image-fade";
    photo.src = window.sitePath ? window.sitePath(image.src) : image.src;
    photo.alt = image.alt;
    photo.loading = "lazy";
    photo.decoding = "async";

    link.appendChild(photo);
    card.appendChild(link);
    return card;
}

function renderGallery() {
    if (!galleryGrid || !Array.isArray(window.galleryImages)) {
        return;
    }

    if (!window.galleryImages.length) {
        const emptyState = document.createElement("p");
        emptyState.className = "empty-state";
        emptyState.textContent = "No gallery images found.";
        galleryGrid.replaceChildren(emptyState);
        return;
    }

    galleryGrid.replaceChildren(...window.galleryImages.map(createWorkCard));
    window.initImageFades?.(galleryGrid);
}

renderGallery();
