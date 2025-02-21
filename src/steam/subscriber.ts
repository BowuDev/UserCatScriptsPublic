import {XM_addMatch} from "macros" with {type: "macro"};

// SubscribeInlineItem is on steam workshop pages.
declare function SubscribeInlineItem(published_file_id: string, app_id: string): void;

(async function () {
    XM_addMatch("https://steamcommunity.com/workshop/browse/");
    if (location.href.startsWith("https://steamcommunity.com/workshop/browse/?")) {
        const defaultDarknessBG = 0.75;
        let workshop_items = document.querySelectorAll(".workshopItem > a.ugc[data-appid][data-publishedfileid]");
        let any_found = false;
        let found: { [key: string]: boolean } = {};
        for (let i = 0; i < workshop_items.length; i++) {
            let item = workshop_items[i];
            if (!(item instanceof HTMLElement)) continue;
            if (item.querySelector(".general_btn.subscribe.toggled") != null) continue;
            let app_id = item.dataset.appid;
            let published_file_id = item.dataset.publishedfileid;
            if (app_id == null || published_file_id == null) continue;
            any_found = true;
            found[`${app_id}|${published_file_id}`] = true;
        }
        if (any_found) {
            let running = false;
            let foundCount = Object.keys(found).length;
            let menuID: number = 0;
            let runner = async () => {
                if (running) return;
                else running = true;
                if (menuID > 0) GM_unregisterMenuCommand(menuID);
                let divElement = document.createElement("div");
                divElement.id = "SubscribeModal";
                Object.assign(divElement.style, {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    position: "fixed",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                    backgroundColor: `rgba(0, 0, 0, ${defaultDarknessBG})`,
                    zIndex: 2147483647,
                });
                let textElement1 = document.createElement("p");
                textElement1.id = "SubscribeModalText";
                textElement1.textContent = "Running subscribe all";
                let textElement2 = document.createElement("p");
                textElement2.id = "SubscribeModalText2";
                textElement2.textContent = "...";
                let progressElement = document.createElement("progress");
                progressElement.max = foundCount;
                progressElement.value = 0;
                divElement.appendChild(textElement1);
                divElement.appendChild(textElement2);
                divElement.appendChild(progressElement);
                document.body.appendChild(divElement);
                let stepped = 0;
                for (const foundKey in found) {
                    stepped++;
                    progressElement.value = stepped;
                    let darknessStep = defaultDarknessBG + (stepped / foundCount);
                    divElement.style.backgroundColor = `rgba(0, 0, 0, ${defaultDarknessBG + darknessStep * stepped})`;
                    let [app_id, published_file_id] = foundKey.split("|");
                    textElement1.textContent = `Running subscribe for file_id:${published_file_id} app_id:${app_id}`;
                    let howManyLeft = (foundCount - stepped);
                    let steppedPadded = stepped.toString().padStart(foundCount.toString().length, "0");
                    textElement2.textContent = `${steppedPadded}/${foundCount} | Roughly ${howManyLeft} second${howManyLeft > 1 ? "s" : ""} left`;
                    if (app_id == null || published_file_id == null) continue;
                    SubscribeInlineItem(published_file_id, app_id);
                    await new Promise(resolve => setTimeout(resolve, 1_000));
                    delete found[foundKey];
                }
                found = {};
                document.body.removeChild(divElement);
                running = false;
                GM_notification({
                    title: "Finished subscribing to workshop items.",
                    text: "There were " + foundCount + " items to subscribe to on the page.",
                    // image?: string;
                    // highlight?: boolean;
                    // silent?: boolean;
                    // timeout?: number;
                    // onclick?: NotificationOnClick;
                    // ondone?: NotificationOnDone;
                    // progress?: number;
                    // oncreate?: NotificationOnClick;
                    // buttons?: NotificationButton[];
                });
            };
            if (GM_getValue("subscribeAll", false) === false && GM_getValue("subscribeToPage", 0) === 0) {
                menuID = GM_registerMenuCommand(`Subscribe ${foundCount} workshop items / ${foundCount} seconds.`, runner);
                GM_registerMenuCommand(`Subscribe to all workshop items until # page.`, async () => {
                    let ans = prompt("Enter page number to subscribe up to. It will subscribe as well the content of that page.");
                    if (ans == null) return alert("Invalid number provided");
                    let ansInt = parseInt(ans);
                    if (isNaN(ansInt)) return alert("Invalid number provided");
                    if (ansInt < 1) return alert("Invalid number provided");
                    let p = new URL(location.href).searchParams.get("p");
                    if (p == null) return alert("Could not find current page number.");
                    if (parseInt(p) > ansInt) return alert("Given number is less than current page.");
                    await GM_setValue("subscribeToPage", ansInt);
                    location.reload();
                });
                GM_registerMenuCommand(`Subscribe to all workshop items until no more pages.`, async () => {
                    await GM_setValue("subscribeAll", true);
                    location.reload();
                });
            } else if (GM_getValue("subscribeAll", false)) {
                GM_registerMenuCommand(`[STOP] Subscribe to all workshop items until no more pages.`, async () => {
                    await GM_setValue("subscribeAll", false);
                    GM_notification({title: "Stopped subscribing to workshop items."});
                    location.reload();
                });
                await runner();
                let nextPageButton: HTMLElement | null = document.querySelector(".workshopBrowsePagingControls .pagebtn:last-of-type");
                if (nextPageButton != null) {
                    if (nextPageButton.classList.contains("disabled")) {
                        GM_notification({title: "Finished subscribing to workshop items."});
                        await GM_setValue("subscribeAll", false);
                        location.reload();
                    } else {
                        nextPageButton.click();
                    }
                }
            } else if (parseInt(GM_getValue("subscribeToPage", 0)) > 0) {
                GM_registerMenuCommand("[STOP] Subscription sequencing", async () => {
                    await GM_setValue("subscribeToPage", 0);
                    GM_notification({title: "Stopped subscribing to workshop items."});
                    location.reload();
                });
                let ansInt = parseInt(GM_getValue("subscribeToPage", 0));
                let p = new URL(location.href).searchParams.get("p");
                if (p == null) return alert("Could not find current page number.");
                if (parseInt(p) > ansInt) {
                    await GM_setValue("subscribeToPage", 0);
                    GM_notification({title: "Stopped subscribing to workshop items."});
                    location.reload();
                    return;
                }
                await runner();
                let nextPageButton: HTMLElement | null = document.querySelector(".workshopBrowsePagingControls .pagebtn:last-of-type");
                if (nextPageButton != null) {
                    if (nextPageButton.classList.contains("disabled")) {
                        GM_notification({title: "Finished subscribing to workshop items."});
                        await GM_setValue("subscribeToPage", 0);
                        location.reload();
                    } else {
                        nextPageButton.click();
                    }
                }
            }
        }
    }
})();