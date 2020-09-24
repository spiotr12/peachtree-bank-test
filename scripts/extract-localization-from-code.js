"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const util = tslib_1.__importStar(require("util"));
const path = tslib_1.__importStar(require("path"));
const child_process_1 = require("child_process");
const ngConfig = require('../angular.json');
const exec = util.promisify(child_process_1.exec);
const i18nDir = 'src/i18n/';
const locales = Object.keys(ngConfig.projects['peachtree-bank-test'].i18n.locales);
function getFragmentsPath(locale) {
    return path.join(i18nDir, locale);
}
function runCommand(command) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        console.log(`Running command: "${command}"`);
        const { stdout, stderr } = yield exec(command);
        console.log('stdout:', stdout);
        console.log('stderr:', stderr);
        return { stdout, stderr };
    });
}
function ngBuild() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const command = `ng build`;
        return runCommand(command);
    });
}
function locl(locale) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const outPath = getFragmentsPath(locale);
        const command = `npx locl extract --source ./dist/**/*.js --format xlf2 --outputPath ${outPath} --locale ${locale}`;
        yield runCommand(command);
        return locale;
    });
}
// async function xlfMerge(locale, mainFileName) {
//   const fragmentsDirPath = getFragmentsPath(locale);
//   const fragmentFilesPaths = fs.readdirSync(fragmentsDirPath).map(file => path.join(fragmentsDirPath, file));
//
//   const mainFilePath = path.join(i18nDir, mainFileName || `messages.${locale}.xlf`)
//   const filesToMerge = [mainFilePath, ...fragmentFilesPaths];
//
//   const command = `xlf-merge ${filesToMerge.join(' ')} --output ${mainFilePath}`;
//   await runCommand(command);
//   return locale;
// }
ngBuild()
    .then(() => {
    return Promise.all(locales.map(locale => locl(locale)));
});
//# sourceMappingURL=extract-localization-from-code.js.map
