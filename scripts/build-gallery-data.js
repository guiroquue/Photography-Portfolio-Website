const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");

const PROJECT_ROOT = path.resolve(__dirname, "..");
const IMAGE_ROOT = path.join(PROJECT_ROOT, "assets", "images");
const METADATA_FILE = path.join(PROJECT_ROOT, "data", "gallery-meta.json");
const OUTPUT_FILE = path.join(PROJECT_ROOT, "data", "gallery.js");
const SITEMAP_FILE = path.join(PROJECT_ROOT, "sitemap.xml");
const SITE_ORIGIN = "https://eoqrupics.com";
const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
const EXCLUDED_IMAGES = new Set(["assets/images/about-portrait.jpg"]);
const STATIC_SITEMAP_PAGES = [
    { path: "/", changefreq: "weekly", priority: "1.0" },
    { path: "/views/about.html", changefreq: "monthly", priority: "0.7" },
    { path: "/views/faq.html", changefreq: "monthly", priority: "0.6" }
];

function toWebPath(filePath) {
    return filePath.split(path.sep).join("/");
}

function readGalleryMetadata() {
    if (!fs.existsSync(METADATA_FILE)) {
        return {};
    }

    return JSON.parse(fs.readFileSync(METADATA_FILE, "utf8"));
}

function findImageFiles(directory) {
    const entries = fs.readdirSync(directory, { withFileTypes: true });

    return entries.flatMap((entry) => {
        const fullPath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
            return findImageFiles(fullPath);
        }

        if (!entry.isFile() || !IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
            return [];
        }

        return [fullPath];
    });
}

function getLastCommitTimestamp(relativePath) {
    try {
        const timestamp = execFileSync(
            "git",
            ["log", "-1", "--format=%ct", "--", relativePath],
            { cwd: PROJECT_ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }
        ).trim();

        return timestamp ? Number(timestamp) : null;
    } catch {
        return null;
    }
}

function getImageTimestamp(fullPath, relativePath) {
    return getLastCommitTimestamp(relativePath) || Math.round(fs.statSync(fullPath).mtimeMs / 1000);
}

function getPngDimensions(buffer) {
    const pngSignature = "89504e470d0a1a0a";

    if (buffer.length < 24 || buffer.subarray(0, 8).toString("hex") !== pngSignature) {
        return null;
    }

    return {
        width: buffer.readUInt32BE(16),
        height: buffer.readUInt32BE(20)
    };
}

function getGifDimensions(buffer) {
    const signature = buffer.subarray(0, 6).toString("ascii");

    if (buffer.length < 10 || !["GIF87a", "GIF89a"].includes(signature)) {
        return null;
    }

    return {
        width: buffer.readUInt16LE(6),
        height: buffer.readUInt16LE(8)
    };
}

function isJpegStartOfFrame(marker) {
    return [
        0xc0,
        0xc1,
        0xc2,
        0xc3,
        0xc5,
        0xc6,
        0xc7,
        0xc9,
        0xca,
        0xcb,
        0xcd,
        0xce,
        0xcf
    ].includes(marker);
}

function getJpegDimensions(buffer) {
    if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) {
        return null;
    }

    let offset = 2;

    while (offset < buffer.length) {
        while (buffer[offset] === 0xff) {
            offset += 1;
        }

        const marker = buffer[offset];
        offset += 1;

        if (marker === 0xd9 || marker === 0xda) {
            break;
        }

        if ((marker >= 0xd0 && marker <= 0xd7) || marker === 0x01) {
            continue;
        }

        if (offset + 2 > buffer.length) {
            break;
        }

        const segmentLength = buffer.readUInt16BE(offset);

        if (segmentLength < 2 || offset + segmentLength > buffer.length) {
            break;
        }

        if (isJpegStartOfFrame(marker) && segmentLength >= 7) {
            return {
                width: buffer.readUInt16BE(offset + 5),
                height: buffer.readUInt16BE(offset + 3)
            };
        }

        offset += segmentLength;
    }

    return null;
}

function getWebpDimensions(buffer) {
    const isWebp = buffer.length >= 30
        && buffer.subarray(0, 4).toString("ascii") === "RIFF"
        && buffer.subarray(8, 12).toString("ascii") === "WEBP";

    if (!isWebp) {
        return null;
    }

    let offset = 12;

    while (offset + 8 <= buffer.length) {
        const chunkType = buffer.subarray(offset, offset + 4).toString("ascii");
        const chunkSize = buffer.readUInt32LE(offset + 4);
        const dataOffset = offset + 8;

        if (dataOffset + chunkSize > buffer.length) {
            break;
        }

        if (chunkType === "VP8X" && chunkSize >= 10) {
            return {
                width: buffer.readUIntLE(dataOffset + 4, 3) + 1,
                height: buffer.readUIntLE(dataOffset + 7, 3) + 1
            };
        }

        if (chunkType === "VP8L" && chunkSize >= 5 && buffer[dataOffset] === 0x2f) {
            const bits = buffer.readUInt32LE(dataOffset + 1);

            return {
                width: (bits & 0x3fff) + 1,
                height: ((bits >> 14) & 0x3fff) + 1
            };
        }

        if (
            chunkType === "VP8 "
            && chunkSize >= 10
            && buffer[dataOffset + 3] === 0x9d
            && buffer[dataOffset + 4] === 0x01
            && buffer[dataOffset + 5] === 0x2a
        ) {
            return {
                width: buffer.readUInt16LE(dataOffset + 6) & 0x3fff,
                height: buffer.readUInt16LE(dataOffset + 8) & 0x3fff
            };
        }

        offset = dataOffset + chunkSize + (chunkSize % 2);
    }

    return null;
}

function getImageDimensions(fullPath) {
    const buffer = fs.readFileSync(fullPath);
    const extension = path.extname(fullPath).toLowerCase();

    if ([".jpg", ".jpeg"].includes(extension)) {
        return getJpegDimensions(buffer);
    }

    if (extension === ".png") {
        return getPngDimensions(buffer);
    }

    if (extension === ".gif") {
        return getGifDimensions(buffer);
    }

    if (extension === ".webp") {
        return getWebpDimensions(buffer);
    }

    return null;
}

function slugify(value) {
    return value
        .replace(/^assets\/images\//i, "")
        .replace(/\.[^.]+$/, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function hashPath(value) {
    return `work-${crypto.createHash("sha1").update(value).digest("hex").slice(0, 8)}`;
}

function titleFromPath(relativePath) {
    const basename = path.basename(relativePath, path.extname(relativePath));
    return basename
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/[_-]+/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function createGalleryImage(fullPath, metadataByPath) {
    const relativePath = toWebPath(path.relative(PROJECT_ROOT, fullPath));
    const metadata = metadataByPath[relativePath] || {};
    const derivedTitle = titleFromPath(relativePath);
    const alt = metadata.alt || `${derivedTitle} photograph by Gui Roque`;
    const dimensions = getImageDimensions(fullPath);

    return {
        id: metadata.slug || slugify(derivedTitle) || hashPath(relativePath),
        src: relativePath,
        alt,
        createdAt: getImageTimestamp(fullPath, relativePath),
        width: dimensions?.width,
        height: dimensions?.height,
        cameraSettings: metadata.cameraSettings,
        imageResolution: metadata.imageResolution
    };
}

function writeGalleryData(images) {
    const contents = `// Generated by scripts/build-gallery-data.js. Do not edit by hand.
window.galleryImages = ${JSON.stringify(images, null, 4)};
`;

    fs.writeFileSync(OUTPUT_FILE, contents);
}

function formatSitemapDate(timestamp) {
    return new Date(timestamp * 1000).toISOString().slice(0, 10);
}

function escapeXml(value) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

function createSitemapUrl({ path: urlPath, lastmod, changefreq, priority }) {
    return `    <url>
        <loc>${escapeXml(`${SITE_ORIGIN}${urlPath}`)}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>${changefreq}</changefreq>
        <priority>${priority}</priority>
    </url>`;
}

function writeSitemap(images) {
    const newestTimestamp = images.length
        ? Math.max(...images.map((image) => image.createdAt))
        : Math.round(Date.now() / 1000);
    const siteLastmod = formatSitemapDate(newestTimestamp);
    const staticPages = STATIC_SITEMAP_PAGES.map((page) => ({
        ...page,
        lastmod: siteLastmod
    }));
    const workPages = images.map((image) => ({
        path: `/views/work.html?id=${encodeURIComponent(image.id)}`,
        lastmod: formatSitemapDate(image.createdAt),
        changefreq: "monthly",
        priority: "0.5"
    }));
    const contents = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticPages, ...workPages].map(createSitemapUrl).join("\n")}
</urlset>
`;

    fs.writeFileSync(SITEMAP_FILE, contents);
}

function main() {
    const metadataByPath = readGalleryMetadata();
    const images = findImageFiles(IMAGE_ROOT)
        .filter((fullPath) => !EXCLUDED_IMAGES.has(toWebPath(path.relative(PROJECT_ROOT, fullPath))))
        .map((fullPath) => createGalleryImage(fullPath, metadataByPath))
        .sort((a, b) => b.createdAt - a.createdAt || a.src.localeCompare(b.src));

    writeGalleryData(images);
    writeSitemap(images);
    console.log(`Generated ${toWebPath(path.relative(PROJECT_ROOT, OUTPUT_FILE))} and sitemap.xml with ${images.length} images.`);
}

main();
