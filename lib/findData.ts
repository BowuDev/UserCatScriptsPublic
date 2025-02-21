import ts from "typescript";
import fs from "node:fs";
import path from "node:path";

export function findData(file: string, visited: Set<string> = new Set()): {
    XM_doResourceURL: { name: string; url: string }[];
    XM_addMatch: string[];
} {
    const filePath = path.resolve(file); // Resolve absolute file path
    if (visited.has(filePath)) {
        // Prevent circular imports
        return {XM_doResourceURL: [], XM_addMatch: []};
    }
    visited.add(filePath); // Mark this file as visited

    // Parse the code into an AST
    const sourceCode = fs.readFileSync(filePath, "utf-8");
    const sourceFile = ts.createSourceFile(
        filePath,
        sourceCode,
        ts.ScriptTarget.Latest,
        true,
        ts.ScriptKind.TS,
    );

    const XM_doResourceURL: { name: string; url: string }[] = [];
    const XM_addMatch: string[] = [];

    // Helper function to generate a random name
    function generateRandomName() {
        return `R_${Math.random().toString(36).substr(2, 9)}`;
    }

    // Recursive function to traverse the AST
    function visit(node: ts.Node) {
        if (ts.isCallExpression(node)) {
            const expression = node.expression;

            // Check if the function is XM_doResourceURL or XM_addMatch
            if (ts.isIdentifier(expression)) {
                const functionName = expression.text;

                if (functionName === "XM_doResourceURL") {
                    const args = node.arguments;
                    if (args.length >= 1 && ts.isStringLiteral(args[0])) {
                        const url = args[0].text;
                        const name =
                            args.length >= 2 && ts.isStringLiteral(args[1])
                                ? args[1].text
                                : generateRandomName();
                        XM_doResourceURL.push({name, url});
                    }
                } else if (functionName === "XM_addMatch") {
                    const args = node.arguments;
                    if (args.length === 1 && ts.isStringLiteral(args[0])) {
                        XM_addMatch.push(args[0].text);
                    }
                }
            }
        }

        // Handle import declarations to follow imports recursively
        if (ts.isImportDeclaration(node)) {
            const moduleSpecifier = node.moduleSpecifier;
            if (ts.isStringLiteral(moduleSpecifier)) {
                const importPath = moduleSpecifier.text;
                const resolvedPath = resolveImportPath(importPath, filePath);
                if (resolvedPath && fs.existsSync(resolvedPath)) {
                    const data = findData(resolvedPath, visited);
                    XM_doResourceURL.push(...data.XM_doResourceURL);
                    XM_addMatch.push(...data.XM_addMatch);
                }
            }
        }

        // Handle require calls for CommonJS modules
        if (ts.isCallExpression(node)) {
            const expression = node.expression;
            if (
                ts.isIdentifier(expression) &&
                expression.text === "require" &&
                node.arguments.length === 1 &&
                ts.isStringLiteral(node.arguments[0])
            ) {
                const importPath = node.arguments[0].text;
                const resolvedPath = resolveImportPath(importPath, filePath);
                if (resolvedPath && fs.existsSync(resolvedPath)) {
                    const data = findData(resolvedPath, visited);
                    XM_doResourceURL.push(...data.XM_doResourceURL);
                    XM_addMatch.push(...data.XM_addMatch);
                }
            }
        }

        // Visit each child node recursively
        ts.forEachChild(node, visit);
    }

    // Start traversal from the root of the source file
    visit(sourceFile);

    // Return results, ensuring uniqueness for XM_addMatch
    return {
        XM_doResourceURL,
        XM_addMatch: [...new Set(XM_addMatch)],
    };
}

/**
 * Resolves the full file path of an import.
 * Handles relative and absolute paths.
 */
function resolveImportPath(importPath: string, currentFile: string): string | null {
    // Handle node_modules or absolute imports
    if (importPath.startsWith(".")) {
        // Resolve relative paths
        const basePath = path.dirname(currentFile);
        return path.resolve(basePath, importPath + (importPath.endsWith(".ts") ? "" : ".ts"));
    }
    return null; // Add logic here for node_modules or other resolution as needed
}