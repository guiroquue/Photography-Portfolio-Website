const workContainer = document.getElementById("work-details");

function getWorkIdFromUrl() {
    return new URLSearchParams(window.location.search).get("id");
}

function appendText(parent, tagName, text, className) {
    if (!text) {
        return null;
    }

    const element = document.createElement(tagName);
    element.textContent = text;

    if (className) {
        element.className = className;
    }

    parent.appendChild(element);
    return element;
}

function createCameraInfo(work) {
    const card = document.createElement("section");
    card.className = "detail-card";

    const heading = document.createElement("h2");
    heading.textContent = "Camera";
    card.appendChild(heading);

    [work.cameraSettings, work.imageResolution]
        .filter(Boolean)
        .forEach((item) => appendText(card, "p", item));
    return card;
}

function createDetailMeta(work) {
    if (!work.cameraSettings && !work.imageResolution) {
        return null;
    }

    const metadata = document.createElement("div");
    metadata.className = "detail-meta";
    metadata.appendChild(createCameraInfo(work));
    return metadata;
}

function renderWork(work) {
    const image = document.createElement("img");
    image.className = "image-fade";
    image.src = window.sitePath ? window.sitePath(work.src) : work.src;
    image.alt = work.alt;

    if (work.width && work.height) {
        image.width = work.width;
        image.height = work.height;
    }

    const media = document.createElement("div");
    media.className = "media-block";
    media.appendChild(image);

    const content = [
        media,
        createDetailMeta(work)
    ].filter(Boolean);

    workContainer.replaceChildren(...content);
    window.initImageFades?.(workContainer);
    document.title = "Selected Work | Gui's Photos";
}

function renderMessage(message) {
    const emptyState = document.createElement("p");
    emptyState.className = "empty-state";
    emptyState.textContent = message;
    workContainer.replaceChildren(emptyState);
}

function initWorkPage() {
    if (!workContainer || !Array.isArray(window.galleryImages)) {
        return;
    }

    const workId = getWorkIdFromUrl();
    const work = window.galleryImages.find((item) => item.id === workId);

    if (!work) {
        renderMessage("Image not found.");
        return;
    }

    renderWork(work);
}

document.addEventListener("DOMContentLoaded", initWorkPage);
