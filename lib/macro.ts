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