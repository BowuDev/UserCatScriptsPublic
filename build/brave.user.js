// ==UserScript==
// @name [BOWUDEV] Brave Search
// @description [Widget-Titler] Sets tab title when timer widget is in use.
// @description [Widget-Titler] Sets tab title when stopwatch widget is in use.
// @match https://www.reddit.com/r/*
// @match https://search.brave.com/search?q=*
// @grant GM_notification
// @grant GM_setValue
// @grant GM_getValue
// @version 2025.1.21.16
// @namespace https://github.com/BowuDev/UserCatScriptsPublic
// @homepageURL https://github.com/BowuDev/UserCatScriptsPublic
// @downloadURL https://github.com/BowuDev/UserCatScriptsPublic/raw/refs/heads/main/build/brave.user.js
// @updateURL https://github.com/BowuDev/UserCatScriptsPublic/raw/refs/heads/main/build/brave.user.js
// @supportURL https://github.com/BowuDev/UserCatScriptsPublic/issues
// ==/UserScript==

(function(){let q=document.querySelector("#widget-timer-container"),z=document.querySelector("#timer .header h1:nth-of-type(2)");if(q&&z){let y=function(j){if(B!==j)B=j,document.title=j};var I=y;let A="0m 0s",v=!1,B="";setInterval(function(){if(q==null)return;let j=q.querySelector("button:not(#timer-control)");if(j==null)return;let k=j.textContent;if(k===A){if(y(`${k||"[COMPLETED] Timer"} - Brave Search`),!v)v=!0,GM_notification({title:"Timer completed",text:`Brave Search timer completed! Timer: ${z.textContent}`,image:document.querySelector('link[rel="apple-touch-icon"][sizes="180x180"]')?.href})}else if(y(`${k||"[NOT STARTED] Timer"} - Brave Search`),v)v=!1},100)}})();(function(){let q=document.querySelector("#widget-stopwatch-container"),z=document.querySelector("#stopwatch #widget-stopwatch-container h1");if(q&&z){let j=function(k){if(y!==k)y=k,document.title=k};var I=j;let A=()=>(z.textContent??"").split(`
`).map((k)=>k.trim()).join(""),v="00:00:00",B=!1,y="";setInterval(function(){if(q==null)return;if(A()===v)j("⏱️ {NOT STARTED} Stopwatch - Brave Search");else j(`⏱️ {${A()}} Stopwatch - Brave Search`)},1)}})();
// Built with love, by BowuDev
