const path = require('path');
const fs = require('fs');
const childProcess = require("node:child_process");

const ENTRIES_FOLDER_PATH = './src/modules';
const ENTRIES = fs.readdirSync(ENTRIES_FOLDER_PATH);

const ENTRY = {};
for (const filename of ENTRIES) {
    const path = `${ENTRIES_FOLDER_PATH}/${filename}`;
    ENTRY[path.substring(0, path.lastIndexOf('.'))] = path;
}

console.log("DEVELOPMENT MODE:");
console.log("entry");
console.log(ENTRY);

const out = {
    entry: ENTRY,
    module: {
        rules: [
            { test: /\.ts$/, use: 'ts-loader', include: [path.resolve(__dirname, 'src')] },
        ]
    },
    output: {
        filename: (pathData, assetInfo) => {
            const fullPath = pathData.chunk.name;
            return `${fullPath.substring(fullPath.lastIndexOf('/') + 1)}.js`;
        },
        path: path.resolve(__dirname, 'public/scripts'),
        publicPath: '/public/'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    mode: "development",
    devServer: {
        liveReload: true,
        port: 8080,
        devMiddleware: {
            writeToDisk: true
        }
    }
}
module.exports = out;

// setting up live sass compiler
const stylesSrcPath = path.join(__dirname, out.output.publicPath, "styles-src");
const stylesOutPath = path.join(__dirname, out.output.publicPath, "styles");

const sassProcess = childProcess.exec(`sass "${stylesSrcPath}":"${stylesOutPath}" --style compressed --watch`);
sassProcess.on("message", (code, signal) => {
    console.log(code);
});