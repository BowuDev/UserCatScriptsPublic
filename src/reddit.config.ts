import {fetchRedlibInstances} from "macros";

export default async function () {
    let fetched = await fetchRedlibInstances();
    return <UserConfig>{
        "AntiVPN": {
            "Host": {
                title: "Host to redirect to",
                description: "Think reddit.com redirecting to photon-reddit.com upon being blocked for using a VPN.",
                type: "select",
                values: [
                    "photon-reddit.com",
                    "reditr.com",
                    ...(fetched.instances.filter(instance => typeof instance.url === "string")).map(instance => {
                        // @ts-ignore
                        return new URL(instance.url).host;
                    }).sort(function (a, b) {
                        const getSecondLevelDomain = (host: string) => {
                            const parts = host.split(".");
                            return parts.length > 2 ? parts.slice(-2, -1)[0] : parts[0];
                        };
                        return getSecondLevelDomain(a).localeCompare(getSecondLevelDomain(b));
                    }),
                ],
                default: "photon-reddit.com",
            },
            /*"TryAgain": { // TODO: Future feature
                title: "Try again",
                description: "Try a random redirect host if the pre-set host fails.",
                type: "checkbox",
                default: false,
            },*/
        },
    };
}