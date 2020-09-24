"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs"));
const commandLineArgs = tslib_1.__importStar(require("command-line-args")).default;
const parser = tslib_1.__importStar(require("xml2json"));
const pretty_data_1 = require("pretty-data");
// Commander setup
const optionDefinitions = [
    { name: 'main', alias: 'm', type: String },
    { name: 'output', alias: 'o', type: String },
    { name: 'src', alias: 's', type: String, multiple: true, defaultOption: true },
];
const options = commandLineArgs(optionDefinitions);
const { src, output } = options;
let { main } = options;
if (!main) {
    if (!src[0]) {
        throw new Error('Main file or at least one src file is required');
    }
    else {
        main = src.shift();
    }
}
if (!output) {
    throw new Error('Output file is required');
}
// Logic
function xlfToObj(path) {
    return parser.toJson(fs.readFileSync(path), {
        object: true,
        reversible: true,
    });
}
const mainXlf = xlfToObj(main);
const srcXlfs = src.map(s => xlfToObj(s));
let mergedUnits = [];
mergedUnits = mergedUnits.concat(mainXlf.xliff.file.unit);
srcXlfs.forEach(s => {
    if (s.xliff.file.unit) {
        mergedUnits = mergedUnits.concat(s.xliff.file.unit);
    }
});
const ids = [];
const mergedFilteredUnits = mergedUnits.filter((unit) => {
    if (!ids.includes(unit.id)) {
        ids.push(unit.id);
        return true;
    }
    else {
        console.warn(`SKIPPING: duplicated id   "${unit.id}"`);
        return false;
    }
});
mainXlf.xliff.file.unit = mergedFilteredUnits;
const finalXml = pretty_data_1.pd.xml(parser.toXml(mainXlf));
fs.writeFileSync(output, finalXml);
//# sourceMappingURL=merge-xlf.js.map
