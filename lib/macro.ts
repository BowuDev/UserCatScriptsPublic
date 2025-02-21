// noinspection JSUnusedGlobalSymbols

export {fakerEN as faker_} from "@faker-js/faker";
export {default as lodash} from "lodash";
export {default as underscore} from "underscore";

export function XM_addMatch(url: string): string {
    return url;
}

export function XM_doResourceURL(...args: any[]) {
    [args];
}

export const fetchAndTransform = async (
    url: string,
    options: {
        encodeBase64?: boolean,
        asJsonObject?: boolean,
        resizeImage?: [number, number]
    },
) => {
    try {
        const response = await fetch(url);
        console.log({response});
        const content = await response.text();

        if (options.encodeBase64) {
            // Encode content to Base64
            return Buffer.from(content).toString("base64");
        }

        if (options.asJsonObject) {
            // Parse the content as a JSON object
            return JSON.parse(content);
        }

        // Default: Return the raw content
        return content;
    } catch (error) {
        throw new Error(`Failed to fetch or transform content: ${error}`);
    }
};

export interface RedlibInstancesResponse {
    updated: Date;
    instances: {
        url?: string;
        country?: string;
        version?: string;
        description?: string;
        cloudflare?: boolean;
        onion?: string;
    }[];
}

export const fetchRedlibInstances = async () => {
    const response = await fetch("https://raw.githubusercontent.com/redlib-org/redlib-instances/refs/heads/main/instances.json");
    let data: RedlibInstancesResponse = await response.json();
    return data;
};