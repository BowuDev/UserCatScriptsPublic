(function () {
    const timerContainer = document.querySelector("#widget-timer-container");
    const timerLengthH1 = document.querySelector("#timer .header h1:nth-of-type(2)");
    if (timerContainer && timerLengthH1) {
        let timerCompleteString = "0m 0s", timerCompleted = false, lastTitle = "";

        // While wasteful, reduces DOM updates, reducing potential lag.
        function setTitle(text: string) {
            if (lastTitle !== text) {
                lastTitle = text;
                document.title = text;
            }
        }

        setInterval(function () {
            if (timerContainer == null) return;
            let btn = timerContainer.querySelector("button:not(#timer-control)");
            if (btn == null) return;
            let btnText = btn.textContent;
            if (btnText === timerCompleteString) {
                setTitle(`${btnText || "[COMPLETED] Timer"} - Brave Search`);
                if (!timerCompleted) {
                    timerCompleted = true;
                    GM_notification({
                        title: "Timer completed",
                        text: `Brave Search timer completed! Timer: ${timerLengthH1.textContent}`,
                        image: (<HTMLLinkElement | null>document.querySelector(`link[rel="apple-touch-icon"][sizes="180x180"]`))?.href,
                    });
                }
            } else {
                setTitle(`${btnText || "[NOT STARTED] Timer"} - Brave Search`);
                if (timerCompleted) timerCompleted = false;
            }
        }, 100);
    }
})();