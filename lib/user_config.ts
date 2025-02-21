/**
 * Converts a UserConfig JSON object to a formatted string as required.
 * @param input - UserConfig JSON object.
 * @returns A string in the ScriptCat UserConfig format.
 */
export function convertToUserConfig(input: Config): string {
    let output = "/* ==UserConfig==\n";

    for (const [group, configs] of Object.entries(input)) {
        output += `${group}:\n`;
        for (const [configName, configDetails] of Object.entries(configs)) {
            output += `  ${configName}:\n`;
            for (const [key, value] of Object.entries(configDetails as Record<string, any>)) {
                output += `    ${key}: ${JSON.stringify(value)}\n`;
            }
        }
    }

    output += " ==/UserConfig== */";

    return output;
}
