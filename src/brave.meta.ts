import process_userjs_meta from "../lib/userjs_lib.ts";
import {findData} from "../lib/findData.ts";

export default async (script_file: string, script_output_file: string) => {
    let data = findData(script_file);
    return await process_userjs_meta(script_file, script_output_file, {
        name: "Brave Search",
        description: [
            "[Widget-Titler] Sets tab title when timer widget is in use.",
            "[Widget-Titler] Sets tab title when stopwatch widget is in use.",
        ].join("\n"),
        match: [
            "https://www.reddit.com/r/*",
            "https://search.brave.com/search?q=*",
        ],
        grant: [
            "GM_notification",
            "GM_setValue",
            "GM_getValue",
        ],
    });
};