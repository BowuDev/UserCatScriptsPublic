const cfg: UserConfig = {
    "Workshop": {
        "DownloadEstimator": {
            title: "Estimate download time",
            description: "Calculate download time based on average download speed",
            type: "checkbox",
            default: true,
        },
        "DownloadAvgSpeed": {
            title: "Average download speed",
            description: "For example 10MB",
            type: "text",
            default: "50MB",
        },
    },
};
export default cfg;