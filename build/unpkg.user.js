// ==UserScript==
// @name [BOWUDEV] NPMJS ❤️ UNPKG
// @description Adds a simple image-link to UNPKG for NPMJS packages.
// @description Example: https://www.npmjs.com/package/react => https://www.unpkg.com/react/
// @match https://www.unpkg.com/browse/*
// @match https://www.npmjs.com/package/*
// @version 2025.1.21.16
// @namespace https://github.com/BowuDev/UserCatScriptsPublic
// @homepageURL https://github.com/BowuDev/UserCatScriptsPublic
// @downloadURL https://github.com/BowuDev/UserCatScriptsPublic/raw/refs/heads/main/build/unpkg.user.js
// @updateURL https://github.com/BowuDev/UserCatScriptsPublic/raw/refs/heads/main/build/unpkg.user.js
// @supportURL https://github.com/BowuDev/UserCatScriptsPublic/issues
// ==/UserScript==

(async function(){let B=(q,v={})=>{let j=document.createElement("a");return j.href=q,Object.assign(j.style,v),j},D=(q,v)=>{let j=document.createElement("img");return j.src=q,j.height=v,j};if(location.href.match("https://www.npmjs.com/package/")){console.log("Detected NPM_PACKAGE_URL page, adding favicon and link to UNPKG.");let q=document.querySelector("#main h2:first-of-type");if(q){let[,,...v]=location.pathname.split(/[\/\\]/),j=v.join("/"),z=B(`https://www.unpkg.com/${j}/`,{paddingLeft:"1rem"});z.classList.add("flex");let F=D("https://www.unpkg.com/favicon.ico",20);z.appendChild(F),q.appendChild(z)}}else if(location.href.match("https://www.unpkg.com/browse/")){console.log("Detected UNPKG_BROWSE_URL page, adding link to NPM.");let q=document.querySelector("header nav");if(q){let v=q.querySelector("strong");if(v){let j=B(`https://www.npmjs.com/package/${q.textContent}/`,{textDecorationStyle:"dotted",textDecorationLine:"underline",color:"inherit"}),z=document.createElement("strong");z.textContent=q.textContent||"",j.appendChild(z),v.replaceWith(j)}}}})();

// Built with love, by BowuDev
