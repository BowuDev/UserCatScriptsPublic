import type * as BunType from "bun";
import * as fs from "node:fs";
import * as path from "node:path";
import {convertToUserConfig} from "./lib/user_config.ts";

const userscript = require("userscript-meta");

let files: string[] = fs.readdirSync("src");
let processedFiles: string[] = [];

// @ts-ignore
let defaultBunBuildOpts: BunType.BuildConfig = {
    target: "browser",
    minify: {
        syntax: true,
        whitespace: true,
        identifiers: true,
    },
    footer: "// Built with love, by BowuDev",
};

async function process(file: string) {
    let outdir = path.join(".", "build");
    let scriptSrc_joined = path.join(".", "src", file.replace(/\.meta\.ts$/, ".user.ts")),
        scriptSrc = path.resolve(scriptSrc_joined),
        scriptOut_joined = path.join(outdir, file.replace(/\.meta\.ts$/, ".user.js")),
        scriptOut = path.resolve(scriptOut_joined),
        metaFile_joined = path.join(".", "src", file), metaFile = path.resolve(metaFile_joined),
        configFile_joined = path.join(".", "src", file.replace(/\.meta\.ts$/, ".config.ts")),
        configFile = path.resolve(configFile_joined);
    let banner: string[] = [userscript.stringify(await require(metaFile).default(scriptSrc, scriptOut, metaFile, processedFiles))];
    if (fs.existsSync(configFile)) {
        let userConfig = require(configFile).default;
        if (typeof userConfig === "function") userConfig = await userConfig();
        banner.push(convertToUserConfig(userConfig));
    }
    await Bun.build({
        ...defaultBunBuildOpts,
        entrypoints: [scriptSrc],
        outdir: outdir,
        banner: banner.join("\n") + (banner.length > 1 ? "\n" : ""),
    });
    console.log("Built", scriptSrc_joined, "to", scriptOut_joined);
    processedFiles.push(scriptOut_joined);
}

let indexMetaTS = "";
for (let i = 0; i < files.length; i++) {
    let file = files[i];
    if (!file.endsWith(".meta.ts")) continue;
    if (file === "user.sub.meta.ts") {
        indexMetaTS = file;
        continue;
    }
    await process(file);
}
await (async function () {
    let file = indexMetaTS;
    let outdir = path.join(".", "build");
    let scriptSrc_joined = path.join(".", "src", file.replace(/\.meta\.ts$/, ".ts")),
        scriptSrc = path.resolve(scriptSrc_joined),
        scriptOut_joined = path.join(outdir, file.replace(/\.meta\.ts$/, ".js")),
        scriptOut = path.resolve(scriptOut_joined),
        metaFile_joined = path.join(".", "src", file), metaFile = path.resolve(metaFile_joined);
    await Bun.build({
        ...defaultBunBuildOpts,
        entrypoints: [scriptSrc],
        outdir: outdir,
        banner: userscript.stringify(await require(metaFile).default(scriptSrc, scriptOut, metaFile, processedFiles)).replaceAll(/(\/\/ ==\/?)UserScript(==)/g, "$1UserSubscribe$2"),
    });
    console.log("Built", scriptSrc_joined, "to", scriptOut_joined);
    processedFiles.push(scriptOut_joined);
})();