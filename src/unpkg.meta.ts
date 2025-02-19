import process_userjs_meta from "../lib/userjs_lib.ts";

export default async (script_file: string, script_output_file: string) => await process_userjs_meta(script_file, script_output_file, {
    name: "NPMJS ❤️ UNPKG",
    description: "Adds a simple image-link to UNPKG for NPMJS packages.\nExample: https://www.npmjs.com/package/react => https://www.unpkg.com/react/",
});