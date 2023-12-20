"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleFile = void 0;
const index_1 = require("./index");
function handleFile(params) {
    const { path } = params;
    index_1.fs.readFile(index_1.pathModule.resolve(__dirname, path), { encoding: "utf8" }, (err, data) => {
        if (err) {
            throw err;
        }
        const sourceObj = JSON.parse(data);
        for (let key in sourceObj) {
            if (Object.hasOwnProperty.call(sourceObj, key)) {
                sourceObj[key] = key;
            }
        }
        index_1.fs.writeFile(index_1.pathModule.resolve(__dirname, path), JSON.stringify(sourceObj), "utf8", (err, data) => {
            if (err) {
                throw err;
            }
            console.log("done");
        });
    });
}
exports.handleFile = handleFile;
