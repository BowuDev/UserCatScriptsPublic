import * as path from "node:path";

const fs = require("fs");
const readline = require("readline");
let date = new Date();
export default async function process_userjs_meta(script_file: string, script_output_file: string, custom_meta: {
    [key: string]: any
    name?: string
    description?: string | string[]
}): Promise<object> {
    const found_meta: { [key: string]: any } = {};

    const fileStream = fs.createReadStream(script_file);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    for await (const line of rl) {
        const match = line.trim().match(/^\/\/\s*@@(\w+)\s*(.+)$/);
        if (match) {
            const key = match[1];
            const value = match[2].trim();

            if (custom_meta[key]) found_meta[key] = custom_meta[key];
            if (found_meta[key]) {
                // If the key already exists, check if it's an array, otherwise convert it to an array
                if (Array.isArray(found_meta[key])) {
                    found_meta[key].push(value);
                } else {
                    found_meta[key] = [found_meta[key], value];
                }
            } else {
                found_meta[key] = value;
            }
        }
    }

    fileStream.close();
    if (typeof found_meta["description"] === "string") found_meta["description"] = found_meta["description"].split("\n");
    else if (typeof custom_meta["description"] === "string") custom_meta["description"] = custom_meta["description"].split("\n");
    if (Array.isArray(found_meta["grant"])) found_meta["grant"] = [...new Set(found_meta["grant"])];
    if (Array.isArray(custom_meta["grant"])) custom_meta["grant"] = [...new Set(custom_meta["grant"])];

    let extra_meta: { [key: string]: any } = {
        version: `${date.getUTCFullYear()}.${date.getUTCMonth()}.${date.getUTCDate()}.${date.getUTCHours()}`,
        namespace: "https://github.com/BowuDev/UserCatScriptsPublic",
        homepageURL: "https://github.com/BowuDev/UserCatScriptsPublic",
        downloadURL: `https://github.com/BowuDev/UserCatScriptsPublic/raw/refs/heads/main/build/${path.basename(script_output_file)}`,
        updateURL: `https://github.com/BowuDev/UserCatScriptsPublic/raw/refs/heads/main/build/${path.basename(script_output_file)}`,
        supportURL: "https://github.com/BowuDev/UserCatScriptsPublic/issues",
    };
    return Object.assign(custom_meta, found_meta, extra_meta);
}