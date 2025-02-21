import process_userjs_meta from "../lib/userjs_lib.ts";
// import {findData} from "../lib/findData.ts";

export default async (script_file: string, script_output_file: string) => {
    // let data = findData(script_file);
    return await process_userjs_meta(script_file, script_output_file, {
        name: "Reddit",
        description: [
            "[ANTI-VPN] Upon failure to open Reddit, redirect to provided setting in config.",
        ].join("\n"),
        match: [
            "https://www.reddit.com/r/*",
            "https://old.reddit.com/r/*",
        ],
        grant: [
            "GM_notification",
            "GM_setValue",
            "GM_getValue",
        ],
    });
};