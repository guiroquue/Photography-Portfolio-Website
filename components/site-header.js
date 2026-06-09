const NAV_ITEMS = [
    { href: "index.html", label: "Projects" },
    { href: "views/about.html", label: "About" },
    { href: "views/faq.html", label: "FAQ" }
];

const SOCIAL_LINKS = [
    {
        href: "https://www.instagram.com/guiroquue/",
        icon: "instagram.svg",
        label: "Instagram"
    },
    {
        href: "https://www.threads.com/@guiroquue?",
        icon: "threads.svg",
        label: "Threads"
    }
];

function getSiteRoot() {
    const isViewPage = window.location.pathname
        .split("/")
        .some((part) => part.toLowerCase() === "views");

    return isViewPage ? "../" : "./";
}

function sitePath(path) {
    return `${getSiteRoot()}${path.replace(/^\.\//, "")}`;
}

window.sitePath = sitePath;

function markImageLoaded(image) {
    image.classList.add("is-loaded");
}

function initImageFades(root = document) {
    root.querySelectorAll("img.image-fade").forEach((image) => {
        if (image.complete) {
            markImageLoaded(image);
            return;
        }

        image.addEventListener("load", () => markImageLoaded(image), { once: true });
        image.addEventListener("error", () => markImageLoaded(image), { once: true });
    });
}

window.initImageFades = initImageFades;

function isCurrentPage(href) {
    const pathname = window.location.pathname.replace(/\/$/, "/index.html").toLowerCase();
    return pathname.endsWith(`/${href.toLowerCase()}`);
}

function createSocialLink({ href, icon, label }) {
    const link = document.createElement("a");
    link.href = href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", label);

    const image = document.createElement("img");
    image.src = sitePath(`assets/icons/${icon}`);
    image.alt = "";
    image.width = 30;
    image.height = 30;
    image.decoding = "async";

    link.appendChild(image);
    return link;
}

function setMenuOpen(isOpen) {
    const menu = document.getElementById("mobile-menu");
    const menuButton = document.querySelector("[data-menu-button]");

    if (!menu || !menuButton) {
        return;
    }

    menu.classList.toggle("open", isOpen);
    menu.inert = !isOpen;
    menu.setAttribute("aria-hidden", String(!isOpen));
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
}

function toggleMenu() {
    const menu = document.getElementById("mobile-menu");
    setMenuOpen(!menu?.classList.contains("open"));
}

function createMenuButton() {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "icon-button";
    button.setAttribute("aria-label", "Open navigation menu");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("data-menu-button", "");
    button.addEventListener("click", toggleMenu);

    const lines = document.createElement("span");
    lines.className = "menu-button-lines";
    lines.setAttribute("aria-hidden", "true");

    for (let index = 0; index < 3; index += 1) {
        const line = document.createElement("span");
        line.className = "menu-line";
        lines.appendChild(line);
    }

    button.appendChild(lines);
    return button;
}

function createNavList(className) {
    const menu = document.createElement("nav");
    menu.className = className;
    menu.setAttribute("aria-label", "Primary navigation");

    const list = document.createElement("ul");
    NAV_ITEMS.forEach((item) => {
        const listItem = document.createElement("li");
        const link = document.createElement("a");

        link.href = sitePath(item.href);
        link.textContent = item.label;

        if (isCurrentPage(item.href)) {
            link.setAttribute("aria-current", "page");
        }

        listItem.appendChild(link);
        list.appendChild(listItem);
    });

    menu.appendChild(list);
    return menu;
}

function createMobileMenu() {
    const menu = createNavList("mobile-menu");
    menu.id = "mobile-menu";
    menu.inert = true;
    menu.setAttribute("aria-hidden", "true");
    menu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => setMenuOpen(false));
    });

    return menu;
}

function renderHeader() {
    const mount = document.getElementById("header-placeholder");

    if (!mount) {
        return;
    }

    const header = document.createElement("header");

    const logo = document.createElement("a");
    logo.className = "site-logo";
    logo.href = sitePath("index.html");
    logo.textContent = "Gui's Photos";

    const nav = createNavList("desktop-nav");

    const actions = document.createElement("div");
    actions.className = "header-actions";
    actions.append(
        ...SOCIAL_LINKS.map(createSocialLink),
        createMenuButton()
    );

    header.append(logo, nav, actions);
    mount.replaceChildren(header, createMobileMenu());
}

document.addEventListener("DOMContentLoaded", renderHeader);
document.addEventListener("DOMContentLoaded", () => initImageFades());
