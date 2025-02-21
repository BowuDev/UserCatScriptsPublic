// ==UserScript==
// @name [BOWUDEV] Reddit
// @description [ANTI-VPN] Upon failure to open Reddit, redirect to provided setting in config.
// @match https://www.reddit.com/r/*
// @match https://old.reddit.com/r/*
// @grant GM_notification
// @grant GM_setValue
// @grant GM_getValue
// @version 2025.1.21.16
// @namespace https://github.com/BowuDev/UserCatScriptsPublic
// @homepageURL https://github.com/BowuDev/UserCatScriptsPublic
// @downloadURL https://github.com/BowuDev/UserCatScriptsPublic/raw/refs/heads/main/build/reddit.user.js
// @updateURL https://github.com/BowuDev/UserCatScriptsPublic/raw/refs/heads/main/build/reddit.user.js
// @supportURL https://github.com/BowuDev/UserCatScriptsPublic/issues
// ==/UserScript==

/* ==UserConfig==
AntiVPN:
  Host:
    title: "Host to redirect to"
    description: "Think reddit.com redirecting to photon-reddit.com upon being blocked for using a VPN."
    type: "select"
    values: ["photon-reddit.com","reditr.com","red.artemislena.eu","rl.bloat.cat","redlib.catsarch.com","redlib.privacy.com.de","r.darrennathanael.com","redlib.ducks.party","redlib.kittywi.re","redlib.nadeko.net","reddit.nerdvpn.de","red.ngn.tf","l.opnxng.com","redlib.perennialte.ch","libreddit.privacydev.net","redlib.privacyredirect.com","redlib.r4fo.com","safereddit.com","redlib.tux.pizza"]
    default: "photon-reddit.com"
 ==/UserConfig== */

(function(){let t=GM_getValue("AntiVPN.Host","photon-reddit.com");if(location.href.startsWith("https://www.reddit.com/r/")){if(document.title==""&&document.querySelector(".font-bold.text-24.text-neutral-content-strong")?.textContent==="You've been blocked by network security.")location.host=t}else if(location.href.startsWith("https://old.reddit.com/r/")){if(document.title=="Blocked"&&document.querySelector("h1")?.textContent==="whoa there, pardner!")location.host=t}})();

// Built with love, by BowuDev
