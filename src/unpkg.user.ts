import {XM_addMatch} from "macros" with {type: "macro"};

(async function () {
    const NPM_PACKAGE_URL = "https://www.npmjs.com/package/";
    const UNPKG_BROWSE_URL = "https://www.unpkg.com/browse/";
    const UNPKG_BASE_URL = "https://www.unpkg.com/";
    const UNPKG_FAVICON_URL = "https://www.unpkg.com/favicon.ico";
    XM_addMatch("https://www.unpkg.com/browse/*");
    XM_addMatch("https://www.npmjs.com/package/*");
    // Utility to create an anchor element
    const createAnchorElement = (href: string, additionalStyles: Record<string, string> = {}): HTMLAnchorElement => {
        const anchor = document.createElement("a");
        anchor.href = href;
        Object.assign(anchor.style, additionalStyles);
        return anchor;
    };

    // Utility to create an image element
    const createImageElement = (src: string, height: number): HTMLImageElement => {
        const image = document.createElement("img");
        image.src = src;
        image.height = height;
        return image;
    };

    // Check if the page is an NPM package page
    if (location.href.match(NPM_PACKAGE_URL)) {
        console.log("Detected NPM_PACKAGE_URL page, adding favicon and link to UNPKG.");
        const packageTitleElement = document.querySelector("#main h2:first-of-type");
        if (packageTitleElement) {
            const [, , ...packageRaw] = location.pathname.split(/[\/\\]/);
            const packagePath = packageRaw.join("/");
            const anchor = createAnchorElement(`${UNPKG_BASE_URL}${packagePath}/`, {paddingLeft: "1rem"});
            anchor.classList.add("flex");
            const image = createImageElement(UNPKG_FAVICON_URL, 20);
            anchor.appendChild(image);
            packageTitleElement.appendChild(anchor);
        }
    }

    // Check if the page is an UNPKG browse page
    else if (location.href.match(UNPKG_BROWSE_URL)) {
        console.log("Detected UNPKG_BROWSE_URL page, adding link to NPM.");
        const packageTitleElement = document.querySelector("header nav");
        if (packageTitleElement) {
            const originalStrong = packageTitleElement.querySelector("strong");
            if (originalStrong) {
                const anchor = createAnchorElement(`${NPM_PACKAGE_URL}${packageTitleElement.textContent}/`, {
                    textDecorationStyle: "dotted",
                    textDecorationLine: "underline",
                    color: "inherit",
                });
                const strong = document.createElement("strong");
                strong.textContent = packageTitleElement.textContent || ""; // Ensure non-null textContent
                anchor.appendChild(strong);
                originalStrong.replaceWith(anchor);
            }
        }
    }
})();