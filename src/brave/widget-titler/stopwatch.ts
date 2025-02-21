(function () {
    const stopwatchContainer = document.querySelector("#widget-stopwatch-container");
    const stopwatchTimeH1: HTMLHeadingElement | null = document.querySelector("#stopwatch #widget-stopwatch-container h1");
    if (stopwatchContainer && stopwatchTimeH1) {
        const stopwatchTimeFN = () => (stopwatchTimeH1.textContent ?? "").split("\n").map(x => x.trim()).join("");
        let stopwatchNotStarted = "00:00:00", timerCompleted = false, lastTitle = "";

        // While wasteful, reduces DOM updates, reducing potential lag.
        function setTitle(text: string) {
            if (lastTitle !== text) {
                lastTitle = text;
                document.title = text;
            }
        }

        setInterval(function () {
            if (stopwatchContainer == null) return;
            if (stopwatchTimeFN() === stopwatchNotStarted) {
                setTitle(`⏱️ {NOT STARTED} Stopwatch - Brave Search`);
            } else {
                setTitle(`⏱️ {${stopwatchTimeFN()}} Stopwatch - Brave Search`);
            }
        }, 1);
    }
})();