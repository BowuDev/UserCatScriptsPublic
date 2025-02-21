(function () {
    let newHost = GM_getValue("AntiVPN.Host", "photon-reddit.com");
    if (location.href.startsWith("https://www.reddit.com/r/")) {
        if (document.title == "" && document.querySelector(".font-bold.text-24.text-neutral-content-strong")?.textContent === "You've been blocked by network security.") {
            location.host = newHost;
        }
    } else if (location.href.startsWith("https://old.reddit.com/r/")) {
        if (document.title == "Blocked" && document.querySelector("h1")?.textContent === "whoa there, pardner!") {
            location.host = newHost;
        }
    }
})();