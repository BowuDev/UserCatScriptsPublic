import process_userjs_meta from "../lib/userjs_lib.ts";
import {findData} from "../lib/findData.ts";

export default async (script_file: string, script_output_file: string) => {
    let data = findData(script_file);
    return await process_userjs_meta(script_file, script_output_file, {
        name: "NPMJS ❤️ UNPKG",
        description: "Adds a simple image-link to UNPKG for NPMJS packages.\nExample: https://www.npmjs.com/package/react => https://www.unpkg.com/react/",
        match: data.XM_addMatch,
    });
};