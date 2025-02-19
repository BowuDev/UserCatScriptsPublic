import process_userjs_meta from "../lib/userjs_lib.ts";

export default async (script_file: string, script_output_file: string, meta_file: string, processed_files: string[]) => await process_userjs_meta(script_file, script_output_file, {
    name: "BowuDev/UserCatScriptsPublic",
    scriptUrl: processed_files.map(file => `https://github.com/BowuDev/UserCatScriptsPublic/raw/refs/heads/main/${file.replaceAll("\\", "/")}`),
});