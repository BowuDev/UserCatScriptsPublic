(async function () {
    if (location.href.match("https://www.npmjs.com/package/*")) { // @@match https://www.npmjs.com/package/*
        let pkgTitle = document.querySelector("#main h2:first-of-type");
        if (pkgTitle) {
            let [, , ...pkgRaw] = location.pathname.split(/[\/\\]/);
            let pkg = pkgRaw.join("/");
            let anchorElement = document.createElement("a");
            anchorElement.href = `https://www.unpkg.com/${pkg}/`;
            anchorElement.classList.add("flex");
            anchorElement.style.paddingLeft = "1rem";
            let imageElement = document.createElement("img");
            imageElement.src = "https://www.unpkg.com/favicon.ico";
            imageElement.height = 20;
            anchorElement.appendChild(imageElement);
            pkgTitle.appendChild(anchorElement);
        }
    } else if (location.href.match("https://www.unpkg.com/browse/*")) { // @@match https://www.unpkg.com/browse/*
        let pkgTitle = document.querySelector("header nav");
        if (pkgTitle) {
            let originalStrong = pkgTitle.querySelector("strong");
            if (originalStrong) {
                let strongElement = document.createElement("strong");
                strongElement.textContent = pkgTitle.textContent;
                let anchorElement = document.createElement("a");
                anchorElement.href = `https://npmjs.com/${pkgTitle.textContent}/`;
                anchorElement.appendChild(strongElement);
                anchorElement.style.textDecorationStyle = "dotted";
                anchorElement.style.textDecorationLine = "underline";
                anchorElement.style.color = "inherit";
                originalStrong.replaceWith(anchorElement);
            }
        }
    }
})();