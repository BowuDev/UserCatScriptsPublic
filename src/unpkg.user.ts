// @@match https://www.npmjs.com/package/*

(async function () {
    if (location.href.match("https://www.npmjs.com/package/*")) {
        let packageTitle = document.querySelector("#main h2:first-of-type");
        if (packageTitle) {
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
            packageTitle.appendChild(anchorElement);
        }
    }
})();