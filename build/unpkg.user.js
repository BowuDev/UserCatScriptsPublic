// ==UserScript==
// @name NPMJS ❤️ UNPKG
// @description Adds a simple image-link to UNPKG for NPMJS packages.
// @description Example: https://www.npmjs.com/package/react => https://www.unpkg.com/react/
// @match https://www.npmjs.com/package/*
// @version 2025.1.19.18
// @namespace https://github.com/BowuDev/UserCatScriptsPublic
// @homepageURL https://github.com/BowuDev/UserCatScriptsPublic
// @downloadURL https://github.com/BowuDev/UserCatScriptsPublic/raw/refs/heads/main/out/unpkg.user.js
// @updateURL https://github.com/BowuDev/UserCatScriptsPublic/raw/refs/heads/main/out/unpkg.user.js
// @supportURL https://github.com/BowuDev/UserCatScriptsPublic/issues
// ==/UserScript==

(async function(){if(location.href.match("https://www.npmjs.com/package/*")){let a=document.querySelector("#main h2:first-of-type");if(a){let[,,...c]=location.pathname.split(/[\/\\]/),n=c.join("/"),e=document.createElement("a");e.href=`https://www.unpkg.com/${n}/`,e.classList.add("flex"),e.style.paddingLeft="1rem";let t=document.createElement("img");t.src="https://www.unpkg.com/favicon.ico",t.height=20,e.appendChild(t),a.appendChild(e)}}})();
