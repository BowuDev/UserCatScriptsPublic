import process_userjs_meta from "../lib/userjs_lib.ts";
import {findData} from "../lib/findData.ts";

export default async (script_file: string, script_output_file: string) => {
    let data = findData(script_file);
    return await process_userjs_meta(script_file, script_output_file, {
        name: "SteamCommunity",
        description: [
            "[WORKSHOP] Subscribe to all on page. Or all in browsing list.",
            "[WORKSHOP] Download time estimator for workshop files.",
        ].join("\n"),
        /*match: [
            "https://steamcommunity.com/workshop/browse/!*",
            "https://steamcommunity.com/sharedfiles/filedetails/!*",
        ],*/
        match: data.XM_addMatch,
        grant: [
            "GM_registerMenuCommand",
            "GM_unregisterMenuCommand",
            "GM_notification",
            "GM_setValue",
            "GM_getValue",
        ],
    });
};