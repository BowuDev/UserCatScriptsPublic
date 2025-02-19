import * as fs from "node:fs";
import * as path from "node:path";

const userscript = require("userscript-meta");

let files: string[] = fs.readdirSync("src");
let processedFiles: string[] = [];

async function process(file: string) {
    let outdir = path.join(".", "build");
    let scriptSrc_joined = path.join(".", "src", file.replace(/\.meta\.ts$/, ".user.ts")),
        scriptSrc = path.resolve(scriptSrc_joined),
        scriptOut_joined = path.join(outdir, file.replace(/\.meta\.ts$/, ".user.js")),
        scriptOut = path.resolve(scriptOut_joined),
        metaFile_joined = path.join(".", "src", file), metaFile = path.resolve(metaFile_joined);
    await Bun.build({
        entrypoints: [scriptSrc],
        target: "browser",
        outdir: outdir,
        minify: true,
        banner: userscript.stringify(await require(metaFile).default(scriptSrc, scriptOut, metaFile, processedFiles)),
    });
    console.log("Built", scriptSrc_joined, "to", scriptOut_joined);
    processedFiles.push(file);
}

let indexMetaTS = "";
for (let i = 0; i < files.length; i++) {
    let file = files[i];
    if (!file.endsWith(".meta.ts")) continue;
    if (file === "index.meta.ts") {
        indexMetaTS = file;
        continue;
    }
    await process(file);
}
await process(indexMetaTS);