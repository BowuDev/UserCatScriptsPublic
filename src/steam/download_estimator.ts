import {XM_addMatch} from "macros";

(async function () {
    XM_addMatch("https://steamcommunity.com/sharedfiles/filedetails/");
    if (location.href.startsWith("https://steamcommunity.com/sharedfiles/filedetails/")) {
        const unitConversion: { [key: string]: number } = {
            B: 1 / (1024 * 1024), // Bytes to MB
            KB: 1 / 1024,         // Kilobytes to MB
            MB: 1,                // Megabytes (default unit)
            GB: 1024,             // Gigabytes to MB
        };

        // Utility function to extract numeric value and unit from a string
        function extractSizeWithUnit(input: string): { value: number; unit: string } | null {
            const match = input.match(/(\d+(?:\.\d+)?)\s*(B|KB|MB|GB)/i);
            if (!match) return null;
            const [, value, unit] = match;
            return {value: parseFloat(value), unit: unit.toUpperCase()};
        }

        // Utility function to convert a size value to MB
        function convertToMB(value: number, unit: string): number {
            return value * (unitConversion[unit] || 1);
        }

        // Utility function to calculate download time
        function calculateDownloadTime(fileSizeMB: number, speedMBps: number): string {
            const downloadTimeInSeconds = fileSizeMB / speedMBps;
            const minutes = Math.floor(downloadTimeInSeconds / 60);
            const seconds = Math.round(downloadTimeInSeconds % 60);
            return `${minutes}m ${seconds}s`;
        }


        // Fetch the average download speed
        const avgSpeed = GM_getValue("Workshop.DownloadAvgSpeed", "50MB");
        const speedData = extractSizeWithUnit(avgSpeed);
        if (!speedData) {
            console.error("Invalid Workshop.DownloadAvgSpeed format");
            return;
        }

        const speedInMBps = convertToMB(speedData.value, speedData.unit);
        if (isNaN(speedInMBps)) {
            console.error("Could not convert speed to MB/s");
            return;
        }

        // Extract file size from the HTML
        const fileSizeElement = document.querySelector(".detailsStatRight");
        if (!fileSizeElement) {
            console.error("File size element not found!");
            return;
        }

        const fileSizeText = fileSizeElement.textContent?.trim() ?? "";
        const fileSizeData = extractSizeWithUnit(fileSizeText);
        if (!fileSizeData) {
            console.error("Invalid file size format");
            return;
        }

        const fileSizeInMB = convertToMB(fileSizeData.value, fileSizeData.unit);
        if (isNaN(fileSizeInMB)) {
            console.error("Could not convert file size to MB");
            return;
        }

        // Calculate download time and append it to the UI
        const formattedTime = calculateDownloadTime(fileSizeInMB, speedInMBps);
        const rightDetailsBlock = document.querySelector(".rightDetailsBlock");
        if (!rightDetailsBlock) {
            console.error(".rightDetailsBlock not found!");
            return;
        }

        const downloadTimeElement = document.createElement("div");
        downloadTimeElement.className = "detailsStatRight"; // Adjust styling if needed
        downloadTimeElement.textContent = `Estimated Download Time: ${formattedTime}`;
        rightDetailsBlock.appendChild(downloadTimeElement);
    }
})();