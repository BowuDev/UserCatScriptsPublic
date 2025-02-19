// ==UserScript==
// @name NPMJS ❤️ UNPKG
// @description Adds a simple image-link to UNPKG for NPMJS packages.
// @description Example: https://www.npmjs.com/package/react => https://www.unpkg.com/react/
// @match https://www.npmjs.com/package/*
// @match https://www.unpkg.com/browse/*
// @version 2025.1.19.18
// @namespace https://github.com/BowuDev/UserCatScriptsPublic
// @homepageURL https://github.com/BowuDev/UserCatScriptsPublic
// @downloadURL https://github.com/BowuDev/UserCatScriptsPublic/raw/refs/heads/main/build/unpkg.user.js
// @updateURL https://github.com/BowuDev/UserCatScriptsPublic/raw/refs/heads/main/build/unpkg.user.js
// @supportURL https://github.com/BowuDev/UserCatScriptsPublic/issues
// ==/UserScript==

(async function(){if(location.href.match("https://www.npmjs.com/package/*")){let f=document.querySelector("#main h2:first-of-type");if(f){let[,,...j]=location.pathname.split(/[\/\\]/),q=j.join("/"),d=document.createElement("a");d.href=`https://www.unpkg.com/${q}/`,d.classList.add("flex"),d.style.paddingLeft="1rem";let v=document.createElement("img");v.src="https://www.unpkg.com/favicon.ico",v.height=20,d.appendChild(v),f.appendChild(d)}}else if(location.href.match("https://www.unpkg.com/browse/*")){let f=document.querySelector("header nav");if(f){let j=f.querySelector("strong");if(j){let q=document.createElement("strong");q.textContent=f.textContent;let d=document.createElement("a");d.href=`https://npmjs.com/package/${f.textContent}/`,d.appendChild(q),d.style.textDecorationStyle="dotted",d.style.textDecorationLine="underline",d.style.color="inherit",j.replaceWith(d)}}}})();

// Built with love, by BowuDev
